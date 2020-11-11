from app import db
from sqlalchemy_utils import UUIDType

class FavouritesList(db.Model):
    __tablename__ = 'favourites_list'
    user_id = db.Column(
        UUIDType(), 
        db.ForeignKey('user.user_id'),
        nullable=False,
        primary_key=True
    )
    recipe_id = db.Column(
        db.Integer,
        db.ForeignKey('recipe.recipe_id'),
        nullable=False,
        primary_key=True
    )

    def __init__(self, user_id, recipe_id):
        self.user_id = user_id
        self.recipe_id = recipe_id

    def get_item_name(self):
        return self.recipe_id