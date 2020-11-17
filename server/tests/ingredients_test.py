import pytest

from server import app
import uuid

@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

def test_get_all_ingredients(client): 
    response = client.get('/api/ingredients')
    assert(response.status_code == 200)
    assert(response.content_type == "application/json")

def test_add_ingredient(client):
    pass
    # response = client.get('/api/ingredients/add')
    # assert(response.status_code == 200)
    # assert(response.content_type == "application/json")

def test_get_ingredient_by_recipe_id(client):
    pass