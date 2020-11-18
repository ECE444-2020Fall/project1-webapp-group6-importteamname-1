import pytest
from pathlib import Path
from server import app, db
import uuid


@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

def set_client_user_id(client):
    with client.session_transaction() as sess:
        sess["user_id"] = uuid.uuid4()

def test_show_pantry_list(client):
    """ Test that pantry list returns 200 status code if user is logged in """

    set_client_user_id(client)
    response = client.get('/api/pantry_list')
    assert(response.status_code == 200)


