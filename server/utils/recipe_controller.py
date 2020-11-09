from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict

class RecipeController():

    def __init__(self, db):
        self.db = db 

    def add_recipe(self, model, request):
        recipe_id = request.get_json()["recipe_id"]
        recipe_name = request.get_json()["recipe_name"]
        recipe_image = request.get_json()["recipe_image"]
        cuisine = request.get_json()["cuisine"]
        instructions = request.get_json()["instructions"]
        time_to_cook_in_minutes = request.get_json()["time_to_cook_in_minutes"]
        servings = request.get_json()["servings"]
        calories = request.get_json()["calories"]
        protein = request.get_json()["protein"]
        carbs = request.get_json()["carbs"]
        fat = request.get_json()["fat"]

        recipe = model(recipe_id, recipe_name, recipe_image, cuisine, instructions, time_to_cook_in_minutes, servings, calories, protein, carbs, fat)
        self.db.session.add(recipe)
        self.db.session.commit()
        
        json_response = jsonify({
            'recipe_id': recipe_id,
            'recipe_name': recipe_name
        })

        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])

    def get_all_recipes(self, model):
        recipes = model.query.all() 
        recipe_map = {}
        recipe_map["recipes"] = []

        for recipe in recipes:
            recipe_info_object = {}
            recipe_info_object["recipe_id"] = int.from_bytes(recipe.recipe_id, byteorder='little') # Need fix 
            recipe_info_object["recipe_name"] = recipe.recipe_name
            recipe_info_object["recipe_image"] = recipe.recipe_image
            recipe_info_object["cuisine"] = recipe.cuisine
            recipe_info_object["instructions"] = recipe.instructions
            recipe_info_object["time_to_cook_in_minutes"] = recipe.time_to_cook_in_minutes
            recipe_info_object["servings"] = recipe.servings
            recipe_info_object["calories"] = recipe.calories
            recipe_info_object["protein"] = recipe.protein
            recipe_info_object["carbs"] = recipe.carbs
            recipe_info_object["fat"] = recipe.fat
            recipe_map["recipes"].append(recipe_info_object)

        return make_response(jsonify(recipe_map), CONSTANTS['HTTP_STATUS']['200_OK'])


    def delete_all_recipes(self, model):
        self.db.session.query(model).delete()
        self.db.session.commit()
        
        json_response = jsonify({
            'Success': 'Deleted all rows in the Recipe table',
        })

        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])


    def get_recipe_by_id(self, model):
        """
        """


    def delete_recipes_by_id(self, model):
        """
        """

