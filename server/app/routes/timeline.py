# Imports
from flask import Blueprint, jsonify, request                                 # Import flask functions and classes from flask library
from ..models import Events                                                 # Import Projects database scheme from ..models
from sqlalchemy import extract, or_                                         # Import extract func and or operatior from sqlalchemy
from datetime import datetime

# Create Blueprint objects
timeline_bp = Blueprint('timeline', __name__, url_prefix="/api")              # Create a blueprint of routes for documents 

# Define a route on the blueprint
@timeline_bp.route("/events", methods=["GET"], strict_slashes=False)        # Create GET request for /documents with queries 
def get_events():
    year = request.args.get("year", datetime.now().year, type=int)          # Get year form query. Default to current year
    filters = request.args.get("filters", "", type=str).strip().split(",")    # Get a list of filters if exist or a set of empty string if not

    if filters != ['']:                                                       # If filters is not an a set of empty string
        tag_conditions = []                                              # Array to store projects that matches language criteria
        tag_conditions = []                                                  # Array to store project that matches type critieria
        for f in filters:                                                     # Iterate through each filter value
            tag_conditions.extend([                                      # Add to language array if any of the following match
                Events.tags == f'["{f}"]',                              # Language is stored as a JSON in database (a string s = '[item1, item2, ...]')
                Events.tags.like(f'["{f}",%'),                          # Parses language JSON based on singular item ([] on both side), first item ([item, ]), last item ([, item]), or middle item ([, item])
                Events.tags.like(f'%, "{f}"]'),
                Events.tags.like(f'%, "{f}",%')
            ])       
        filter_condition = or_(*tag_conditions, *tag_conditions)        # Take the or of both types so projects in either array are accepted
    else:
        filter_condition = True                                               # If filter is empty, return true so all projects are accepted


    # Query rows of events table from the filtered entries ordered by least recent on top. 
    events = Events.query.filter(extract('year', Events.date)==year).filter(filter_condition).order_by(Events.date.asc()).all()                 

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
