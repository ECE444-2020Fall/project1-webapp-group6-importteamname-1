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

def test_showing_recipe_cart(client):
    """ Test that recipe cart returns 200 status code if user is logged in """

    set_client_user_id(client)
    response = client.get('/api/recipe_cart')
    assert(response.status_code == 200)


def test_remove_from_recipe_cart_item_does_not_exist(client):
    """ Test that removing non-existent item from recipe cart returns 400 """

    set_client_user_id(client)
    response = client.delete('/api/recipe_cart/00000000-0000-0000-0000-afabc9dadae7')
    assert(response.status_code == 400)