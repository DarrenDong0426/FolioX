# Imports
from flask import Blueprint, jsonify, request                                 # Import flask functions and classes from flask library
from sqlalchemy import desc, or_, asc                                         # Import ascneding, descending func and or operatior from sqlalchemy
from ..models import Projects                                                 # Import Projects database scheme from ..models

# Create Blueprint objects
documents_bp = Blueprint('documents', __name__, url_prefix="/api")              # Create a blueprint of routes for projects 
