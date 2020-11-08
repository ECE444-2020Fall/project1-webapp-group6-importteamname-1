﻿const CONSTANTS = {};

CONSTANTS.APP_NAME = 'ChefCoPilot';

CONSTANTS.BACKEND_URL = 'https://chefcopilotbackend.herokuapp.com';

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
CONSTANTS.ENDPOINT.ADD_SHOPPING_LIST_ITEM = `${CONSTANTS.BACKEND_URL}/api/add_item_to_shopping_list`;
CONSTANTS.ENDPOINT.GET_SHOPPING_LIST = `${CONSTANTS.BACKEND_URL}/api/shopping_list`;
export default CONSTANTS;
