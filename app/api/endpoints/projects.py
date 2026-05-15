from flask import Blueprint, jsonify, request
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
from api.endpoints.auth import require_admin

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=3,
    max_overflow=5
)

projects_bp = Blueprint("projects", __name__, url_prefix="/api")


# =========================
# GET /api/projects — public list
# =========================
@projects_bp.route("/projects", methods=["GET"], strict_slashes=False)
def get_projects():
    """
    Public endpoint. Supports pagination, search, sort, and filtering.
    Query params:
      page     — 1-indexed page number (default 1)
      query    — search string (matches name, case-insensitive)
      dropDown — sort order: "Most Recent" | "Least Recent" | "A-Z" | "Z-A"
      filters  — comma-separated, URL-encoded list of tags (matched against
                 language and type arrays)
    """

    page = max(int(request.args.get("page", 1)), 1)
    query_str = (request.args.get("query") or "").strip()
    dropdown = request.args.get("dropDown") or "Most Recent"
    filters_raw = request.args.get("filters") or ""
    filter_tags = [t for t in filters_raw.split(",") if t.strip()]
    

    # Map dropdown values to SQL ORDER BY clauses
    order_map = {
        "Most Recent": "month_year DESC",
        "Least Recent": "month_year ASC",
        "A-Z": "name ASC",
        "Z-A": "name DESC",
    }
    order_by = order_map.get(dropdown, "month_year DESC")

    # Build WHERE clause dynamically based on what's filtered
    where_clauses = []
    params = {}

    if query_str:
        where_clauses.append("name ILIKE :search")
        params["search"] = f"%{query_str}%"

    # For tag filtering: project matches if ANY of its language or type
    # values appear in the filter list. The JSON columns are arrays, so
    # we check overlap using Postgres's ?| operator (jsonb) or via a
    # cast-to-text LIKE fallback since the column type is JSON not JSONB.
    if filter_tags:
        # Build OR clauses: column::text ILIKE '%"tag"%' for each tag
        # Wrapping the tag in quotes ensures we match JSON string values exactly
        tag_clauses = []
        for i, tag in enumerate(filter_tags):
            key = f"tag_{i}"
            tag_clauses.append(f"(language::text ILIKE :{key} OR type::text ILIKE :{key})")
            params[key] = f'%"{tag}"%'
        where_clauses.append("(" + " OR ".join(tag_clauses) + ")")

    where_sql = " WHERE " + " AND ".join(where_clauses) if where_clauses else ""

    try:
        with engine.connect() as conn:
            # First: total count for pagination
            count_sql = text(f"SELECT COUNT(*) AS c FROM projects{where_sql}")
            total_items = conn.execute(count_sql, params).scalar() or 0
            if request.args.get("perPage") is None:
                page_size = total_items
            else: 
                page_size = int(request.args.get("perPage")) 

            # Then: the actual paginated rows
            offset = (page - 1) * page_size
            data_sql = text(f"""
                SELECT id, name, description, lock, wip, month_year, language, type
                FROM projects
                {where_sql}
                ORDER BY {order_by}
                LIMIT :limit OFFSET :offset
            """)
            rows = conn.execute(
                data_sql,
                {**params, "limit": page_size, "offset": offset}
            ).fetchall()

        projects = []
        for r in rows:
            projects.append({
                "id": r.id,
                "name": r.name,
                "desc": r.description,
                "lock": r.lock,
                "wip": r.wip,
                "month_year": r.month_year.strftime("%B %Y") if r.month_year else None,
                "month_year_raw": r.month_year.isoformat() if r.month_year else None,
                "language": r.language,
                "type": r.type,
            })

        return jsonify({"projects": projects, "totalItems": total_items}), 200

    except Exception as e:
        print(f"Get projects error: {e}")
        return jsonify({"error": str(e)}), 500

