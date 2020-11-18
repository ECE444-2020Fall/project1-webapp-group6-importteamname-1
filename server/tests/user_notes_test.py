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


def test_showing_user_notes(client):
    """ Test that user notes returns 200 status code if user is logged in """

    set_client_user_id(client)
    response = client.get('/api/user_notes')
    assert(response.status_code == 200)
