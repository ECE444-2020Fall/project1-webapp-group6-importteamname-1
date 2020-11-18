 # FileName: user.py
 #
 # Description: Model class for user.
.#
 # Author(s): Yanisa Kham
 # Date: November 17, 2020 

from app import db
import uuid
from constants import CONSTANTS
from sqlalchemy_utils import UUIDType

class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(
        UUIDType(), 
        primary_key=True, 
        default=uuid.uuid4, 
        nullable=False
    )

    username = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_USERNAME_LEN']),
        nullable=False
    )

    password = db.Column(
        db.String(CONSTANTS['DB_SCHEMA']['MAX_PASSWORD_LEN']),
        nullable=False
    )

    def __init__(self, username, password):
        self.username = username
        self.password = password
