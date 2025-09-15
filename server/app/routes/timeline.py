# Imports
from flask import Blueprint, jsonify, request                                 # Import flask functions and classes from flask library
from ..models import Events                                                 # Import Projects database scheme from ..models

# Create Blueprint objects
timeline_bp = Blueprint('timeline', __name__, url_prefix="/api")              # Create a blueprint of routes for documents 

# Define a route on the blueprint
@timeline_bp.route("/timeline", methods=["GET"], strict_slashes=False)        # Create GET request for /documents with queries 
def get_events():
    events = Events.query

    return jsonify({  
        "events": [           
          {
            "id": e.id,                                             # Get id of project
            "title": e.title,                                       # Get name of project
            "desc": e.desc,                                         # Get desc of project
            "date": e.date.strftime("%B %Y"),                       # Get date (month year) of project
            "tags": e.tags, 
            "images": e.images  
          } for e in events                                     # Iterate through each project 
        ]})                               # Total number of items (used to see how many pages to list)
