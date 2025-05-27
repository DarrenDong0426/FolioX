from flask import Blueprint, jsonify
from ..models import Projects

# Create a Blueprint object
projects_bp = Blueprint('projects', __name__)

# Define a route on the blueprint
@projects_bp.route("/projects", methods=["GET"])
def get_projects():
    projects = Projects.query.all()
    for project in projects:
        print(project.name, project.desc)
    return jsonify({"projects": ["proj1", "proj2"]})
