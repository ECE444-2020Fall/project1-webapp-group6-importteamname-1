from app import db
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from constants import CONSTANTS
import uuid

class User(db.Model):
    user_id = db.Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4, 
        unique=True, 
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
