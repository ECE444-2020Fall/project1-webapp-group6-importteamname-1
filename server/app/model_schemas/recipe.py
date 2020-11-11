from app import db
import uuid
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType

class Recipe(db.Model):
    __tablename__ = 'recipe'
    
    recipe_id = db.Column(
        'recipe_id',
        db.Integer,
        primary_key=True, 
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
        db.Float,
        nullable=False
    )

    carbs = db.Column(
        db.Float,
        nullable=False
    )

    fat = db.Column(
        db.Float,
        nullable=False
    )

    def __init__(
        self, recipe_id, recipe_name, image_url, cuisine, instructions, time_to_cook_in_minutes, 
                                                                        servings, calories, protein, carbs, fat):
        self.recipe_id = recipe_id 
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


# class UserFavourites(db.Model):
#     __tablename__ = 'user_favourites'
#     user_id = db.Column(
#         'user_id',
#         UUIDType(), 
#         db.ForeignKey('user.user_id'),
#         nullable=False,
#         primary_key=True
#     )
#     recipe_id = db.Column(
#         'recipe_id',
#         db.Integer,
#         db.ForeignKey('recipe.recipe_id'),
#         primary_key=True,
#         nullable=False
#     )

#     def __init__(self, user_id, recipe_id):
#         self.user_id = user_id
#         self.recipe_id = recipe_id

#     def get_feedback(self):
#         return True

#     def get_item_name(self):
#         return int.from_bytes(self.recipe_id, byteorder='little')
