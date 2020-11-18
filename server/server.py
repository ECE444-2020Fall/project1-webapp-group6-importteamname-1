from flask import Flask, jsonify, make_response, send_from_directory
from os.path import exists, join
from flask_cors import CORS
from constants import CONSTANTS
from app import app, db
from app.routes.get_routes import * 
from app.routes.delete_routes import * 
from app.routes.post_routes import * 

CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = "TESTKEY"

# Catching all routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    file_to_serve = path if path and exists(join(app.static_folder, path)) else 'index.html'
    return send_from_directory(app.static_folder, file_to_serve)

# Error Handler
@app.errorhandler(404)
def page_not_found(error):
    json_response = jsonify({'error': 'Page not found'})
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])

if __name__ == '__main__':
    app.run(port=CONSTANTS['PORT'])
    db.create_all()
