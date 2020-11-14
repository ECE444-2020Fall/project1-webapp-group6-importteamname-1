from app import db
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType

class UserNotes(db.Model):
    __tablename__ = 'user_notes'
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
    user_notes = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_INSTRUCTION_LEN']),
        nullable=False
    )

    def __init__(self, user_id, recipe_id, user_notes):
        self.user_id = user_id
        self.recipe_id = recipe_id
        self.user_notes = user_notes

    def update_feedback(self, feedback):
        self.user_notes = feedback

    def get_feedback(self):
        return self.user_notes