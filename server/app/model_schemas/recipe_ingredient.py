 # FileName: recipe_ingredient.py
 #
 # Description: Model class for recipe_ingredient.
.#
 # Author(s): Yanisa Kham
 # Date: November 17, 2020 

from app import db
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType

class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredient'

    recipe_id = db.Column(  
        UUIDType(),
        db.ForeignKey('recipe.recipe_id'),
        nullable=False,
        primary_key=True
    )
    ingredient_name = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_INGREDIENT_NAME_LEN']),
        nullable=False,
        primary_key=True
    )
    amount = db.Column(
        db.Float,
        nullable=False
    )
    unit_of_measurement = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_MEASUREMENT_UNIT_LEN'])
    )

    def __init__(self, recipe_id, ingredient_name, amount, unit_of_measurement):
        self.recipe_id = recipe_id
        self.ingredient_name = ingredient_name
        self.amount = amount
        self.unit_of_measurement = unit_of_measurement

    def get_item_name(self):
        return self.ingredient_name

 
