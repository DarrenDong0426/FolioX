from flask import Blueprint, jsonify
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

# Load .env
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Create a single pooled engine (not a new connection every request)
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,      # check if connection is alive
    pool_recycle=300,        # recycle every 5 min
    pool_size=3,
    max_overflow=5
)

documents_bp = Blueprint("documents", __name__, url_prefix="/api")

@documents_bp.route("/documents", methods=["GET"], strict_slashes=False)
def get_documents():
    try:
        sql = text("""
            SELECT id, title, description, last_updated, file_path
            FROM documents
            ORDER BY last_updated DESC;
        """)

        with engine.connect() as conn:
            result = conn.execute(sql)
            rows = result.fetchall()

        # Build JSON response
        documents = []
        for r in rows:
            documents.append({
                "id": r.id,
                "title": r.title,
                "desc": r.description,
                "month_year": r.last_updated.strftime("%B %Y") if r.last_updated else None,
                "file_path": r.file_path
            })

        return jsonify({"documents": documents}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
