import requests

def get_recipes_from_spoonacular_api(spoonacular_api_key):
    """
    Get a list of recipes from the Spoonacular API.

    Args:
        spoonacular_api_key: API key used for accessing the Spoonacular API.
    Returns:
        A JSON object containing recipes and their associated details.
    """
    spoonacular_api_recipes_endpoint = "https://api.spoonacular.com/recipes/random"
    params_for_recipes_endpoint = {
        'apiKey' : spoonacular_api_key,
        'number' : 1
    }
    spoonacular_recipes_response = requests.get(spoonacular_api_recipes_endpoint, params=params_for_recipes_endpoint)
    return spoonacular_recipes_response.json()
     

def get_recipe_nutrition_from_spoonacular_api(spoonacular_api_key, spoonacular_recipe_id):
    """
    Get nutrition information for one single recipe.

    Args:
        spoonacular_api_key: API key used for accessing the Spoonacular API.
        spoonacular_recipe_id: The id of the recipe on Spoonacular API's website.
    Returns:
        A JSON object containing nutrition info of a specific recipe.
    """
    spoonacular_api_recipe_nutrition_endpoint = "https://api.spoonacular.com/recipes/{}/nutritionWidget.json".format(spoonacular_recipe_id)
    params_for_recipe_nutrition_endpoint = {
        'apiKey' : spoonacular_api_key,
    }
    recipe_nutrition_response = requests.get(spoonacular_api_recipe_nutrition_endpoint, params=params_for_recipe_nutrition_endpoint)
    return recipe_nutrition_response.json()
     

def process_spoonacular_recipes(spoonacular_recipes_json, spoonacular_api_key):
    """
    Parse the recipes from Spoonacular API and extract fields that are needed for the Chef Co-Pilot App.

    Args:
        spoonacular_recipes_json: API key used for accessing the Spoonacular API.
        spoonacular_api_key: API key used for accessing the Spoonacular API.
    Returns:
        None
    """
    for recipe in range(len(spoonacular_recipes_json["recipes"])):
        spoonacular_recipe_id = spoonacular_recipes_json["recipes"][recipe]["id"]
        recipe_name = spoonacular_recipes_json["recipes"][recipe]["title"]
        recipe_image = spoonacular_recipes_json["recipes"][recipe]["image"]
        cuisines = spoonacular_recipes_json["recipes"][recipe]["cuisines"][:]
        time_to_cook_in_minutes = spoonacular_recipes_json["recipes"][recipe]["readyInMinutes"]
        servings = spoonacular_recipes_json["recipes"][recipe]["servings"]
        
        instructions = []
        instructions_steps = spoonacular_recipes_json["recipes"][recipe]["analyzedInstructions"][0]["steps"]
        
        for entry in range (len(instructions_steps)):
            instructions.append(instructions_steps[entry]["step"])
        
        recipe_nutrition_json = get_recipe_nutrition_from_spoonacular_api(spoonacular_api_key, spoonacular_recipe_id)

        calories = recipe_nutrition_json["calories"]       
        carbs = recipe_nutrition_json["carbs"]
        fat = recipe_nutrition_json["fat"]
        protein = recipe_nutrition_json["protein"]
   
        populate_chef_copilot_database(spoonacular_recipe_id, recipe_name, recipe_image, cuisines, time_to_cook_in_minutes,
                                                        servings, instructions, calories, carbs, fat, protein)
    return 


def populate_chef_copilot_database(spoonacular_recipe_id, recipe_name, recipe_image, cuisines, time_to_cook_in_minutes,
                                                     servings, instructions, calories, carbs, fat, protein):
    """
    Populate the Chef Co-Pilot app's Amazon RDS database with recipes.

    Args:
        spoonacular_recipe_id: The id of the recipe on Spoonacular API's website.
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
        A HTTP status code of the request to server.py's endpoint.
    """
    chef_copilot_server_endpoint = "http://localhost:3001/api/recipes/add"
    request_body = {
        "spoonacular_recipe_id": spoonacular_recipe_id,
        "recipe_name": recipe_name,
        "recipe_image": recipe_image,
        "cuisines": str(cuisines),
        "instructions": str(instructions),
        "time_to_cook_in_minutes": time_to_cook_in_minutes,
        "servings": servings,
        "calories": calories,
        "protein": protein,
        "carbs": carbs,
        "fat": fat
    }
    request_headers = {
        'Content-type': 'application/json'
    }

    chef_copilot_server_response = requests.post(chef_copilot_server_endpoint, json=request_body, headers=request_headers)
    
    return chef_copilot_server_response.json()


spoonacular_api_key = "e568b1c9b8374dbe9ce768f1f5a94d08"
spoonacular_recipes_json = get_recipes_from_spoonacular_api(spoonacular_api_key)
populate_db_response = process_spoonacular_recipes(spoonacular_recipes_json, spoonacular_api_key)
print(populate_db_response)