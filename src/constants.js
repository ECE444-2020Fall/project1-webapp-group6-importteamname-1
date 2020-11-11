const CONSTANTS = {};

CONSTANTS.APP_NAME = 'ChefCoPilot';

CONSTANTS.BACKEND_URL = 'http://localhost:3001'//'https://chefcopilotbackend.herokuapp.com';

CONSTANTS.ERROR_MESSAGE = {};

CONSTANTS.ERROR_MESSAGE.LIST_DELETE = 'Request to delete list item failed:';
CONSTANTS.ERROR_MESSAGE.LIST_ADD = 'Request to add list item failed:';
CONSTANTS.ERROR_MESSAGE.LIST_GET = 'Request to get list items failed:';
CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE = 'Please enter a valid message';

CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET =
  'Request to get master detail text failed:';

CONSTANTS.ENDPOINT = {};
CONSTANTS.ENDPOINT.LIST = `${CONSTANTS.BACKEND_URL}/api/list`;
CONSTANTS.ENDPOINT.MASTERDETAIL = `${CONSTANTS.BACKEND_URL}/api/masterdetail`;
CONSTANTS.ENDPOINT.REMOVE_SHOPPING_LIST_ITEM = `${CONSTANTS.BACKEND_URL}/api/remove_item_from_shopping_list`;
CONSTANTS.ENDPOINT.SHOPPING_LIST = `${CONSTANTS.BACKEND_URL}/api/shopping_list`;
CONSTANTS.ENDPOINT.FAVOURITES_LIST = `${CONSTANTS.BACKEND_URL}/api/favourites_list`;
CONSTANTS.ENDPOINT.RECIPE_CART = `${CONSTANTS.BACKEND_URL}/api/recipe_cart`;
CONSTANTS.ENDPOINT.USER_RATING = `${CONSTANTS.BACKEND_URL}/api/user_rating`;

export default CONSTANTS;
