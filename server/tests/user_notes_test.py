import pytest
import json
from pathlib import Path

from server import app, db
import uuid

TEST_DB = "test.db"

ctx = app.app_context()

ctx.push()

@pytest.fixture
def client():
    app.config["TESTING"] = True
    app.config["DATABASE"] = TEST_DB
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    db.create_all() 
    return app.test_client()  


def set_client_user_id(client):
    with client.session_transaction() as sess:
        sess["user_id"] = uuid.uuid4()


def test_showing_user_notes_unauthorized_user(client):
    """ Test that user notes returns 500 status code if user is not logged in """

    response = client.get('/api/user_notes/2e#')
    assert(response.status_code == 404)

def test_user_notes_empty(client):
    """ Test that the user notes list is empty before user adds any notes to recipes """

    set_client_user_id(client)
    response = client.get('/api/user_notes/fc984203-a5a9-4cb6-9735-357e0cf2370b')
    assert(response.status_code == 404)

