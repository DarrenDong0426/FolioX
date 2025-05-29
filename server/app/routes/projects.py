# Imports
from flask import Blueprint, jsonify, request                                 # Import flask functions and classes from flask library
from sqlalchemy import desc                                                   # Import descending function from sqlalchemy
from ..models import Projects                                                 # Import Projects database scheme from ..models

# Create Blueprint objects
projects_bp = Blueprint('projects', __name__, url_prefix="/api")              # Create a blueprint of routes for projects 

# Define a route on the blueprint
@projects_bp.route("/projects", methods=["GET"], strict_slashes=False)        # Create GET request for /projects with queries 
def get_projects():
    page = request.args.get("page", 1, type=int)                              # Get page from query if exist or set to 1 if not

    pagination = Projects.query.order_by(                                     # Query rows of projects table ordered by most recent on top. Paginate in groups of 5
          desc(Projects.month_year)
        ).paginate(page=page, per_page=5, error_out=False)        

    projects = pagination.items                                               # Get rows from values from query result
    total_items = pagination.total                                            # Get the total number of rows from database

    return jsonify({  
        "projects": [           
          {
            "id": p.id,                                           # Get id of project
            "name": p.name,                                       # Get name of project
            "desc": p.desc,                                       # Get desc of project
            "lock": p.lock,                                       # Get lock of project
            "wip": p.wip,                                         # Get wip of project 
            "month_year": p.month_year.strftime("%B %Y"),         # Get date (month year) of project
            "language": p.language,                               # Get langauge of project
            "type": p.type                                        # Get type of project
          } for p in projects                                     # Iterate through each project 
        ],
        "totalItems": total_items})                               # Total number of items (used to see how many pages to list)