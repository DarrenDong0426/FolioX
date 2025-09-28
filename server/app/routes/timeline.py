# Imports
from flask import Blueprint, jsonify, request                                 # Import flask functions and classes from flask library
from ..models import Events                                                 # Import Projects database scheme from ..models
from sqlalchemy import extract
from datetime import datetime

# Create Blueprint objects
timeline_bp = Blueprint('timeline', __name__, url_prefix="/api")              # Create a blueprint of routes for documents 

# Define a route on the blueprint
@timeline_bp.route("/events", methods=["GET"], strict_slashes=False)        # Create GET request for /documents with queries 
def get_events():
    year = request.args.get("year", datetime.now().year, type=int)          # Get year form query. Default to current year

    # Query rows of events table from the filtered entries ordered by least recent on top. 
    events = Events.query.filter(extract('year', Events.date)==year).order_by(Events.date.asc()).all()                 

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
