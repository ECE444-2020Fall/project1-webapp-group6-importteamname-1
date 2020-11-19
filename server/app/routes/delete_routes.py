from flask import Flask
from app import app
from flask_cors import CORS, cross_origin
from app.models import models_map
from . import inventory_manager
from utils.helper_functions import * 

@app.route('/api/<any(shopping_list,pantry_list,recipe_cart,favourites_list):model>/<string:item>/<string:user_id>', methods=['DELETE'])
@cross_origin()
def remove_item_from_model(model, item, user_id):
    model = models_map[model]
    if not user_id:
        return user_id_not_found_response() 

    return inventory_manager.remove_item(user_id, item, model)
