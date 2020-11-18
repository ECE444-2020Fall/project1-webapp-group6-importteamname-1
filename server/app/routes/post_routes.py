from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin
import hashlib
from app import app, db
from app.models import *
from constants import CONSTANTS
from . import inventory_manager, recipe_controller
from utils.helper_functions import * 

@app.route('/api/<any(user_notes, user_rating):model>', methods=['POST'])
@cross_origin()
# @cross_origin(origins="*" , supports_credentials=True)
def add_or_update_model_item(model):
    user_id = request.get_json()["user_id"]
    if not user_id:
        return user_id_not_found_response() 
    model = models_map[model]
    recipe_id = request.get_json()["recipe_id"]
    feedback = request.get_json()["feedback"]
    return inventory_manager.add_or_update_item(user_id, recipe_id, feedback, model)

@app.route('/api/<any(shopping_list, pantry_list, recipe_cart, favourites_list):model>', methods=['POST'])
@cross_origin()
# @cross_origin(origins="*" , supports_credentials=True)
def add_item_to_model(model):
    user_id = request.get_json()["user_id"]
    if not user_id:
        return user_id_not_found_response() 
    model = models_map[model]
    item = request.get_json()["item"]
    return inventory_manager.add_item(user_id, item, model)


@app.route('/api/add_user', methods=['POST'])
@cross_origin()
# @cross_origin(origins="*" , supports_credentials=True)
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

    json_response = jsonify({
        "userFree": True,
        "user_id": new_user.user_id
    })
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])

@app.route('/api/login', methods=['POST'])
@cross_origin()
# @cross_origin(origins="*" , supports_credentials=True)
def login_user():
    name =  request.get_json()["name"]
    password = request.get_json()["password"]
    encoded_password = hashlib.md5(password.encode()).hexdigest()
    user = User.query.filter(User.username == name , User.password == encoded_password).first()

    if user:
        session["user_id"] = user.user_id
        json_response = jsonify({
            "found": True,
            "user_id": user.user_id
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])
        
    json_response = jsonify({"found": False})
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])
