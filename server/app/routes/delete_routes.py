 # FileName: delete_routes.py
 #
 # Description: This file contains a route that DELETES data from the database.
.#
 # Author(s): Yanisa Kham
 # Date: November 17, 2020 

from flask import Flask
from app import app
from app.models import models_map
from . import inventory_manager
from utils.helper_functions import * 

@app.route('/api/<any(shopping_list,pantry_list,recipe_cart,favourites_list):model>/<string:item>', methods=['DELETE'])
def remove_item_from_model(model, item):
    user_id = get_user_id()
    model = models_map[model]
    if not user_id:
        return user_id_not_found_response() 

    return inventory_manager.remove_item(user_id, item, model)
