# Imports
from flask import Blueprint, jsonify, request                                 # Import flask functions and classes from flask library
from sqlalchemy import desc, or_, asc                                         # Import ascneding, descending func and or operatior from sqlalchemy
from ..models import Documents                                                 # Import Projects database scheme from ..models

# Create Blueprint objects
documents_bp = Blueprint('documents', __name__, url_prefix="/api")              # Create a blueprint of routes for documents 

# Define a route on the blueprint
@documents_bp.route("/documents", methods=["GET"], strict_slashes=False)        # Create GET request for /documents with queries 
def get_documents():
    documents = Documents.query

    return jsonify({  
        "documents": [           
          {
            "id": d.id,                                           # Get id of project
            "title": d.title,                                       # Get name of project
            "desc": d.desc,                                       # Get desc of project
            "month_year": d.last_updated.strftime("%B %Y"),         # Get date (month year) of project
          } for d in documents                                     # Iterate through each project 
        ]})                               # Total number of items (used to see how many pages to list)