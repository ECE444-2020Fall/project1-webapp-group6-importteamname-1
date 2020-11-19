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

def test_showing_favourites_list_unauthenticated_user(client):
    """ Test that favourites list returns 200 status code if user is logged in """

    set_client_user_id(client)
    response = client.get('/api/favourites_list/fc984203-a5a9-4cb6-9735-357e0cf2370b')
    assert(response.status_code == 200)

def test_favourites_list_empty(client):
    """ Test that the favorite list is empty before user adds any items to favorites """

    set_client_user_id(client)
    response = client.get('/api/favourites_list/fc984203-a5a9-4cb6-9735-357e0cf2370b')
    assert (len(response.json["recipes"]) == 0) 

def test_remove_from_favourites_list_item_does_not_exist(client):
    """ Test that removing non-existent item from favourites list returns 405 """

    set_client_user_id(client)
    response = client.delete('/api/favourites_list/00000000-0000-0000-0000-afabc9dadae7')
    assert(response.status_code == 405)



