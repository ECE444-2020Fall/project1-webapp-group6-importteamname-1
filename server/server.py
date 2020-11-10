from flask import Flask, jsonify, make_response, send_from_directory, session
import uuid
from flask import request
import os
from os.path import exists, join
from flask_cors import CORS

from constants import CONSTANTS
from sample_data import sample_data

from app import db, app, inventory_manager, recipe_personalization_manager, recipe_controller, ingredient_controller
from app.models import *

CORS(app)
app.secret_key = "TESTKEY"

@app.route('/api/add_or_update_user_notes', methods=['POST'])
def add_or_update_user_notes():
    recipe_id = request.get_json()["recipe_id"]
    feedback = request.get_json()["feedback"]
    return recipe_personalization_manager.add_or_update_feedback(recipe_id, feedback, UserNotes)


@app.route('/api/user_notes')
def show_user_notes():
    return recipe_personalization_manager.get_all_user_feedbacks(UserNotes)


@app.route('/api/add_or_update_user_rating', methods=['POST'])
def add_or_update_user_rating():
    recipe_id = request.get_json()["recipe_id"]
    feedback = request.get_json()["feedback"]
    return recipe_personalization_manager.add_or_update_feedback(recipe_id, feedback, UserRating)


@app.route('/api/user_ratings')
def show_user_ratings():
    return recipe_personalization_manager.get_all_user_feedbacks(UserRating)


@app.route('/api/add_item_to_shopping_list', methods=['POST'])
def add_item_to_shopping_list():
    item = request.get_json()["item"]
    return inventory_manager.add_item(item, ShoppingList)


@app.route('/api/remove_item_from_shopping_list/<string:item>', methods=['DELETE'])
def remove_item_from_shopping_list(item):
    return inventory_manager.remove_item(item, ShoppingList)


@app.route('/api/shopping_list')
def show_shopping_list():
    return inventory_manager.get_all_user_items(ShoppingList)


@app.route('/api/add_recipe_to_favourites_list', methods=['POST'])
def add_recipe_to_favs_list():
    recipe_id = request.get_json()["item"]
    return inventory_manager.add_item(recipe_id, FavouritesList)


@app.route('/api/remove_recipe_from_favourites_list/<string:recipe_id>', methods=['DELETE'])
def remove_recipe_from_favs_list(recipe_id):
    return inventory_manager.remove_item(recipe_id, FavouritesList)


@app.route('/api/favourites_list')
def show_favs_list():
    return inventory_manager.get_all_user_items(FavouritesList)


@app.route('/api/ingredients/add', methods=['POST'])
def add_ingredient():
    request_json = request.get_json()
    return ingredient_controller.add_ingredient(RecipeIngredient, request_json)


@app.route('/api/ingredients', methods=['GET'])
def get_all_ingredients():
    return ingredient_controller.get_all_ingredients(RecipeIngredient)


@app.route('/api/recipes/add', methods=['POST'])
def add_recipe():
    request_json = request.get_json()
    return recipe_controller.add_recipe(Recipe, request_json)


@app.route('/api/recipes', methods=['GET'])
def get_all_recipes():
    return recipe_controller.get_all_recipes(Recipe)


@app.route('/api/recipes', methods=['DELETE'])
def remove_all_recipes():
    return recipe_controller.delete_all_recipes(Recipe)


# EXAMPLE OF HOW TO ADD ENTRIES TO DB  <PART OF YANISA's DB SETUP>
@app.route('/api/add_user/<string:name>/<string:password>')
def add_new_user(name, password):
    new_user = User(name, password)
    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.user_id
    print(session)
    return ""

# EXAMPLE OF HOW TO REMOVE ENTRIES TO DB  <PART OF YANISA's DB SETUP>
@app.route('/api/remove_user/<string:name>/<string:password>')
def remove_user(name, password):
    user = User.query.filter(
        User.username == name and User.password == password
    ).first()
    if user: 
        db.session.delete(user[0])
        db.session.commit()
    return ""

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
    app.run(port=CONSTANTS['PORT'])
    db.create_all()
    print("creating all db")
