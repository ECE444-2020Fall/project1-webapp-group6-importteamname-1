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

def test_remove_from_pantry_item_does_not_exist(client):
    """ Test that removing non-existent item from pantry list returns 405 """

    set_client_user_id(client)
    response = client.delete('/api/pantry/00000000-0000-0000-0000-afabc9dadae7')
    assert(response.status_code == 405)

def test_get_all_items_from_pantry_user_not_in_session(client):
    """ Test that getting pantry items returns 404 status code if user is not in session """

    response = client.get('/api/pantry')
    assert(response.status_code == 404)