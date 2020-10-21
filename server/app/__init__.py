from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# ~ Databases ~ #
db = SQLAlchemy()   #<-Initialize database object
migrate = Migrate() #<-Initialize migration object

def create_app():
    """Construct core application"""
    application = Flask(__name__)

    # Pull from config file
    application.config.from_object('config.Config')

    # Initailize database
    db.init_app(application)          #<- This will get called in our models.py file
    migrate.init_app(application, db) #<- Migration directory

    return(application)

# ~ Import database schemas ~ # 
from app import models