# =========================
# POST /api/admin/projects — create
# =========================
@projects_bp.route("/admin/projects", methods=["POST"], strict_slashes=False)
def create_project():
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}

    name = (data.get("name") or "").strip()
    desc = (data.get("desc") or "").strip()
    month_year = data.get("month_year")
    language = data.get("language") or []
    type_ = data.get("type") or []

    if not name or not month_year or not language or not type_:
        return jsonify({"error": "Missing required fields"}), 400

    lock = bool(data.get("lock", False))
    wip = bool(data.get("wip", False))

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    INSERT INTO projects (name, description, lock, wip, month_year, language, type)
                    VALUES (:name, :desc, :lock, :wip, :month_year, :language, :type)
                    RETURNING id
                """),
                {
                    "name": name,
                    "desc": desc,
                    "lock": lock,
                    "wip": wip,
                    "month_year": month_year,
                    "language": language,
                    "type": type_,
                }
            )
            new_id = result.scalar()

        return jsonify({"id": new_id, "status": "created"}), 201

    except Exception as e:
        print(f"Create project error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# PUT /api/admin/projects/<id> — update
# =========================
@projects_bp.route("/admin/projects/<int:project_id>", methods=["PUT"], strict_slashes=False)
def update_project(project_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}

    name = (data.get("name") or "").strip()
    desc = (data.get("desc") or "").strip()
    month_year = data.get("month_year")
    language = data.get("language") or []
    type_ = data.get("type") or []

    if not name or not month_year or not language or not type_:
        return jsonify({"error": "Missing required fields"}), 400

    lock = bool(data.get("lock", False))
    wip = bool(data.get("wip", False))

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    UPDATE projects
                    SET name = :name,
                        description = :desc,
                        lock = :lock,
                        wip = :wip,
                        month_year = :month_year,
                        language = :language,
                        type = :type
                    WHERE id = :id
                """),
                {
                    "id": project_id,
                    "name": name,
                    "desc": desc,
                    "lock": lock,
                    "wip": wip,
                    "month_year": month_year,
                    "language": language,
                    "type": type_,
                }
            )

            if result.rowcount == 0:
                return jsonify({"error": "Project not found"}), 404

        return jsonify({"status": "updated"}), 200

    except Exception as e:
        print(f"Update project error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# DELETE /api/admin/projects/<id>
# =========================
@projects_bp.route("/admin/projects/<int:project_id>", methods=["DELETE"], strict_slashes=False)
def delete_project(project_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("DELETE FROM projects WHERE id = :id"),
                {"id": project_id}
            )

            if result.rowcount == 0:
                return jsonify({"error": "Project not found"}), 404

        return jsonify({"status": "deleted"}), 200

    except Exception as e:
        print(f"Delete project error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# DELETE /api/admin/projects/tags — strip tag from all projects
# =========================
@projects_bp.route("/admin/projects/tags", methods=["DELETE"], strict_slashes=False)
def delete_tag():
    """
    Removes a tag from every project's language or type array.
    Body: { "field": "language" | "type", "tag": "Pyhton" }
    """
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}
    field = data.get("field")
    tag = data.get("tag")

    if field not in ("language", "type"):
        return jsonify({"error": "Invalid field"}), 400
    if not tag:
        return jsonify({"error": "Missing tag"}), 400

    column = "language" if field == "language" else "type"

    try:
        with engine.begin() as conn:
            rows = conn.execute(
                text(f"SELECT id, {column} FROM projects")
            ).fetchall()

            count = 0
            for row in rows:
                arr = row[1] or []
                if tag in arr:
                    new_arr = [t for t in arr if t != tag]
                    conn.execute(
                        text(f"UPDATE projects SET {column} = :new WHERE id = :id"),
                        {"new": new_arr, "id": row.id}
                    )
                    count += 1

        return jsonify({"status": "deleted", "affected": count}), 200

    except Exception as e:
        print(f"Delete tag error: {e}")
        return jsonify({"error": str(e)}), 500