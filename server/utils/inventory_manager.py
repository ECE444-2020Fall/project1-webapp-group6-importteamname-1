 # FileName: inventory_manager.py
 #
 # Description: This file contains functions used to add, remove and retrieve user items from the
 # RecipeCart, FavouritesList or UserNotes table.
.#
 # Author(s): Yanisa Kham
 # Date: November 17, 2020 

from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict

class InventoryManager():

    def __init__(self, db):
        self.db = db 

    def get_item(self, user_id, item, model):
        item = model.query.get((user_id, item))
        json_response = jsonify({
            'user_id': user_id,
            'item': item.get_item() if item else False
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])

    def add_item(self, user_id, item, model):
        if model.query.get((user_id, item)):                 # item already in list
            json_response = jsonify({
                'error': f'item already in {model.__tablename__}'
            })
            return make_response(json_response, CONSTANTS['HTTP_STATUS']['400_BAD_REQUEST'])

        new_item = model(user_id, item)
        self.db.session.add(new_item)
        self.db.session.commit()

        json_response = jsonify({
            'user_id': user_id,
            'item': new_item.get_item_name()
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])
    
    def add_or_update_item(self, user_id, item, value, model):
        old_item = model.query.get((user_id, item))
        json_response = jsonify({
            'item': item,
            'value': value
        })

        if old_item:                                                # item already in list
            old_item.update_item(value)
            self.db.session.commit()
            return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])

        new_item = model(user_id, item, value)
        self.db.session.add(new_item)
        self.db.session.commit()
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])

    def remove_item(self, user_id, item, model):
        item_to_remove = model.query.get((user_id, item))
        if not item_to_remove:                                      # item not in list 
            json_response = jsonify({
                'error': f'item is not in {model.__tablename__} list'
            })
            return make_response(json_response, CONSTANTS['HTTP_STATUS']['400_BAD_REQUEST'])

        self.db.session.delete(item_to_remove)
        self.db.session.commit()

        json_response = jsonify({
            'user_id': user_id, 
            'item_name': item_to_remove.get_item_name()
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])

    def get_all_user_items(self, user_id, model):     # get all items in model belonging to user 
        user_items = model.query.filter(model.user_id == user_id)
        json_response = jsonify({
            "items": [item.get_item_name() for item in user_items]
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])
