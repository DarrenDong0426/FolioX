# Imports
from flask_sqlalchemy import SQLAlchemy                                                 # Imports SQLAlchemy for site database

# Initialize a database for list of projects 
projects_db = SQLAlchemy()

# Projects class define scheme for projects_db
class Projects(projects_db.Model):       
    id = projects_db.Column(projects_db.Integer, primary_key=True)                      # Unique Project ID
    name = projects_db.Column(projects_db.String(20), unique=True, nullable=False)      # Name of each Project (max 20 chars)
    desc = projects_db.Column(projects_db.String(500))                                  # Desc of each Project (max 500 chars)
    lock = projects_db.Column(projects_db.Boolean, default=False)                       # Lock label for each project to indicate private projects (default not locked)
    wip = projects_db.Column(projects_db.Boolean, default=False)                        # WIP label for each project to indicate incomplete project (default not WIP)
    month_year = projects_db.Column(projects_db.Date, nullable=False)                   # Date (month, year) of project date
    language = projects_db.Column(projects_db.JSON, nullable=False)                     # Stores an array of languages used 
    type = projects_db.Column(projects_db.JSON, nullable=False)                         # Type of projects
