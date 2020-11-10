from flask import Flask, jsonify, make_response, send_from_directory, session
import uuid
from flask import request
import os
from os.path import exists, join

from constants import CONSTANTS
from sample_data import sample_data

from app import db, app
from app.models import *

app.secret_key = "TESTKEY"

# EXAMPLE OF HOW TO ADD ENTRIES TO DB  <PART OF YANISA's DB SETUP>
#@app.route('/api/add_user/<string:name>/<string:password>', methods=['POST'])
@app.route(CONSTANTS['ENDPOINT']['REGISTER'], methods=['POST'])
def add_new_user():
    name =  request.get_json()["name"]
    password = request.get_json()["password"]
    user = User.query.filter(
        User.username == name and User.password == password
    ).first()
    if user:
        return "User already exists"

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

@app.route('/api/get_user', methods=['GET'])
def get_user():
    if 'user_id' not in session:
        return jsonify({'error': 'user_id not found'})
    user = User.query.filter(
        User.user_id == session.get('user_id')
    ).first()
    res = {}
    res['username'] = user.username
    res['user_id'] = user.user_id
    if user:
        return jsonify(res)
    return jsonify({'error': 'sessions user not in database'})



@app.route(CONSTANTS['ENDPOINT']['LOGIN'], methods=['POST'])
def login_user():
    name =  request.get_json()["name"]
    password = request.get_json()["password"]
    user = User.query.filter(
        User.username == name and User.password == password
    ).first()
    if user:
        session["user_id"] = user.user_id
        return ""
    return "User not found"
    

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