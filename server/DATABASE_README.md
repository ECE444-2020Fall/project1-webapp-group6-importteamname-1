# Setting up our database 

Our database is a MYSQL DB hosted on an RDS instance. 
It should interact with our backend using SQLAlchemy as the db interface. SQLAlchemy is an ORM that allows us to treat our relational database like an object -- basically we query it using pythonic 'code-like' commands as opposed to creating SQL queries....

## DB related files:

### models.py :
this is where you specify tables in the database. Each table is it's own class extended from db.Model. In these classes you must specify all column attributes including attribute types, primary keys, etc. 

### config.py :
This contains a config object used when intializing our app. This specifies our db endpoint, login and configs for setting up the migrations folder.

### migrations/ :
This is how we track changes to our database. Everytime we want to change the schema of our db, we run a migration and update the db. 

### app/__init__.py:
During initialization we create an SQLAlchemy object and our migrations object. the SQLAlchemy object (db) is what we use in server.py to query and call the database. 

## Setup

Initialize database (I've already done this for us ):  `flask db init`   

Create a migration: `flask db migrate -m "message specifying what you changed"`

Update the database: `flask db upgrade`

*Note: making the migration will generate migration files in the migration folder specifying the new version of our database. However, this does not modify our real database. To actually 'push' the change, you must run the upgrade command. 


## Examples

I've created 3 endpoints in server.py to show how you can add/remove entries in a database. The examples use our User table; each example should be fairly straight forward. 



