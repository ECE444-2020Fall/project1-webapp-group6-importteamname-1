import pytest
import json
from server import app
import uuid

@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

def test_get_all_ingredients(client): 
    """Testing that getting all ingredient works"""

    response = client.get("/api/ingredients")

    assert(response.status_code == 200)
    assert(response.content_type == "application/json")
    assert("ingredients" in response.json)

def test_add_ingredient(client):
    """Test that adding a single ingredient works"""

    request_header = {"Content-Type": "application/json"}
    request_body = {
        "recipe_id": "02e55097-a9ed-4225-9a38-82f3aea0347c",
        "ingredient_name": "hii",
        "amount": 22,
        "unit_of_measurement": "g"
    }

    response = client.post("/api/ingredients/add", data=json.dumps(request_body), headers=request_header)

    assert(response.status_code == 201) 
    assert(response.content_type == "application/json")