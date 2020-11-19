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

# yanisa's test
def test_showing_shopping_list(client):
    """ make sure that shopping list returns 200 status code if user is logged in """
    set_client_user_id(client)
    rv = client.get('/api/shopping_list/fc984203-a5a9-4cb6-9735-357e0cf2370b')
    assert(rv.status_code == 200)

def test_shopping_list_empty(client):
    """ Test that shopping list is empty before user adds any items to the list """

    set_client_user_id(client)
    response = client.get('/api/shopping_list/fc984203-a5a9-4cb6-9735-357e0cf2370b')
    assert (len(response.json["items"]) == 0) 

def test_remove_from_shopping_list_item_does_not_exist(client):
    """ Test that removing non-existent item from shopping list returns 405 """

    set_client_user_id(client)
    response = client.delete('/api/shopping_list/00000000-0000-0000-0000-afabc9dadae7')
    assert(response.status_code == 405)


