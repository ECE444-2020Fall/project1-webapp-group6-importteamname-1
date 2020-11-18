 # FileName: shopping_list.py
 #
 # Description: Model class for shopping list.
 #
 # Author(s): Yanisa Kham
 # Date: November 17, 2020 

from app import db
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType

class ShoppingList(db.Model):
    __tablename__ = 'shopping_list'
    user_id = db.Column(
        UUIDType(), 
        db.ForeignKey('user.user_id'),
        nullable=False,
        primary_key=True
    )
    item_name = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_INGREDIENT_NAME_LEN']),
        primary_key=True,
        nullable=False
    )

    def __init__(self, user_id, item_name):
        self.user_id = user_id
        self.item_name = item_name

    def get_item_name(self):
        return self.item_name
