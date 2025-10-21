from flask import Flask
from api.endpoints.projects import projects_bp
from api.endpoints.documents import documents_bp
from api.endpoints.timeline import timeline_bp
from api.endpoints.auth import email_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(projects_bp, url_prefix="/api")
app.register_blueprint(documents_bp, url_prefix="/api")
app.register_blueprint(timeline_bp, url_prefix="/api")
app.register_blueprint(email_bp, url_prefix="/api")

@app.route("/api/")
def root():
    return {"message": "Flask API root"}
