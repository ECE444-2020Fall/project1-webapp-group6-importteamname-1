import os
from constants import CONSTANTS

# Absolute directory path
basedir = os.path.abspath(os.path.dirname(__file__))

# ~ Create config object ~ #
class Config(object):
    # ~~ Migration Repository ~~ #
    SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repo')
    SQLALCHEMY_DATABASE_URI = CONSTANTS['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False,
    JSONIFY_PRETTYPRINT_REGULAR = True

