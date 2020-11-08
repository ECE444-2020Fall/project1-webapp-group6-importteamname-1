from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict

class InventoryManager():

    def __init__(self, db):
        self.db = db 

    def add_item(self, item, model):
        if 'user_id' not in session:
            user_id = "5b908304-86f0-4d71-8867-9536e2c616f4"

            # json_response = jsonify({ 
            #     'error': 'user_id not in session, log in again'
            # })
            # return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])
        
        else:
            user_id = session['user_id']
        
        if model.query.get((user_id, item)):      # item already in list
            json_response = jsonify({
                'error': f'item already in {model.__tablename__}'
            })
            return make_response(json_response, CONSTANTS['HTTP_STATUS']['400_BAD_REQUEST'])

        new_item = model(user_id, item)
        self.db.session.add(new_item)
        self.db.session.commit()
        json_response = jsonify({
            'user_id': user_id,
            'item': item
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])
    
    def remove_item(self, item, model):
        if 'user_id' not in session:                                # user not logged in 
            
            user_id = "5b908304-86f0-4d71-8867-9536e2c616f4"

            # json_response = jsonify({
            #     'error': 'user_id not in session, log in again'
            # })
            # return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])
        else:
            user_id = session['user_id']

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
            'item_name': item
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])

    def get_all_user_items(self, model):     # get all items in model belonging to user 
        if 'user_id' not in session:                                # user not logged in 
            user_id = "5b908304-86f0-4d71-8867-9536e2c616f4"
            # json_response = jsonify({
            #     'error': 'user_id not in session, log in again'
            # })
            # return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])
        else:
            user_id = session['user_id']
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
