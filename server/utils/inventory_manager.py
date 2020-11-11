from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict

def get_user_id():
    if 'user_id' not in session:
        print("user id not in session")
        user_id = "9890648f-c400-4c98-9796-e1afbc7774db"
        # json_response = jsonify({ 
        #     'error': 'user_id not in session, log in again'
        # })
        # return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])
    else:
        print("user id in session")
        user_id = session['user_id']
    return user_id


class InventoryManager():

    def __init__(self, db):
        self.db = db 

    def get_item(self, item, model):
        user_id = get_user_id()
        
        item = model.query.get((user_id, item))      # item already in list

        json_response = jsonify({
            'user_id': user_id,
            'item': item.get_item() if item else False
        })

        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])



    def add_item(self, item, model):
        user_id = get_user_id()        
        # print(user_id, item)
        # for x in model.query.all():
        #     print(x.user_id, x.get_item_name())

        # print()
        # model.query.delete()
        # self.db.session.commit()
        # return ""
        print(user_id, item)
        if model.query.get((user_id, item)):      # item already in list
            print(model.query.get((user_id, item)))
            json_response = jsonify({
                'error': f'item already in {model.__tablename__}'
            })
            print("already in")
            return make_response(json_response, CONSTANTS['HTTP_STATUS']['400_BAD_REQUEST'])
        print("new item")
        new_item = model(user_id, item)
        json_response = jsonify({
            'user_id': user_id,
            'item': new_item.get_item_name()
        })
        # print(str(new_item.recipe_id))
        self.db.session.add(new_item)
        self.db.session.commit()
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])
    
    def remove_item(self, item, model):
        user_id = get_user_id()

        item_to_remove = model.query.get((user_id, item))
        if not item_to_remove:
            print("not in, cant remove")                                      # item not in list 
            json_response = jsonify({
                'error': f'item is not in {model.__tablename__} list'
            })
            return make_response(json_response, CONSTANTS['HTTP_STATUS']['400_BAD_REQUEST'])
        print("item found")                                      # item not in list 
        self.db.session.delete(item_to_remove)
        self.db.session.commit()
        json_response = jsonify({
            'user_id': user_id, 
            'item_name': item_to_remove.get_item_name()
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])

    def get_all_user_items(self, model):     # get all items in model belonging to user 
        if 'user_id' not in session:                                # user not logged in 
            user_id = "ebbe4421-c37b-4bd1-ac39-2337b1535206"
            # json_response = jsonify({
            #     'error': 'user_id not in session, log in again'
            # })
            # return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])
        else:
            user_id = session['user_id']
        user_items = model.query.filter(model.user_id == user_id)
        user_items_map = {}
        user_items_map["items"] = [item.get_item_name() for item in user_items]

        print(user_items_map)
        json_response = jsonify(user_items_map)
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])

    def get_all_items(self, model):             # show all items in the model (ONLY FOR DEBUG PURPOSES)
        all_items = model.query.all()

        user_to_items_map = defaultdict(list)
        for item in all_items:
            user_to_items_map[str(item.user_id)].append(item.get_item_name())
        
        json_response = jsonify(user_to_items_map)
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])
