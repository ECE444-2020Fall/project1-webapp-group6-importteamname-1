from flask import jsonify, make_response, session
from constants import CONSTANTS
from collections import defaultdict
import sqlalchemy
from flask import jsonify, make_response, session

def get_user_id():
    if 'user_id' not in session:
        print("user id not in session")
        user_id = "9890648f-c400-4c98-9796-e1afbc7774db"
        # json_response = jsonify({ 
        #     'error': 'user_id not in session, log in again'
        # })
        # return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])
    else:
        print("user id in session")
        user_id = session['user_id']
    return user_id


class CalorieTrackerManager():

    def __init__(self, db):
        self.db = db 

    # This function adds a recipe to the consumed recipes table
    def add_consumed_recipe(self, model, recipe_id, date)
        user_id = get_user_id()
        consumedRecipe = model(user_id, recipe_id, date)

        self.db.session.add(consumedRecipe)
        self.db.session.commit()

        json_response = jsonify({
            'recipe_id': recipe_id,
            'date': date
        })

        return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])

    # This function deletes a specific recipe from the consumed recipes table
    def delete_consumed_recipe(self, model):
        user_id = get_user_id()
        consumedRecipe = model(user_id, recipe_id, date)

        self.db.session.query(consumedRecipe).delete()
        self.db.session.commit()
        
        json_response = jsonify({
            'success': 'Deleted recipe': recipe_id
            'recipe added on': date
        })

        return make_response(json_response, CONSTANTS['HTTP_STATUS']['200_OK'])

    #This function retreives all consumed recipes for the day from the consumed recipes table
    def get_consumed_recipes(self, model1, model2, date):
        user_id = get_user_id()
        consumed_recipes_list = self.db.session.query(model1).filter_by(user_id=user_id, consumption_date=date).all()
        recipes = model2.query.all() 
        consumed_recipes = self.db.session.query(model1, model2).join(model2, model2.recipe_id == model1.recipe_id).all()
        consumed_recipes_map = {"consumed_recipes": []}

        for consumed_recipe in consumed_recipes:
            recipe_info_object = {
                "recipe_id": recipe.recipe_id,
                "recipe_name": recipe.recipe_name,
                "image_url": recipe.image_url,
                "calories": recipe.calories / recipe.servings,
                "protein": recipe.protein / recipe.servings,
                "carbs": recipe.carbs / recipe.servings,
                "fat": recipe.fat / recipe.servings
            }

            consumed_recipes_map["consumed_recipes"].append(recipe_info_object)

        return make_response(jsonify(consumed_recipes_map), CONSTANTS['HTTP_STATUS']['200_OK'])
