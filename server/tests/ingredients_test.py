import pytest
import json
from server import app
import uuid

@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

def test_get_ingredient_by_recipe_id(client): 
    """Testing that getting ingredients by recipe ID works"""

    response = client.get("/api/ingredients/01e8a5be-1b0c-44fa-942e-afabc9dadae7")

    assert(response.status_code == 200)
    assert(response.content_type == "application/json")
    assert("ingredients" in response.json)

def test_add_ingredient_foreign_key_violation(client):
    """Test that adding a single ingredient violates foreign key constraint"""

    request_header = {"Content-Type": "application/json"}
    request_body = {
        "recipe_id": "00000000-0000-0000-0000-000000000000",
        "ingredient_name": "hii",
        "amount": 22,
        "unit_of_measurement": "g"
    }

    response = client.post("/api/ingredients/add", data=json.dumps(request_body), headers=request_header)

    assert(response.status_code == 405) 
    assert(response.content_type == "text/html; charset=utf-8")