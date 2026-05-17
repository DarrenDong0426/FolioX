from flask import Flask
from api.endpoints.projects import projects_bp
from api.endpoints.documents import documents_bp
from api.endpoints.timeline import timeline_bp
from api.endpoints.email import email_bp
from api.endpoints.auth import auth_bp
from api.endpoints.changelog import changelog_bp
from api.endpoints.faqs import faqs_bp
from api.endpoints.content import content_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(projects_bp, url_prefix="/api")
app.register_blueprint(documents_bp, url_prefix="/api")
app.register_blueprint(timeline_bp, url_prefix="/api")
app.register_blueprint(email_bp, url_prefix="/api")
app.register_blueprint(auth_bp) 
app.register_blueprint(changelog_bp)
app.register_blueprint(faqs_bp)
app.register_blueprint(content_bp)

@app.route("/api/")
def root():
    return {"message": "Flask API root"}
