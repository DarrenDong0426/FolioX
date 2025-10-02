# Imports
from flask import Blueprint, jsonify, request                                 # Import flask functions and classes from flask library
from ..models import Events                                                 # Import Projects database scheme from ..models
from sqlalchemy import extract, or_, and_                                        # Import extract func and or operatior from sqlalchemy
from datetime import datetime

# Create Blueprint objects
timeline_bp = Blueprint('timeline', __name__, url_prefix="/api")              # Create a blueprint of routes for documents 

# Define a route on the blueprint
@timeline_bp.route("/events", methods=["GET"], strict_slashes=False)        # Create GET request for /documents with queries 
def get_events():
    year = request.args.get("year", datetime.now().year, type=int)          # Get year form query. Default to current year
    filters = request.args.get("filters", "", type=str).strip().split(",")    # Get a list of filters if exist or a set of empty string if not

    if filters != [""]:   # If filters provided
        tag_conditions = [Events.tags == f for f in filters]   # Direct equality
        filter_condition = or_(*tag_conditions)                # OR together
    else:
        filter_condition = True                                # No filtering if empty


    # Query rows of events table from the filtered entries ordered by least recent on top. 
    events = (
        Events.query
        .filter(
            and_(
                Events.start <= f"{year}-12-31",                # event starts before end of year
                Events.end >= f"{year}-01-01"                   # event ends after start of year
            )
        )
        .filter(filter_condition)
        .order_by(Events.start.asc())
        .all()
    )

    return jsonify({  
        "events": [           
          {
            "id": e.id,                                             # Get id of project
            "title": e.title,                                       # Get name of project
            "desc": e.desc,                                         # Get desc of project
            "start": e.start.strftime("%B %Y"),                       # Get date (month year) of project
            "end": e.end.strftime("%B %Y"),                       # Get date (month year) of project
            "tags": e.tags, 
            "images": e.images  
          } for e in events                                     # Iterate through each project 
        ]})                               # Total number of items (used to see how many pages to list)
