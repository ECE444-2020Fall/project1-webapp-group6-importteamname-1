 # FileName: post_routes.py
 #
 # Description: This file contains routes that POST data into the database.
 #
 # Author(s): Yanisa Kham
 # Date: November 17, 2020 


from flask import Flask, jsonify, make_response, request
import hashlib
from app import app, db
from app.models import *
from constants import CONSTANTS
from . import inventory_manager, recipe_controller
from utils.helper_functions import * 

@app.route('/api/<any(user_notes, user_rating):model>', methods=['POST'])
def add_or_update_model_item(model):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    model = models_map[model]
    recipe_id = request.get_json()["recipe_id"]
    feedback = request.get_json()["feedback"]
    return inventory_manager.add_or_update_item(user_id, recipe_id, feedback, model)

@app.route('/api/<any(shopping_list, pantry_list, recipe_cart, favourites_list):model>', methods=['POST'])
def add_item_to_model(model):
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 
    model = models_map[model]
    item = request.get_json()["item"]
    return inventory_manager.add_item(user_id, item, model)

@app.route('/api/pantry_recipes')
def recommend_recipes2():
    user_id = get_user_id()
    if not user_id:
        return user_id_not_found_response() 

    ingredients = inventory_manager.get_all_user_items(user_id, PantryList).get_json()["items"] #List of ingredients
    recipes = RecipeIngredient.query.filter(RecipeIngredient.ingredient_name.in_(ingredients)).all()
    recipe_ids = sortListByFreq([recipe.recipe_id for recipe in recipes])

    return recipe_controller.get_recipes_by_ids(recipe_ids, Recipe)

@app.route('/api/add_user', methods=['POST'])
def add_new_user():
    name = request.get_json()["name"]
    password = request.get_json()["password"]
    encoded_password = hashlib.md5(password.encode()).hexdigest()
    user = User.query.filter(User.username == name).first()

    if user:
        json_response = jsonify({"userFree": False})
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])
    
    new_user = User(name, encoded_password)
    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.user_id

    json_response = jsonify({"userFree": True})
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])

@app.route('/api/login', methods=['POST'])
def login_user():
    name =  request.get_json()["name"]
    password = request.get_json()["password"]
    encoded_password = hashlib.md5(password.encode()).hexdigest()
    user = User.query.filter(User.username == name , User.password == encoded_password).first()

    if user:
        session["user_id"] = user.user_id
        json_response = jsonify({"found": True})
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])
        
    json_response = jsonify({"found": False})
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])
