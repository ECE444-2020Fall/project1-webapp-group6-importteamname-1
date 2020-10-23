import os
from http import HTTPStatus

CONSTANTS = {
    'PORT': os.environ.get('PORT', 3001),
    'HTTP_STATUS': {
        '404_NOT_FOUND': HTTPStatus.NOT_FOUND,
        '201_CREATED': HTTPStatus.CREATED,
        '500_INTERNAL_SERVER_ERROR': HTTPStatus.INTERNAL_SERVER_ERROR
    },
    'ENDPOINT': {
        'MASTER_DETAIL': '/api/masterdetail',
        'LIST': '/api/list',
    },
    'DATABASE_URL': 'mysql+pymysql://admin:ece444iscool@chefcopilotdb.cwgapkme6bda.us-east-2.rds.amazonaws.com/chefcopilot',
    'DB_SCHEMA': {
        'MAX_USERNAME_LEN': 120,
        'MAX_PASSWORD_LEN': 100,
        'MAX_INGREDIENT_NAME_LEN': 100,
        'MAX_RECIPE_NAME_LEN': 100,
        'MAX_CUISINE_LEN': 50,
        'MAX_INSTRUCTION_LEN': 500,
        'MAX_MEASUREMENT_UNIT_LEN': 50
    }
}
