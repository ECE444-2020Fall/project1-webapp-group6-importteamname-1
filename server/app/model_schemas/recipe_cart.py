from app import db
from sqlalchemy_utils import UUIDType

class RecipeCart(db.Model):
    __tablename__ = 'recipe_cart'
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

    def __init__(self, user_id, recipe_id):
        self.user_id = user_id
        self.recipe_id = recipe_id

    def get_item_name(self):
        # if type(self.recipe_id) == bytes:
        #     print("byte object")
        #     return  int.from_bytes(self.recipe_id, 'little')
        # print(type(self.recipe_id),"object")
        return self.recipe_id

    def get_feedback(self):
        return True

    def get_item(self):
        return True
