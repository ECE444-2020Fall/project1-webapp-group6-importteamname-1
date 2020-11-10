import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import db, app, recipe_controller, ingredient_controller
from app.models import *
from constants import CONSTANTS
import requests

def get_recipes_from_spoonacular_api(spoonacular_api_key):
    """
    Get a list of recipes from the Spoonacular API.

    Args:
        spoonacular_api_key: API key used for accessing the Spoonacular API.
    Returns:
        A JSON object containing recipes and their associated details.
    """
    spoonacular_api_recipes_endpoint = CONSTANTS["SPOONACULAR_API"]["BASE_URL"] + CONSTANTS["SPOONACULAR_API"]["RANDOM_RECIPES_ENDPOINT"]
    params_for_recipes_endpoint = {
        'apiKey' : spoonacular_api_key,
        'number' : 1
    }
    spoonacular_recipes_response = requests.get(spoonacular_api_recipes_endpoint, params=params_for_recipes_endpoint)
    return spoonacular_recipes_response.json()


def get_ingredients_from_spoonacular_api_using_recipe_id(spoonacular_api_key, recipe_id):
    """
    Get a list of recipes from the Spoonacular API.

    Args:
        spoonacular_api_key: API key used for accessing the Spoonacular API.
    Returns:
        A JSON object containing recipes and their associated details.
    """
    spoonacular_api_ingredients_endpoint = CONSTANTS["SPOONACULAR_API"]["BASE_URL"] + CONSTANTS["SPOONACULAR_API"]["RECIPE_INGREDIENTS_ENDPOINT"].format(recipe_id)
    params_for_ingredients_endpoint = {
        'apiKey' : spoonacular_api_key,
    }
    spoonacular_ingredients_response = requests.get(spoonacular_api_ingredients_endpoint, params=params_for_ingredients_endpoint)
    return spoonacular_ingredients_response.json()


def get_recipe_nutrition_from_spoonacular_api(spoonacular_api_key, recipe_id):
    """
    Get nutrition information for one single recipe.

    Args:
        spoonacular_api_key: API key used for accessing the Spoonacular API.
        recipe_id: The id of the recipe on Spoonacular API's website.
    Returns:
        A JSON object containing nutrition info of a specific recipe.
    """
    spoonacular_api_recipe_nutrition_endpoint = CONSTANTS["SPOONACULAR_API"]["BASE_URL"] + CONSTANTS["SPOONACULAR_API"]["RECIPE_NUTRITION_ENDPOINT"].format(recipe_id)
    params_for_recipe_nutrition_endpoint = {
        'apiKey' : spoonacular_api_key,
    }
    recipe_nutrition_response = requests.get(spoonacular_api_recipe_nutrition_endpoint, params=params_for_recipe_nutrition_endpoint)
    return recipe_nutrition_response.json()
     

def process_spoonacular_recipes(spoonacular_api_key, spoonacular_recipes_json):
    """
    Parse the recipes from Spoonacular API and extract fields that are needed for the Chef Co-Pilot App.

    Args:
        spoonacular_recipes_json: API key used for accessing the Spoonacular API.
        spoonacular_api_key: API key used for accessing the Spoonacular API.
    Returns:
        None
    """
    for recipe in spoonacular_recipes_json["recipes"]:
        recipe_id = recipe["id"]
        recipe_name = recipe["title"]
        image_url = recipe["image"]
        cuisines = str(recipe["cuisines"][:])
        time_to_cook_in_minutes = recipe["readyInMinutes"]
        servings = recipe["servings"]
                
        instructions_steps = recipe["analyzedInstructions"][0]["steps"]
        instructions = str([instruction["step"] for instruction in instructions_steps])
        
        recipe_nutrition_json = get_recipe_nutrition_from_spoonacular_api(spoonacular_api_key, recipe_id)
        calories = float(recipe_nutrition_json["calories"])  
        carbs = float(recipe_nutrition_json["carbs"][:-1])
        fat = float(recipe_nutrition_json["fat"][:-1])
        protein = float(recipe_nutrition_json["protein"][:-1])
   
        populate_recipes_database(recipe_id, recipe_name, image_url, cuisines, time_to_cook_in_minutes,
                                                        servings, instructions, calories, carbs, fat, protein)
        
        process_recipe_ingredients(spoonacular_api_key, recipe_id)
    return 


def process_recipe_ingredients(spoonacular_api_key, recipe_id):
    """
    Parse a recipe's ingredients from Spoonacular API and extract fields that are needed for the Chef Co-Pilot App.

    Args:
        spoonacular_api_key: API key used for accessing the Spoonacular API.
        recipe_id: ID of a recipe. We're processing ingredients for this recipe.
    Returns:
        None
    """
    spoonacular_recipe_ingredients_json = get_ingredients_from_spoonacular_api_using_recipe_id(spoonacular_api_key, recipe_id)

    for ingredient in spoonacular_recipe_ingredients_json["ingredients"]:
        ingredient_name = ingredient["name"]
        amount = ingredient["amount"]["metric"]["value"]
        unit_of_measurement = ingredient["amount"]["metric"]["unit"]

        populate_ingredients_database(recipe_id, ingredient_name, amount, unit_of_measurement)

    return

def populate_recipes_database(recipe_id, recipe_name, image_url, cuisines, time_to_cook_in_minutes,
                                                     servings, instructions, calories, carbs, fat, protein):
    """
    Populate the Chef Co-Pilot app's recipes database with recipes.

    Args:
        recipe_id: The id of the recipe on Spoonacular API's website.
        recipe_name: Name of a recipe
        cuisines: Cuisines of a recipe
        time_to_cook_in_minutes: The time it takes to cook the recipe
        servings: Number of servings of the cipe
        instructions: The instruction for preparing the recipe
        calories: Amount of calories contained in the recipe
        carbs: Amount of carbs contained in the recipe
        fat: Amount of fat contained in the recipe
        protein: Amount of protein contained in the recipe 
    Returns:
        None.
    """
    recipe_controller.add_recipe(Recipe, recipe_id.to_bytes(10, 'little'), recipe_name, image_url, cuisines, instructions, time_to_cook_in_minutes, servings, calories, protein, carbs, fat)
    print("Inserted: recipe_id: {}, recipe_name: {}".format(recipe_id, recipe_name))
   

def populate_ingredients_database(recipe_id, ingredient_name, amount, unit_of_measurement):
    """
    Populate the Chef Co-Pilot app's ingredients database with ingredients.

    Args:
        recipe_id: The id of the recipe on Spoonacular API's website.
        ingredient_name: Name of the ingredient
        amount: quantity of the ingredient
        unit_of_measurement: unit of measurement of the ingredient
    Returns:
        A HTTP status code of the request to server.py's endpoint.
    """
    
    ingredient_controller.add_ingredient(RecipeIngredient, recipe_id.to_bytes(10, 'little'), ingredient_name, amount, unit_of_measurement)
  
    print("Inserted: recipe_id: {}, ingredient_name: {}".format(recipe_id, ingredient_name))


with app.app_context():
    spoonacular_api_key = CONSTANTS["SPOONACULAR_API"]["API_KEY"]
    spoonacular_recipes_json = get_recipes_from_spoonacular_api(spoonacular_api_key)
    populate_db_response = process_spoonacular_recipes(spoonacular_api_key, spoonacular_recipes_json)
