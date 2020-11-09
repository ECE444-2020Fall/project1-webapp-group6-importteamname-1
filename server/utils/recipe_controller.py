from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict

class RecipeController():

    def __init__(self, db):
        self.db = db 

    def add_recipe(self, model, request_json):
        spoonacular_recipe_id = request_json["spoonacular_recipe_id"]
        recipe_name = request_json["recipe_name"]
        recipe_image = request_json["recipe_image"]
        cuisines = request_json["cuisines"]
        instructions = request_json["instructions"]
        time_to_cook_in_minutes = request_json["time_to_cook_in_minutes"]
        servings = request_json["servings"]
        calories = request_json["calories"]
        protein =request_json["protein"]
        carbs = request_json["carbs"]
        fat = request_json["fat"]

        recipe = model(spoonacular_recipe_id, recipe_name, recipe_image, cuisines, instructions, time_to_cook_in_minutes, servings, calories, protein, carbs, fat)
        self.db.session.add(recipe)
        self.db.session.commit()
        
        json_response = jsonify({
            'spoonacular_recipe_id': spoonacular_recipe_id,
            'recipe_name': recipe_name
        })

        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])


    def get_all_recipes(self, model):
        recipes = model.query.all() 
        recipe_map = {"recipes": []}

        for recipe in recipes:
            recipe_info_object = {}
            recipe_info_object["recipe_id"] = recipe.recipe_id
            recipe_info_object["spoonacular_recipe_id"] = recipe.spoonacular_recipe_id
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
