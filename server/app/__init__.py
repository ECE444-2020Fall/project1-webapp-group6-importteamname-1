from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# ~ Databases ~ #
db = SQLAlchemy()   #<-Initialize database object
migrate = Migrate() #<-Initialize migration object

def create_app():
    """Construct core application"""
    application = Flask(__name__)
    bp = Blueprint('main', __name__)
    application.register_blueprint(bp)

    # Pull from config file
    application.config.from_object('config.Config')

    # Initailize database
    db.init_app(application)          #<- This will get called in our models.py file
    migrate.init_app(application, db) #<- Migration directory

    return application

app = create_app()

# ~ Import database schemas ~ # 
from app import models
