import os
from flask import Blueprint, jsonify, request
from sqlalchemy import create_engine, text
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Create pooled connection to Supabase Postgres
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,   # test connection before use
    pool_recycle=300,     # recycle connections every 5 mins
    pool_size=3,
    max_overflow=5
)

timeline_bp = Blueprint("timeline", __name__, url_prefix="/api")

@timeline_bp.route("/events", methods=["GET"], strict_slashes=False)
def get_events():
    year = request.args.get("year", datetime.now().year, type=int)
    filters = request.args.get("filters", "", type=str).strip().split(",")

    params = {
        "start_date": f"{year}-01-01",
        "end_date": f"{year}-12-31"
    }

    # Base date condition
    where_clauses = [
        '(start <= :end_date AND "end" >= :start_date)'
    ]

    # Handle filters (tags stored as TEXT)
    if filters != [""]:
        tag_clauses = []
        for i, f in enumerate(filters):
            tag_clauses.append(f"tags ILIKE :tag{i}")
            params[f"tag{i}"] = f"%{f}%"
        where_clauses.append("(" + " OR ".join(tag_clauses) + ")")

    where_sql = "WHERE " + " AND ".join(where_clauses)

    sql = text(f"""
        SELECT id, title, description AS desc, start, "end", tags, images
        FROM events
        {where_sql}
        ORDER BY start ASC;
    """)

    try:
        with engine.connect() as conn:
            result = conn.execute(sql, params)
            events = [dict(r._mapping) for r in result]

        # Format date fields
        for e in events:
            if hasattr(e["start"], "strftime"):
                e["start"] = e["start"].strftime("%B %Y")
            if hasattr(e["end"], "strftime"):
                e["end"] = e["end"].strftime("%B %Y")

        return jsonify({"events": events}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
