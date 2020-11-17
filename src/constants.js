﻿const CONSTANTS = {};

CONSTANTS.APP_NAME = 'ChefCoPilot';

// Used for deployment
// CONSTANTS.BACKEND_URL = 'https://chefcopilotbackend.herokuapp.com';

CONSTANTS.LOCAL_HOST_BACKEND_URL = "http://localhost:3001";
CONSTANTS.BACKEND_URL = 'http://localhost:3001';//'https://chefcopilotbackend.herokuapp.com';

CONSTANTS.ERROR_MESSAGE = {};

CONSTANTS.ERROR_MESSAGE.LIST_DELETE = 'Request to delete list item failed:';
CONSTANTS.ERROR_MESSAGE.LIST_ADD = 'Request to add list item failed:';
CONSTANTS.ERROR_MESSAGE.LIST_GET = 'Request to get list items failed:';
CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE = 'Please enter a valid message';

CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET =
  'Request to get master detail text failed:';

CONSTANTS.ENDPOINT = {};
CONSTANTS.ENDPOINT.REGISTER = `${CONSTANTS.BACKEND_URL}/api/add_user`;
CONSTANTS.ENDPOINT.LOGIN = `${CONSTANTS.BACKEND_URL}/api/login`;
CONSTANTS.ENDPOINT.LOGOUT = `${CONSTANTS.BACKEND_URL}/api/logout`;
CONSTANTS.ENDPOINT.SMART_SHOPPING_LIST = `${CONSTANTS.BACKEND_URL}/api/smart_shopping_list`;
CONSTANTS.ENDPOINT.SHOPPING_LIST = `${CONSTANTS.BACKEND_URL}/api/shopping_list`;
CONSTANTS.ENDPOINT.PANTRY_LIST = `${CONSTANTS.BACKEND_URL}/api/pantry_list`;
CONSTANTS.ENDPOINT.GET_ALL_RECIPES = `${CONSTANTS.BACKEND_URL}/api/recipes`;
CONSTANTS.ENDPOINT.GET_ALL_INGREDIENTS_BY_RECIPE_ID = `${CONSTANTS.LOCAL_HOST_BACKEND_URL}/api/ingredients`;
CONSTANTS.ENDPOINT.FAVOURITES_LIST = `${CONSTANTS.BACKEND_URL}/api/favourites_list`;
CONSTANTS.ENDPOINT.RECIPE_CART = `${CONSTANTS.BACKEND_URL}/api/recipe_cart`;
CONSTANTS.ENDPOINT.USER_RATING = `${CONSTANTS.BACKEND_URL}/api/user_rating`;
CONSTANTS.ENDPOINT.PANTRY_RECIPES = `${CONSTANTS.BACKEND_URL}/api/pantry_recipes`;
CONSTANTS.ENDPOINT.USER_NOTES = `${CONSTANTS.BACKEND_URL}/api/user_notes`;

export default CONSTANTS;
