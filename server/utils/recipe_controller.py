from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict

class RecipeController():

    def __init__(self, db):
        self.db = db 

    def get_all_recipes(self, model):
        recipes = model.query.all() 
        recipe_map = {}
        recipe_map["recipes"] = []

        for recipe in recipes:
            recipe_info_object = {}
            recipe_info_object["recipe_id"] = int.from_bytes(recipe.recipe_id, byteorder='little')
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

        json_response = jsonify(recipe_map)

        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])

    def get_recipe_by_id(self, model):
        """
        """

    def delete_all_recipes(self, model):
        """
        """

    def delete_recipes_by_id(self, model):
        """
        """

    def add_recipe(self, model):
        """
        """