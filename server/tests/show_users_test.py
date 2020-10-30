import pytest

from server import app
import uuid


@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

def test_show_users(client):   
    result = client.get('/api/show_users')
    assert(result.status_code == 200)
    
def test_show_users_with_wrong_url(client):   
    result = client.get('/api/show_users_')
    assert(result.status_code == 404)
