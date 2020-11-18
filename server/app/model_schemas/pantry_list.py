 # FileName: pantry_list.py
 #
 # Description: Model class for pantry list.
.#
 # Author(s): Yanisa Kham
 # Date: November 17, 2020 

from app import db
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType

class PantryList(db.Model):
    __tablename__ = 'pantry_list'
    user_id = db.Column(
        UUIDType(), 
        db.ForeignKey('user.user_id'),
        nullable=False,
        primary_key=True
    )
    ingredient_name = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_INGREDIENT_NAME_LEN']),
        primary_key=True,
        nullable=False
    )

    def __init__(self, user_id, ingredient_name):
        self.user_id = user_id
        self.ingredient_name = ingredient_name

    def get_item_name(self):
        return self.ingredient_name