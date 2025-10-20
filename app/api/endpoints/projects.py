import os
from flask import Blueprint, jsonify, request
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv

# Load .env variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Create SQLAlchemy engine with reconnect options
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=5,
    max_overflow=2
)

projects_bp = Blueprint('projects', __name__, url_prefix="/api")

@projects_bp.route("/projects", methods=["GET"], strict_slashes=False)
def get_projects():
    page = request.args.get("page", 1, type=int)
    limit = 5
    offset = (page - 1) * limit

    filters = request.args.get("filters", "", type=str).strip().split(",")
    filters = [f for f in filters if f]

    dropDown = request.args.get("dropDown", "Most Recent", type=str)
    order_clause = "month_year DESC"
    if dropDown == "Least Recent":
        order_clause = "month_year ASC"
    elif dropDown == "A-Z":
        order_clause = "name ASC"
    elif dropDown == "Z-A":
        order_clause = "name DESC"

    query = request.args.get("query", "", type=str).strip()

    sql_base = """
        SELECT id, name, description, lock, wip, month_year, language, type
        FROM projects
    """

    where_clauses = []
    params = {"limit": limit, "offset": offset}

    # Text search
    if query:
        where_clauses.append("(name ILIKE :query OR description ILIKE :query)")
        params["query"] = f"%{query}%"

    # Handle filters for text[] columns properly
    if filters:
        tag_conditions = []
        for i, f in enumerate(filters):
            key = f"filter_{i}"
            # works for both text and text[]
            tag_conditions.append(f"(:{key} = ANY(language) OR :{key} = ANY(type))")
            params[key] = f
        where_clauses.append("(" + " OR ".join(tag_conditions) + ")")

    if where_clauses:
        sql_base += " WHERE " + " AND ".join(where_clauses)

    sql_base += f" ORDER BY {order_clause} LIMIT :limit OFFSET :offset"
    sql = text(sql_base)

    try:
        with engine.connect() as conn:
            result = conn.execute(sql, params)
            projects = [dict(r._mapping) for r in result]

            count_sql = "SELECT COUNT(*) FROM projects"
            if where_clauses:
                count_sql += " WHERE " + " AND ".join(where_clauses)
            count_result = conn.execute(text(count_sql), params)
            total_items = count_result.scalar() or 0

        return jsonify({
            "projects": projects,
            "totalItems": total_items
        })

    except OperationalError:
        engine.dispose()
        return jsonify({"error": "Database connection lost, please retry"}), 500
