from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from utils.inventory_manager import InventoryManager

# ~ Databases ~ #
db = SQLAlchemy()   #<-Initialize database object
migrate = Migrate() #<-Initialize migration object
inventory_manager = InventoryManager(db)

def create_app():
    """Construct core application"""
    application = Flask(__name__)

    # Pull from config file
    application.config.from_object('config.Config')

    # Initailize database
    db.init_app(application)          #<- This will get called in our models.py file
    migrate.init_app(application, db) #<- Migration directory

    return application

app = create_app()
# ~ Import database schemas ~ # 
from app import models
