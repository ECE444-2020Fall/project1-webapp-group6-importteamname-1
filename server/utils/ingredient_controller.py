from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict

class IngredientController():

    def __init__(self, db):
        self.db = db 


    def add_ingredient(self, model, recipe_id, ingredient_name, amount, unit_of_measurement):
        ingredient = model(recipe_id, ingredient_name, amount, unit_of_measurement)
        self.db.session.add(ingredient)
        self.db.session.commit()
        
        json_response = jsonify({
            'recipe_id': recipe_id,
            'ingredient_name': ingredient_name
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])


    def get_ingredient_by_recipe_id(self, model, recipe_id):
        ingredients = model.query.filter_by(recipe_id=recipe_id).all()        
        ingredient_map = {
            "ingredients":[
                {
                "recipe_id": ingredient.recipe_id,
                "ingredient_name": ingredient.ingredient_name,
                "amount": ingredient.amount,
                "unit_of_measurement": ingredient.unit_of_measurement
                } for ingredient in ingredients
            ]
        }
       
        return make_response(jsonify(ingredient_map), CONSTANTS['HTTP_STATUS']['200_OK'])


    def get_ingredient_names_by_recipe_ids(self, model, recipe_ids):
        ingredients = model.query.filter(model.recipe_id.in_(recipe_ids)).all()
        ingredient_map = {
            "ingredients": [ingredient.get_item_name() for ingredient in ingredients]
        }
        return make_response(jsonify(ingredient_map), CONSTANTS['HTTP_STATUS']['200_OK'])
