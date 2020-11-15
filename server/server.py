from flask import Flask, jsonify, make_response, send_from_directory, session
import uuid
from flask import request
import os
from os.path import exists, join
from flask_cors import CORS

from constants import CONSTANTS
from sample_data import sample_data
from utils.inventory_manager import InventoryManager
from utils.recipe_personalization_manager import RecipePersonalizationManager
from utils.recipe_controller import RecipeController
from utils.ingredient_controller import IngredientController

from app import db, app 
from app.models import *
from datetime import date
import hashlib

inventory_manager = InventoryManager(db)
recipe_personalization_manager = RecipePersonalizationManager(db)
recipe_controller = RecipeController(db)
ingredient_controller = IngredientController(db)

CORS(app, supports_credentials=True)
app.secret_key = "TESTKEY"

def get_user_id():
    if 'user_id' not in session:
        return False
    else:
        user_id = session['user_id']
    return user_id

def user_id_not_found_response():
    json_response = jsonify({ 
        'error': 'user_id not in session, log in again'
    })
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])


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

@app.route('/api/user_notes/<string:recipe_id>')
def show_user_note(recipe_id):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return recipe_personalization_manager.get_user_feedback(user_id, recipe_id, UserNotes)

@app.route('/api/user_notes')
def show_user_notes():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return recipe_personalization_manager.get_all_user_feedbacks(user_id, UserNotes)


@app.route('/api/user_rating', methods=['POST'])
def add_or_update_user_rating():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    recipe_id = request.get_json()["recipe_id"]
    feedback = request.get_json()["feedback"]
    return recipe_personalization_manager.add_or_update_feedback(user_id, recipe_id, feedback, UserRating)

@app.route('/api/user_rating/<string:recipe_id>')
def show_user_rating(recipe_id):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return recipe_personalization_manager.get_user_feedback(user_id, recipe_id, UserRating)

@app.route('/api/user_ratings')
def show_user_ratings():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return recipe_personalization_manager.get_all_user_feedbacks(user_id, UserRating)

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


@app.route('/api/shopping_list')
def show_shopping_list():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return inventory_manager.get_all_user_items(user_id, ShoppingList)

@app.route('/api/recipe_cart/<string:recipe_id>')
def add_item_to_recipe_cart(recipe_id):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return inventory_manager.get_item(user_id, recipe_id, RecipeCart)

@app.route('/api/recipe_cart', methods=['POST'])
def get_recipe_cart_item():
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

@app.route('/api/recipe_cart')
def show_recipe_cart():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    user_carted_recipe_ids = inventory_manager.get_all_user_items(user_id, RecipeCart).get_json()["items"]
    return recipe_controller.get_recipes_by_ids(user_carted_recipe_ids, Recipe)

@app.route('/api/favourites_list/<string:recipe_id>')
def add_recipe_to_favs_list(recipe_id):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    return inventory_manager.get_item(user_id, recipe_id, UserFavourites)

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

@app.route('/api/favourites_list')
def show_favs_list():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    user_fav_recipe_ids = inventory_manager.get_all_user_items(user_id, UserFavourites).get_json()["items"]
    return recipe_controller.get_recipes_by_ids(user_fav_recipe_ids, Recipe)


@app.route('/api/ingredients/add', methods=['POST']) 
def add_ingredient():
    recipe_id = request.get_json()["recipe_id"]
    ingredient_name = request.get_json()["ingredient_name"]
    amount = request.get_json()["amount"]
    unit_of_measurement = request.get_json()["unit_of_measurement"]
    return ingredient_controller.add_ingredient(RecipeIngredient, recipe_id, ingredient_name, amount, unit_of_measurement)


@app.route('/api/ingredients', methods=['GET'])
def get_all_ingredients():
    return ingredient_controller.get_all_ingredients(RecipeIngredient)


@app.route('/api/ingredients/<string:recipe_id>', methods=['GET'])
def get_ingredient_by_recipe_id(recipe_id):
    return ingredient_controller.get_ingredient_by_recipe_id(RecipeIngredient, recipe_id)


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


@app.route('/api/recipes', methods=['GET'])
def get_all_recipes():
    return recipe_controller.get_all_recipes(Recipe)


@app.route('/api/recipes', methods=['DELETE'])
def remove_all_recipes():
    return recipe_controller.delete_all_recipes(Recipe)

