 # FileName: constants.py
 #
 # Description: This file contains constants used in the back-end code.
 #
 # Author(s): Yanisa Kham, Tim Fei, Johnathon Martin
 # Date: November 17, 2020 


import os
from http import HTTPStatus

CONSTANTS = {
    'PORT': os.environ.get('PORT', 3001),
    'HTTP_STATUS': {
        '200_OK': HTTPStatus.OK,
        '201_CREATED': HTTPStatus.CREATED,
        '400_BAD_REQUEST': HTTPStatus.BAD_REQUEST,
        '404_NOT_FOUND': HTTPStatus.NOT_FOUND,
        '500_INTERNAL_SERVER_ERROR': HTTPStatus.INTERNAL_SERVER_ERROR
    },
    'DATABASE_URL': 'mysql+pymysql://admin:ece444iscool@chefcopilotdb.cwgapkme6bda.us-east-2.rds.amazonaws.com/chefcopilot?charset=utf8',
    'CHEF_COPILOT': {
        'LOCAL_HOST_BASE_URL': "http://localhost:3001/api",
    },
    'SPOONACULAR_API': {
        'API_KEY': 'e568b1c9b8374dbe9ce768f1f5a94d08',
        'BASE_URL': 'https://api.spoonacular.com/recipes',
        'RANDOM_RECIPES_ENDPOINT': '/random',
        'RECIPE_NUTRITION_ENDPOINT': '/{}/nutritionWidget.json',
        'RECIPE_INGREDIENTS_ENDPOINT': '/{}/ingredientWidget.json',
    },
    'DB_SCHEMA': {
        'MAX_USERNAME_LEN': 120,
        'MAX_PASSWORD_LEN': 100,
        'MAX_INGREDIENT_NAME_LEN': 100,
        'MAX_RECIPE_NAME_LEN': 100,
        'MAX_CUISINE_LEN': 50,
        'MAX_INSTRUCTION_LEN': 5000000,
        'MAX_MEASUREMENT_UNIT_LEN': 50,
        'MAX_IMAGE_URL_LEN': 100,
        'MAX_NUTRITION_STRING_LEN': 20
    }
}
