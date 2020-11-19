 # FileName: recipe_controller.py
 #
 # Description: This file contains code used to add recipes to, retrieve all recipes and and get recipes by id
 # from the Recipe table.
 #
 # Author(s): Tim Fei
 # Date: November 17, 2020 

from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict

class RecipeController():

    def __init__(self, db):
        self.db = db 


    def add_recipe(self, model, recipe_id, recipe_name, image_url, cuisines, instructions, 
        time_to_cook_in_minutes, servings, calories, protein, carbs, fat):

        recipe = model(recipe_id, recipe_name, image_url, cuisines, instructions, 
            time_to_cook_in_minutes, servings, calories, protein, carbs, fat)
        self.db.session.add(recipe)
        self.db.session.commit()
        
        json_response = jsonify({
            'recipe_id': recipe_id,
            'recipe_name': recipe_name
        })
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])


    def get_all_recipes(self, model):
        recipes = model.query.all() 
        recipe_map = {
            "recipes": [
                {
                    "recipe_id": recipe.recipe_id,
                    "recipe_name": recipe.recipe_name,
                    "image_url": recipe.image_url,
                    "cuisine": recipe.cuisine,
                    "instructions": recipe.instructions,
                    "time_to_cook_in_minutes": recipe.time_to_cook_in_minutes,
                    "servings": recipe.servings,
                    "calories": recipe.calories,
                    "protein": recipe.protein,
                    "carbs": recipe.carbs,
                    "fat": recipe.fat
                } for recipe in recipes
            ]
        }
        return make_response(jsonify(recipe_map), CONSTANTS['HTTP_STATUS']['200_OK'])


    def get_recipes_by_ids(self, recipe_ids, model):
        recipes = model.query.filter(model.recipe_id.in_(recipe_ids)).all() 
        recipe_map = {
            "recipes": [
                {
                    "recipe_id": recipe.recipe_id,
                    "recipe_name": recipe.recipe_name,
                    "image_url": recipe.image_url,
                    "cuisine": recipe.cuisine,
                    "instructions": recipe.instructions,
                    "time_to_cook_in_minutes": recipe.time_to_cook_in_minutes,
                    "servings": recipe.servings,
                    "calories": recipe.calories,
                    "protein": recipe.protein,
                    "carbs": recipe.carbs,
                    "fat": recipe.fat
                } for recipe in recipes
            ]
        }
        return make_response(jsonify(recipe_map), CONSTANTS['HTTP_STATUS']['200_OK'])