@app.route('/api/calorie_tracker/add', methods=['POST'])
def add_consumed_recipe():
    recipe_id = uuid.uuid4() #change this to favorites/add
    date = date.today()
    return calorie_tracker_manager.add_consumed_recipe(ConsumedRecipes, recipe_id, date)

@app.route('/api/calorie_tracker/delete', methods=['DELETE'])
def delete_consumed_recipe()
    recipe_id = request.get_json()["recipe_id"]
    date = date.today()
    return calorie_tracker_manager.delete_consumed_recipe(ConsumedRecipes, recipe_id, date)

@app.route('/api/calorie_tracker', methds=['GET'])
def get_consumed_recipes()
    date = date.today()
    return calorie_tracker_manager.get_consumed_recipes(ConsumedRecipes, Recipe)

@app.route('/api/calorie_tracker/total', methds=['GET'])
def consumed_recipes_nutrition_total()
    date = date.today()
    return calorie_tracker_manager.consumed_recipes_nutrition_total(ConsumedRecipes, Recipe, date)


# EXAMPLE OF HOW TO ADD ENTRIES TO DB  <PART OF YANISA's DB SETUP>
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


@app.route(CONSTANTS['ENDPOINT']['GET_USER'], methods=['GET'])
def get_user():
    if 'user_id' not in session:
        return jsonify({'error': 'user_id not found'})
    user = User.query.filter(
        User.user_id == session.get('user_id')
    ).first()
    res = {'username': user.username}
    
    if user:
        return jsonify(res)
    return jsonify({'error': 'sessions user not in database'})

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

# EXAMPLE OF HOW TO ADD ITEM WITH FOREIGN KEY <PART OF YANISA's DB SETUP>
@app.route('/api/add_item/<string:item>')
def add_new_item(item):
    if session["user_id"]:
        user = User.query.get(session["user_id"])        
        new_item = ShoppingList(user.user_id, item)
        db.session.add(new_item)
        db.session.commit()
        return "item added"
    return "no user id "


# EXAMPLE OF HOW TO QUERY ENTRIES IN DB  <PART OF YANISA's DB SETUP>
@app.route('/api/show_users')
def print_db():
    all_users = User.query.all() # get all users
    users_named_tim = User.query.filter(     # filter by attribute
        User.username == "tim" and User.password == "fei"
    )
    # user_by_primary_key = User.query.get( # get user by primary key
    #     User.user_id == "PRIMARY_KEY_VALUE" 
    # )
    res = {}
    for user in all_users:
        res[user.username] = user.password
    return jsonify(res)

# MasterDetail Page Endpoint  <PART OF SKELETON APP>
@app.route(CONSTANTS['ENDPOINT']['MASTER_DETAIL'])
def get_master_detail():
    return jsonify(sample_data['text_assets'])

# List Endpoints   <PART OF SKELETON APP>
@app.route(CONSTANTS['ENDPOINT']['LIST'])
def get_list():
    return jsonify(sample_data['list_text_assets']['list_items'])

#  <PART OF SKELETON APP>
@app.route(CONSTANTS['ENDPOINT']['LIST'], methods = ['POST'])
def add_list_item():
    data = request.get_json()
    list_item = {'id':  str(uuid.uuid4()), 'text': data['text']}
    sample_data['list_text_assets']['list_items'].insert(0, list_item)
    json_response = jsonify(list_item)
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])

#  <PART OF SKELETON APP>
@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<string:id>', methods=['DELETE'])
def delete_list_item(id):
    list_items_to_remove = [list_item for list_item in sample_data['list_text_assets']['list_items'] if list_item['id'] == id]
    if not list_items_to_remove:
        json_response = jsonify({'error': 'Could not find an item with the given id'})
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])
    if len(list_items_to_remove) > 1:
        json_response = jsonify({'error': 'More than one list items found with the same id'})
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])
    sample_data['list_text_assets']['list_items'] = [list_item for list_item in sample_data['list_text_assets']['list_items'] if list_item['id'] != id]
    return jsonify({'id': id, 'text': 'This comment was deleted'})

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
    # session["user_id"] = "ebbe4421-c37b-4bd1-ac39-2337b1535206"
    app.run(port=CONSTANTS['PORT'])
    db.create_all()
    print("creating all db")