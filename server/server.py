from flask import Flask, jsonify, request, make_response, send_from_directory, session
import uuid
import os
from os.path import exists, join
from flask_cors import CORS
from constants import CONSTANTS
from utils.inventory_manager import InventoryManager
from utils.recipe_personalization_manager import RecipePersonalizationManager
from utils.recipe_controller import RecipeController
from utils.ingredient_controller import IngredientController
from utils.helper_functions import * 
from app import db, app
from app.models import *
import hashlib
from app.routes.get_routes import * 
from app.routes.post_routes import * 

inventory_manager = InventoryManager(db)
recipe_personalization_manager = RecipePersonalizationManager(db)
recipe_controller = RecipeController(db)
ingredient_controller = IngredientController(db)

CORS(app, supports_credentials=True)
app.secret_key = "TESTKEY"

@app.route('/api/drop')     # ONLY FOR DEBUGGING
def drop_db():
    UserRating.query.delete()
    UserNotes.query.delete()
    RecipeIngredient.query.delete()
    RecipeCart.query.delete()
    Recipe.query.delete()
    db.session.commit()
    return "dropped table"



@app.route('/api/user_notes', methods=['POST'])
def add_or_update_user_notes():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    recipe_id = request.get_json()["recipe_id"]
    feedback = request.get_json()["feedback"]
    return recipe_personalization_manager.add_or_update_feedback(user_id, recipe_id, feedback, UserNotes)

@app.route('/api/user_rating', methods=['POST'])
def add_or_update_user_rating():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    recipe_id = request.get_json()["recipe_id"]
    feedback = request.get_json()["feedback"]
    return recipe_personalization_manager.add_or_update_feedback(user_id, recipe_id, feedback, UserRating)

@app.route('/api/shopping_list', methods=['POST'])
def add_item_to_shopping_list():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    item = request.get_json()["item"]
    return inventory_manager.add_item(user_id, item, ShoppingList)

@app.route('/api/shopping_list/<string:item>', methods=['DELETE'])
def remove_item_from_shopping_list(item):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return inventory_manager.remove_item(user_id, item, ShoppingList)

@app.route('/api/pantry_list', methods=['POST'])
def add_item_to_pantry_list():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    item = request.get_json()["item"]
    return inventory_manager.add_item(user_id, item, PantryList)


@app.route('/api/pantry_list/<string:item>', methods=['DELETE'])
def remove_item_from_pantry_list(item):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return inventory_manager.remove_item(user_id, item, PantryList)


@app.route('/api/pantry_recipes', methods=['POST'])
def recommend_recipes():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    ingredients = inventory_manager.get_all_user_items(user_id, PantryList).get_json()["items"] #List of ingredients
    recipes = []
    for ingredient in ingredients:
        recipeIngredients = RecipeIngredient.query.filter(
            RecipeIngredient.ingredient_name == ingredient
        ).all()
        for recipe in recipeIngredients:
            recipes.append(recipe.recipe_id)
    recipes = sortListByFreq(recipes)
    
    return recipe_controller.get_recipes_by_ids(recipes, Recipe)


@app.route('/api/recipe_cart', methods=['POST'])
def add_recipe_cart_item():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    recipe_id = request.get_json()["item"]
    return inventory_manager.add_item(user_id, recipe_id, RecipeCart)

@app.route('/api/recipe_cart/<string:recipe_id>', methods=['DELETE'])
def remove_recipe_cart_item(recipe_id):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return inventory_manager.remove_item(user_id, recipe_id, RecipeCart)


@app.route('/api/favourites_list', methods=['POST'])
def get_recipe_favs_list():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    recipe_id = request.get_json()["item"]
    return inventory_manager.add_item(user_id, recipe_id, UserFavourites)

@app.route('/api/favourites_list/<string:recipe_id>', methods=['DELETE'])
def remove_recipe_from_favs_list(recipe_id):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return inventory_manager.remove_item(user_id, recipe_id, UserFavourites)

@app.route('/api/ingredients/add', methods=['POST']) 
def add_ingredient():
    recipe_id = request.get_json()["recipe_id"]
    ingredient_name = request.get_json()["ingredient_name"]
    amount = request.get_json()["amount"]
    unit_of_measurement = request.get_json()["unit_of_measurement"]
    return ingredient_controller.add_ingredient(RecipeIngredient, recipe_id, ingredient_name, amount, unit_of_measurement)



@app.route('/api/ingredients', methods=['DELETE'])
def remove_all_ingredients():
    return ingredient_controller.delete_all_ingredients(RecipeIngredient)


@app.route('/api/recipes/add', methods=['POST']) 
def add_recipe(): 
    recipe_id = uuid.uuid4()
    recipe_name = request.get_json()["recipe_name"]
    image_url = request.get_json()["image_url"]
    cuisines = request.get_json()["cuisines"]
    instructions = request.get_json()["instructions"]
    time_to_cook_in_minutes = request.get_json()["time_to_cook_in_minutes"]
    servings = request.get_json()["servings"]
    calories = request.get_json()["calories"]
    protein =request.get_json()["protein"]
    carbs = request.get_json()["carbs"]
    fat = request.get_json()["fat"]
    return recipe_controller.add_recipe(Recipe, recipe_id, recipe_name, image_url, cuisines, instructions, 
                                                   time_to_cook_in_minutes, servings, calories, protein, carbs, fat)




@app.route('/api/recipes', methods=['DELETE'])
def remove_all_recipes():
    return recipe_controller.delete_all_recipes(Recipe)


#@app.route('/api/add_user/<string:name>/<string:password>', methods=['POST'])
@app.route(CONSTANTS['ENDPOINT']['REGISTER'], methods=['POST'])
def add_new_user():
    
    body = request.get_json()
    name =  body["name"]
    password = hashlib.md5(body["password"].encode())
    password = password.hexdigest()
    ret = {}
    ret['userFree'] = True
    user = User.query.filter(
        User.username == name
    ).first()
    if user:
        ret['userFree'] = False
        return make_response(jsonify(ret), CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])
    new_user = User(name, password)
    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.user_id
    return make_response(jsonify(ret), CONSTANTS['HTTP_STATUS']['201_CREATED'])


@app.route(CONSTANTS['ENDPOINT']['LOGIN'], methods=['POST'])
def login_user():
    body = request.get_json()
    name =  body["name"]
    password = hashlib.md5(body["password"].encode())
    password = password.hexdigest()
    ret = {}
    ret['found'] = False
    user = User.query.filter(
        User.username == name , User.password == password
    ).first()
    if user:
        session["user_id"] = user.user_id
        ret['found'] = True
    return jsonify(ret)

@app.route(CONSTANTS['ENDPOINT']['LOGOUT'], methods=['POST'])
def logout_user():
    if 'user_id' in session:
        del session['user_id']
        return make_response(CONSTANTS['HTTP_STATUS']['200_OK'])
    return make_response(CONSTANTS['HTTP_STATUS']['400_BAD_REQUEST'])


# Catching all routes
# This route is used to serve all the routes in the frontend application after deployment.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    file_to_serve = path if path and exists(join(app.static_folder, path)) else 'index.html'
    return send_from_directory(app.static_folder, file_to_serve)

# Error Handler
@app.errorhandler(404)
def page_not_found(error):
    json_response = jsonify({'error': 'Page not found'})
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])

if __name__ == '__main__':
    app.run(port=CONSTANTS['PORT'])
    db.create_all()
