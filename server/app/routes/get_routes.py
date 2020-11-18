from flask import Flask, jsonify, make_response
from flask_cors import CORS, cross_origin
from app import app
from app.models import *
from constants import CONSTANTS
from . import inventory_manager, ingredient_controller, recipe_controller
from utils.helper_functions import * 


@app.route('/api/<any(user_notes,user_rating,recipe_cart,favourites_list):model>/<string:recipe_id>')
@cross_origin()
# @cross_origin()
def get_item_from_model(model, recipe_id):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    model = models_map[model]
    return inventory_manager.get_item(user_id, recipe_id, model)


@app.route('/api/<any(user_notes,user_rating,shopping_list,pantry_list):model>')
@cross_origin()
def get_all_user_items_from_model(model):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    model = models_map[model]
    return inventory_manager.get_all_user_items(user_id, model)


@app.route('/api/<any(recipe_cart, favourites_list):model>')
@cross_origin()
def get_all_user_recipes_from_model(model):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    model = models_map[model]
    user_carted_recipe_ids = inventory_manager.get_all_user_items(user_id, model).get_json()["items"]
    return recipe_controller.get_recipes_by_ids(user_carted_recipe_ids, Recipe)


@app.route('/api/smart_shopping_list')
@cross_origin()
def generate_smart_shopping_list_items():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    pantry_list_items = inventory_manager.get_all_user_items(user_id, PantryList).get_json()["items"]
    shopping_list_items = inventory_manager.get_all_user_items(user_id, ShoppingList).get_json()["items"]
    carted_recipe_ids = inventory_manager.get_all_user_items(user_id, RecipeCart).get_json()["items"]
    recipe_ingredients = ingredient_controller.get_ingredient_names_by_recipe_ids(RecipeIngredient, carted_recipe_ids).get_json()["ingredients"]
    smart_ingredients = list(set(recipe_ingredients) - set(pantry_list_items) - set(shopping_list_items))
    
    json_response = jsonify({"items": smart_ingredients})
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])


@app.route('/api/ingredients/<string:recipe_id>')
@cross_origin()
def get_ingredient_by_recipe_id(recipe_id):
    return ingredient_controller.get_ingredient_by_recipe_id(RecipeIngredient, recipe_id)


@app.route('/api/recipes')
@cross_origin()
def get_all_recipes():
    return recipe_controller.get_all_recipes(Recipe)


@app.route('/api/logout')
@cross_origin()
def logout_user():
    if 'user_id' not in session:
        return user_id_not_found_response() 
    del session['user_id']
    return make_response(CONSTANTS['HTTP_STATUS']['200_OK'])
