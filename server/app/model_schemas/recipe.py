from app import db
import uuid
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType

class Recipe(db.Model):
    __tablename__ = 'recipe'
    
    '''
    This recipe_id is used WITHIN our Chef Co-Pilot app. We cannot use the spoonacular_recipe_id as
    recipe_id because recipe_id needs to be of type UUID.
    '''
    recipe_id = db.Column(
        UUIDType(), 
        primary_key=True, 
        default=uuid.uuid4, 
        nullable=False
    )

    '''
    This is the recipe's ID on Spoonacular API's website. We include it here
    to prevent the scraper from populating our DB with repeated recipes from Spoonacular.
    '''
    spoonacular_recipe_id = db.Column(
        db.Integer,
        nullable=False
    )

    recipe_name = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_RECIPE_NAME_LEN']),
        nullable=False
    )

    image_url = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_IMAGE_URL_LEN']),
        nullable=False
    )

    cuisine = db.Column( 
        db.String(CONSTANTS['DB_SCHEMA']['MAX_CUISINE_LEN']),
        nullable=False
    )

    instructions = db.Column( 
        db.String(CONSTANTS['DB_SCHEMA']['MAX_INSTRUCTION_LEN']),
        nullable=False
    )

    time_to_cook_in_minutes = db.Column(
        db.Integer,
        nullable=False
    )

    servings = db.Column(
        db.Integer,
        nullable=False
    )

    calories = db.Column(
        db.Float,
        nullable=False
    )

    protein = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_NUTRITION_STRING_LEN']),
        nullable=False
    )

    carbs = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_NUTRITION_STRING_LEN']),
        nullable=False
    )

    fat = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_NUTRITION_STRING_LEN']),
        nullable=False
    )

    def __init__(
        self, spoonacular_recipe_id, recipe_name, image_url, cuisine, instructions, time_to_cook_in_minutes, 
                                                                        servings, calories, protein, carbs, fat):
        self.spoonacular_recipe_id = spoonacular_recipe_id 
        self.recipe_name = recipe_name
        self.image_url = image_url 
        self.cuisine = cuisine 
        self.instructions = instructions 
        self.time_to_cook_in_minutes = time_to_cook_in_minutes
        self.servings = servings
        self.calories = calories
        self.protein = protein
        self.carbs = carbs
        self.fat = fat
