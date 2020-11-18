from flask import Flask, request
import uuid
from app import app
from app.models import *
from . import recipe_controller, ingredient_controller


@app.route('/api/drop')     
def drop_db():
    UserRating.query.delete()
    UserNotes.query.delete()
    RecipeIngredient.query.delete()
    RecipeCart.query.delete()
    Recipe.query.delete()
    db.session.commit()
    return "dropped table"

@app.route('/api/ingredients/add', methods=['POST'])      
def add_ingredient():
    recipe_id = request.get_json()["recipe_id"]
    ingredient_name = request.get_json()["ingredient_name"]
    amount = request.get_json()["amount"]
    unit_of_measurement = request.get_json()["unit_of_measurement"]
    return ingredient_controller.add_ingredient(RecipeIngredient, recipe_id, ingredient_name, amount, unit_of_measurement)

@app.route('/api/recipes/add', methods=['POST'])      
def add_recipe(): 
    recipe_id = uuid.uuid4()
    recipe_name = request.get_json()["recipe_name"]
    image_url = request.get_json()["image_url"]
    cuisines = request.get_json()["cuisines"]
    instructions = request.get_json()["instructions"]
    time_to_cook_in_minutes = request.get_json()["time_to_cook_in_minutes"]
    servings = request.get_json()["servings"]
    calories = request.get_json()["calories"]
    protein =request.get_json()["protein"]
    carbs = request.get_json()["carbs"]
    fat = request.get_json()["fat"]
    return recipe_controller.add_recipe(Recipe, recipe_id, recipe_name, image_url, cuisines, instructions, 
      time_to_cook_in_minutes, servings, calories, protein, carbs, fat)
                                                  