from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict
import sqlalchemy

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


class RecipePersonalizationManager():

    def __init__(self, db):
        self.db = db 

    def get_user_feedback(self, recipe_id, model):
        user_id = get_user_id()
        
        feedback_item = model.query.get((user_id, recipe_id))
        feedback = feedback_item.get_feedback() if feedback_item else False
        
        json_response = jsonify({ 
            'user_id': user_id,
            'recipe_id': recipe_id,
            'feedback': feedback
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])



    def add_or_update_feedback(self, recipe_id, feedback, model):
        user_id = get_user_id()
        
        feedback_item = model.query.get((user_id, recipe_id))

        if feedback_item:      # item already in list
            feedback_item.update_feedback(feedback)
            self.db.session.commit()

            json_response = jsonify({
                'user_id': user_id,
                'recipe_id': recipe_id,
                'feedback': feedback
            })
            return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])

        feedback_item = model(user_id, recipe_id, feedback)
        self.db.session.add(feedback_item)
        self.db.session.commit()

        json_response = jsonify({
            'user_id': user_id,
            'recipe_id': recipe_id,
            'feedback': feedback
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])

    

    def get_all_user_feedbacks(self, model):     # get all items in model belonging to user 
        user_id = get_user_id()
        user_feedbacks = model.query.filter(model.user_id == user_id)
        user_feedbacks_map = {}
        user_feedbacks_map["feedbacks"] = [
            { 
                "recipe_id": item.recipe_id,
                "feedback": item.get_feedback() 
            } for item in user_feedbacks]
        json_response = jsonify(user_feedbacks_map)
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])

    def get_all_feedbacks(self, model):             # show all items in the model (ONLY FOR DEBUG PURPOSES)
        all_items = model.query.all()

        user_to_items_map = defaultdict(list)
        for item in all_items:
            user_to_items_map[str(item.user_id)].append(
                {
                    "feedback": item.get_feedback(),
                    "recipe_id": item.recipe_id
                })
        
        json_response = jsonify(user_to_items_map)
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])
