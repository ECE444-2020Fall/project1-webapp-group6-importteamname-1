from app import db
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType

class ConsumedRecipes(db.Model):
    __tablename__ = 'consumed_recipes'
    user_id = db.Column(
        UUIDType(), 
        db.ForeignKey('user.user_id'),
        nullable=False,
        primary_key=True
    )
    recipe_id = db.Column(
        UUIDType(), 
        db.ForeignKey('recipe.recipe_id'),
        primary_key=True,
        nullable=False
    )
    consumption_date = db.Column(
        db.Date,
        nullable=False
    )

    def __init__(self, user_id, recipe_id, date):
        self.user_id = user_id
        self.recipe_id = recipe_id
        self.consumption_date = date

