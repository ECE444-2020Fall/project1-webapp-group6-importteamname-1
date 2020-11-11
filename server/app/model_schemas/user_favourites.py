from app import db
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType
from .recipe import Recipe
from .user import User

class UserFavourites(db.Model):
    __tablename__ = 'user_favourites'
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

    def __init__(self, user_id, recipe_id):
        self.user_id = user_id
        self.recipe_id = recipe_id

    def get_item(self):
        return True

    def get_feedback(self):
        return True

    def get_item_name(self):
        return self.recipe_id
        return int.from_bytes(self.recipe_id, byteorder='little')
