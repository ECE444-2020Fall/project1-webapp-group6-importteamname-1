from flask import Flask, jsonify, request, make_response, send_from_directory, session
from app import db, app
from app.models import *
from . import inventory_manager, ingredient_controller, recipe_controller, recipe_personalization_manager
from utils.helper_functions import * 

@app.route('/api/smart_shopping_list')
def generate_smart_shopping_list_items():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    pantry_list_items = inventory_manager.get_all_user_items(user_id, PantryList).get_json()["items"]
    shopping_list_items = inventory_manager.get_all_user_items(user_id, ShoppingList).get_json()["items"]
    carted_recipe_ids = inventory_manager.get_all_user_items(user_id, RecipeCart).get_json()["items"]
    recipe_ingredients = ingredient_controller.get_ingredient_names_by_recipe_ids(RecipeIngredient, carted_recipe_ids).get_json()["ingredients"]
    smart_ingredients = list(set(recipe_ingredients) - set(pantry_list_items) - set(shopping_list_items))
    
    response = {"items": smart_ingredients}
    return make_response(jsonify(response), CONSTANTS['HTTP_STATUS']['200_OK'])

models = {
    "user_rating": UserRating,
    "user_notes": UserNotes,
    "recipe_cart": RecipeCart,
    "favourites_list": UserFavourites,
    "pantry_list": PantryList,
    "shopping_list": ShoppingList
}

@app.route('/api/<any(user_notes,user_rating,recipe_cart,favourites_list):model>/<string:recipe_id>')
def get_item_from_model(model, recipe_id):
    model = models[model]
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    return inventory_manager.get_item(user_id, recipe_id, model)

@app.route('/api/<any(user_notes,user_rating,shopping_list,pantry_list):model>')
def get_all_user_items_from_model(model):
    model = models[model]
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    return inventory_manager.get_all_user_items(user_id, model)

@app.route('/api/<any(recipe_cart, favourites_list):model>')
def get_all_user_recipes_from_model(model):
    user_id = get_user_id()
    model = models[model]
    if not user_id:
        return user_id_not_found_response() 
    user_carted_recipe_ids = inventory_manager.get_all_user_items(user_id, model).get_json()["items"]
    return recipe_controller.get_recipes_by_ids(user_carted_recipe_ids, Recipe)

@app.route('/api/ingredients/<string:recipe_id>', methods=['GET'])
def get_ingredient_by_recipe_id(recipe_id):
    return ingredient_controller.get_ingredient_by_recipe_id(RecipeIngredient, recipe_id)

@app.route('/api/recipes')
def get_all_recipes():
    return recipe_controller.get_all_recipes(Recipe)

@app.route('/api/get_user')
def get_user():
    user_id = get_user()
    if not user_id:
        return user_id_not_found_response() 

    user = User.query.filter(User.user_id == user_id).first()    
    if not user:
        json_response = jsonify({'error': 'sessions user not in database'})
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])

    json_response = jsonify({'username': user.username})
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])
