from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict
import sqlalchemy


class RecipePersonalizationManager():

    def __init__(self, db):
        self.db = db 

    def add_or_update_feedback(self, user_id, recipe_id, feedback, model):
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
