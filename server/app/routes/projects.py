# Imports
from flask import Blueprint, jsonify, request                                 # Import flask functions and classes from flask library
from sqlalchemy import desc, or_, asc                                         # Import ascneding, descending func and or operatior from sqlalchemy
from ..models import Projects                                                 # Import Projects database scheme from ..models

# Create Blueprint objects
projects_bp = Blueprint('projects', __name__, url_prefix="/api")              # Create a blueprint of routes for projects 

# Define a route on the blueprint
@projects_bp.route("/projects", methods=["GET"], strict_slashes=False)        # Create GET request for /projects with queries 
def get_projects():
    page = request.args.get("page", 1, type=int)                              # Get page from query if exist or set to 1 if not
    query = request.args.get("query", "", type=str).strip().split()           # Get query from query if exist or set to empty str if not
    dropdown = request.args.get("dropDown", "Most Recent", type=str)          # Get dropdown setting if exist or set to "Most Recent" if not

    filters = request.args.get("filters", "", type=str).strip().split(",") 

    words = []                                                                # Get list of words from description  
    for word in query:  
        words.append(Projects.name.ilike(f"%{word}%"))                        # Add rows of projects where the name contains a word from query
        words.append(Projects.desc.ilike(f"%{word}%"))                        # Add rows of projects where the desc contains a word from query
    
    if filters != ['']:
        language_conditions = []
        type_conditions = []
        for f in filters:
            language_conditions.extend([
                Projects.language == f'["{f}"]',
                Projects.language.like(f'["{f}",%'),
                Projects.language.like(f'%, "{f}"]'),
                Projects.language.like(f'%, "{f}",%')
            ])
            type_conditions.append(Projects.type.like(f'%"{f}"%'))
        filter_condition = or_(*language_conditions, *type_conditions)
    else:
        filter_condition = True


    if (dropdown == "Least Recent"):
      pagination = Projects.query.filter(or_(*words)).filter(filter_condition).order_by(                 # Query rows of projects table from the filtered entries ordered by least recent on top. Paginate in groups of 5
            asc(Projects.month_year)
          ).paginate(page=page, per_page=5, error_out=False)      
    elif (dropdown == "A-Z"):
      pagination = Projects.query.filter(or_(*words)).filter(filter_condition).order_by(                 # Query rows of projects table from the filtered entries ordered by ascending alphabet. Paginate in groups of 5
          asc(Projects.name)
        ).paginate(page=page, per_page=5, error_out=False)  
    elif (dropdown == "Z-A"):
      pagination = Projects.query.filter(or_(*words)).filter(filter_condition).order_by(                 # Query rows of projects table from the filtered entries ordered by descending alphabet. Paginate in groups of 5
          desc(Projects.name)
        ).paginate(page=page, per_page=5, error_out=False)
    else:
      pagination = Projects.query.filter(or_(*words)).filter(filter_condition).order_by(                 # Query rows of projects table from the filtered entries ordered by most recent on top. Paginate in groups of 5
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