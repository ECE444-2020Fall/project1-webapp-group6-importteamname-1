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
            'recipe_id': int.from_bytes(recipe_id, byteorder='little'),
            'ingredient_name': ingredient_name
        })

        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])


    def get_all_ingredients(self, model):
        ingredients = model.query.all() 
        ingredient_map = {"ingredients": []}

        for ingredient in ingredients:
            ingredient_object = {}
            ingredient_object["recipe_id"] = int.from_bytes(ingredient.recipe_id, byteorder='little')
            ingredient_object["ingredient_name"] = ingredient.ingredient_name
            ingredient_object["amount"] = ingredient.amount
            ingredient_object["unit_of_measurement"] = ingredient.unit_of_measurement

            ingredient_map["ingredients"].append(ingredient_object)

        return make_response(jsonify(ingredient_map), CONSTANTS['HTTP_STATUS']['200_OK'])