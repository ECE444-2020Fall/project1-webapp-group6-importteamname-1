import pytest

from server import app
import uuid


@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

def test_get_all_recipes(client): 
    result = client.get('/api/recipes')
    assert(result.status_code == 200)
    

