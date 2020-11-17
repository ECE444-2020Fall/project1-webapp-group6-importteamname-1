from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict



class InventoryManager():

    def __init__(self, db):
        self.db = db 

    def get_item(self, user_id, item, model):
        
        item = model.query.get((user_id, item))      # item already in list

        json_response = jsonify({
            'user_id': user_id,
            'item': item.get_item() if item else False
        })

        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])
    
    def add_item(self, user_id, item, model):

        if model.query.get((user_id, item)):      # item already in list
            json_response = jsonify({
                'error': f'item already in {model.__tablename__}'
            })
            return make_response(json_response, CONSTANTS['HTTP_STATUS']['400_BAD_REQUEST'])

        new_item = model(user_id, item)
        json_response = jsonify({
            'user_id': user_id,
            'item': new_item.get_item_name()
        })

        self.db.session.add(new_item)
        self.db.session.commit()
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])
    
    def remove_item(self, user_id, item, model):

        item_to_remove = model.query.get((user_id, item))
        if not item_to_remove:          # item not in list 
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
        user_items_map = {}
        user_items_map["items"] = [item.get_item_name() for item in user_items]

        json_response = jsonify(user_items_map)
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])


    def get_all_items(self, model):             # show all items in the model (ONLY FOR DEBUG PURPOSES)
        all_items = model.query.all()

        user_to_items_map = defaultdict(list)
        for item in all_items:
            user_to_items_map[str(item.user_id)].append(item.get_item_name())
        
        json_response = jsonify(user_to_items_map)
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])
