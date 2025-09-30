# Imports
from flask_sqlalchemy import SQLAlchemy                                                 # Imports SQLAlchemy for site database

# Initialize a database for list of projects 
db = SQLAlchemy()

# Projects class define scheme for project db
class Projects(db.Model):       
    id = db.Column(db.Integer, primary_key=True)                      # Unique Project ID
    name = db.Column(db.String(20), unique=True, nullable=False)      # Name of each Project (max 20 chars)
    desc = db.Column(db.String(500))                                  # Desc of each Project (max 500 chars)
    lock = db.Column(db.Boolean, default=False)                       # Lock label for each project to indicate private projects (default not locked)
    wip = db.Column(db.Boolean, default=False)                        # WIP label for each project to indicate incomplete project (default not WIP)
    month_year = db.Column(db.Date, nullable=False)                   # Date (month, year) of project date
    language = db.Column(db.JSON, nullable=False)                     # Stores an array of languages used 
    type = db.Column(db.JSON, nullable=False)                         # Type of projects

# Documents class define schema for documents db
class Documents(db.Model):          
    id = db.Column(db.Integer, primary_key = True)                    # Unique Document ID
    title = db.Column(db.String(20), unique=True, nullable=False)     # Title of each document (max 20 chars)
    desc = db.Column(db.String(500))                                  # Desc of each document (max 500 chars)
    last_updated = db.Column(db.Date, nullable=False)                 # Last Updated (month, year) of when document is last updated
    file_path = db.Column(db.String(500), nullable=False)             # File path for path of documents

class Events(db.Model):          
    id = db.Column(db.Integer, primary_key = True)                    # Unique Document ID
    title = db.Column(db.String(20), unique=True, nullable=False)     # Title of each document (max 20 chars)
    desc = db.Column(db.String(500))                                  # Desc of each document (max 500 chars)
    tags = db.Column(db.JSON, nullable=False)                         # Tags for Filtering
    start = db.Column(db.Date, nullable=False)                         # Date (month, year) of event
    end = db.Column(db.Date, nullable=False)                         # Date (month, year) of event
    images = db.Column(db.JSON, nullable=False)                       # Images of events
    
