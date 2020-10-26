from app import db
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType

class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredient'
    user_id = db.Column(
        UUIDType(), 
        db.ForeignKey('user.user_id'),
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

    def __init__(self, user_id, ingredient_name, amount, unit_of_measurement):
        self.user_id = user_id
        self.ingredient_name = ingredient_name
        self.amount = amount
        self.unit_of_measurement = unit_of_measurement
