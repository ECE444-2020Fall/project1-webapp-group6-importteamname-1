import pytest

from server import app
import uuid


@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

def set_client_user_id(client):
    with client.session_transaction() as sess:
        sess["user_id"] = uuid.uuid4()

def test_showing_shopping_list(client):
    """ make sure that shopping list returns 200 status code if user is logged in """
    set_client_user_id(client)
    rv = client.get('/api/shopping_list')
    assert(rv.status_code == 200)

def test_invalid_user_shopping_list(client):
    """ make sure that shopping list returns 500 status code if user is not logged in """
    rv = client.get('/api/shopping_list')
    assert(rv.status_code == 500)
