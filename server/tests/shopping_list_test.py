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
    rv = client.get('/api/shopping_list')
    assert(rv.status_code == 200)

# yanisa's test
def test_invalid_user_shopping_list(client):
    """ make sure that shopping list returns 500 status code if user is not logged in """
    rv = client.get('/api/shopping_list')
    assert(rv.status_code == 500)

def test_remove_from_shopping_list_item_does_not_exist(client):
    """ Test that removing non-existent item from shopping list returns 400 """

    set_client_user_id(client)
    response = client.delete('/api/favourites_list/00000000-0000-0000-0000-afabc9dadae7')
    assert(response.status_code == 400)


def test_get_all_items_from_shopping_list_user_not_in_session(client):
    """ Test that getting all items from shopping list returns 500 status code if user is not in session """

    response = client.get('/api/shopping_list')
    assert(response.status_code == 500)