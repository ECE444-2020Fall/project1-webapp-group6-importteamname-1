import pytest
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import json
from server import app
import uuid


@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

def test_get_all_recipes(client): 
    """Test that get all recipes work"""

    response = client.get("/api/recipes")

    assert(response.status_code == 200)
    assert(response.content_type == "application/json")
    assert("recipes" in response.json)
    assert("recipe_id" in response.json["recipes"][0])
    assert("recipe_name" in response.json["recipes"][0])
    assert("image_url" in response.json["recipes"][0])
    assert("cuisine" in response.json["recipes"][0])
    assert("instructions" in response.json["recipes"][0])
    assert("time_to_cook_in_minutes" in response.json["recipes"][0])
    assert("servings" in response.json["recipes"][0])
    assert("calories" in response.json["recipes"][0])
    assert("protein" in response.json["recipes"][0])
    assert("carbs" in response.json["recipes"][0])
    assert("fat" in response.json["recipes"][0])


    



