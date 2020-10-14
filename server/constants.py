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
    }
}
