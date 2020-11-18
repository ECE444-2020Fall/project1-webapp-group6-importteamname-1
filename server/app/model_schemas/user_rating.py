 # FileName: user_rating.py
 #
 # Description: Model class for user rating.
.#
 # Author(s): Yanisa Kham
 # Date: November 17, 2020 

from app import db
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType

class UserRating(db.Model):
    __tablename__ = 'user_rating'
    user_id = db.Column(
        UUIDType(), 
        db.ForeignKey('user.user_id'),
        nullable=False,
        primary_key=True
    )
    recipe_id = db.Column(
        UUIDType(), 
        db.ForeignKey('recipe.recipe_id'),
        nullable=False,
        primary_key=True
    )
    user_rating = db.Column(
        db.Float,
        nullable=False
    )

    def __init__(self, user_id, recipe_id, user_rating):
        self.user_id = user_id
        self.recipe_id = recipe_id
        self.user_rating = user_rating

    def update_item(self, value):
        self.user_rating = value

    def get_item(self):
        return self.user_rating

    def get_item_name(self):
        return self.recipe_id
