from flask import Blueprint, jsonify
from sqlalchemy import text
from ..models import Projects

# Create a Blueprint object
projects_bp = Blueprint('projects', __name__)

# Define a route on the blueprint
@projects_bp.route("/projects", methods=["GET"])
def get_projects():
    projects = Projects.query.all()                             # Get all items from all instances of Projects class
    return jsonify({"projects": [           
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
    ]})
