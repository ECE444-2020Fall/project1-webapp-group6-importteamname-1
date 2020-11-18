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

def test_showing_recipe_cart_unauthorized_user(client):
    """ Test that recipe cart returns 500 status code if user is not logged in """

    response = client.get('/api/recipe_cart')
    assert(response.status_code == 500)

def test_recipe_cart_empty(client):
    """ Test that recipe cart is empty before user adds any recipes to the cart """

    set_client_user_id(client)
    response = client.get('/api/recipe_cart')
    assert (len(response.json["recipes"]) == 0) 

