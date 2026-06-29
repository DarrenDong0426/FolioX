from flask import Blueprint, jsonify, request
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
from api.endpoints.auth import require_admin
import json

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
# Helpers — mirror project metadata into events table
# =========================
def _upsert_mirror_event(conn, project_id, name, desc, month_year):
    """
    Ensures there is an event row mirroring this project's metadata.
    Idempotent — call on create OR update.
    Event uses single date (start == end == month_year) and "Projects" tag.
    Clicking the event redirects to the project page (handled in EventDetail.jsx).
    """
    existing = conn.execute(
        text("SELECT id FROM events WHERE project_id = :pid"),
        {"pid": project_id}
    ).fetchone()

    if existing:
        # Update the existing mirror event
        conn.execute(
            text("""
                UPDATE events
                SET title = :title,
                    description = :desc,
                    start = :start,
                    "end" = :end,
                    tags = :tags
                WHERE project_id = :pid
            """),
            {
                "pid": project_id,
                "title": name,
                "desc": desc,
                "start": month_year,
                "end": month_year,
                "tags": "Projects",
            }
        )
    else:
        # Create a new mirror event
        conn.execute(
            text("""
                INSERT INTO events (title, description, tags, start, "end", images, content_blocks, project_id)
                VALUES (:title, :desc, :tags, :start, :end, :images, :content_blocks, :pid)
            """),
            {
                "title": name,
                "desc": desc,
                "tags": "Projects",
                "start": month_year,
                "end": month_year,
                "images": [],
                "content_blocks": json.dumps([]),
                "pid": project_id,
            }
        )


def _delete_mirror_event(conn, project_id):
    """Removes the linked event when a project is deleted."""
    conn.execute(
        text("DELETE FROM events WHERE project_id = :pid"),
        {"pid": project_id}
    )


# =========================
# GET /api/projects/<id> — public detail
# =========================
@projects_bp.route("/projects/<int:project_id>", methods=["GET"], strict_slashes=False)
def get_project(project_id):
    try:
        with engine.connect() as conn:
            row = conn.execute(
                text("""
                    SELECT id, name, description, lock, wip, month_year, language, type, content_blocks, featured
                    FROM projects
                    WHERE id = :id
                """), 
                {"id": project_id}
            ).fetchone()

        if not row:
            return jsonify({"error": "Project not found"}), 404

        return jsonify({
            "id": row.id,
            "name": row.name,
            "desc": row.description,
            "lock": row.lock,
            "wip": row.wip,
            "month_year": row.month_year.strftime("%B %Y") if row.month_year else None,
            "month_year_raw": row.month_year.isoformat() if row.month_year else None,
            "language": row.language,
            "type": row.type,
            "content_blocks": row.content_blocks or [],
            "featured": row.featured,
        }), 200

    except Exception as e:
        print(f"Get project error: {e}")
        return jsonify({"error": str(e)}), 500
    
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

    if filter_tags:
        tag_clauses = []
        for i, tag in enumerate(filter_tags):
            key = f"tag_{i}"
            tag_clauses.append(f"(:{key} = ANY(language) OR :{key} = ANY(type))")
            params[key] = tag
        where_clauses.append("(" + " OR ".join(tag_clauses) + ")")

    where_sql = " WHERE " + " AND ".join(where_clauses) if where_clauses else ""

    try:
        with engine.connect() as conn:
            count_sql = text(f"SELECT COUNT(*) AS c FROM projects{where_sql}")
            total_items = conn.execute(count_sql, params).scalar() or 0
            if request.args.get("perPage") is None:
                page_size = total_items
            else: 
                page_size = int(request.args.get("perPage")) 

            offset = (page - 1) * page_size
            data_sql = text(f"""
                SELECT id, name, description, lock, wip, month_year, language, type, content_blocks, featured
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
                "content_blocks": r.content_blocks or [],
                "featured": r.featured,
            })

        return jsonify({"projects": projects, "totalItems": total_items}), 200

    except Exception as e:
        print(f"Get projects error: {e}")
        return jsonify({"error": str(e)}), 500

# =========================
# POST /api/admin/projects — create
# Also creates a mirrored event so the project shows up on the timeline.
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
    featured = bool(data.get("featured", False))

    if not name or not month_year or not language or not type_:
        return jsonify({"error": "Missing required fields"}), 400

    lock = bool(data.get("lock", False))
    wip = bool(data.get("wip", False))
    content_blocks = data.get("content_blocks") or []

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    INSERT INTO projects (name, description, lock, wip, month_year, language, type, content_blocks, featured)
                    VALUES (:name, :desc, :lock, :wip, :month_year, :language, :type, :content_blocks, :featured)
                    RETURNING id
                """),
                {
                    "name": name, "desc": desc, "lock": lock, "wip": wip,
                    "month_year": month_year, "language": language, "type": type_,
                    "content_blocks": json.dumps(content_blocks),
                    "featured": featured,
                }
            )
            new_id = result.scalar()

            # Auto-create mirror event so this shows up on the timeline.
            # Clicking the event redirects to the project page (EventDetail.jsx).
            _upsert_mirror_event(conn, new_id, name, desc, month_year)

        return jsonify({"id": new_id, "status": "created"}), 201

    except Exception as e:
        print(f"Create project error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# PUT /api/admin/projects/<id> — update
# Also updates the mirrored event to keep title/desc/date in sync.
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
    featured = bool(data.get("featured", False))

    if not name or not month_year or not language or not type_:
        return jsonify({"error": "Missing required fields"}), 400

    lock = bool(data.get("lock", False))
    wip = bool(data.get("wip", False))
    content_blocks = data.get("content_blocks") or []

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
                        type = :type,
                        content_blocks = :content_blocks,
                        featured = :featured
                    WHERE id = :id
                """),
                {
                    "id": project_id, "name": name, "desc": desc, "lock": lock, "wip": wip,
                    "month_year": month_year, "language": language, "type": type_,
                    "content_blocks": json.dumps(content_blocks),
                    "featured": featured,
                }
            )

            if result.rowcount == 0:
                return jsonify({"error": "Project not found"}), 404

            # Keep the mirrored event in sync. Upsert handles the case where
            # a project was created before this hook existed and has no event yet.
            _upsert_mirror_event(conn, project_id, name, desc, month_year)

        return jsonify({"status": "updated"}), 200

    except Exception as e:
        print(f"Update project error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# DELETE /api/admin/projects/<id>
# Also deletes the linked event so it doesn't lead to a dead redirect.
# =========================
@projects_bp.route("/admin/projects/<int:project_id>", methods=["DELETE"], strict_slashes=False)
def delete_project(project_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    try:
        with engine.begin() as conn:
            # Delete the mirrored event first so there is no orphan referring
            # to a project that no longer exists.
            _delete_mirror_event(conn, project_id)

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
    
@projects_bp.route("/projects/featured", methods=["GET"], strict_slashes=False)
def get_featured_projects():
    try:
        sql = text("""
            SELECT id, name, description, lock, wip, month_year, language, type, content_blocks
            FROM projects
            WHERE featured = TRUE
            ORDER BY month_year DESC
        """)

        with engine.connect() as conn:
            rows = conn.execute(sql).fetchall()

        projects = []
        for r in rows:
            projects.append({
                "id": r.id,
                "name": r.name,
                "desc": r.description,
                "lock": r.lock,
                "wip": r.wip,
                "month_year": r.month_year.strftime("%B %Y") if r.month_year else None,
                "language": r.language,
                "type": r.type,
                "content_blocks": r.content_blocks or [],
            })

        return jsonify({"projects": projects}), 200

    except Exception as e:
        print(f"Get featured projects error: {e}")
        return jsonify({"error": str(e)}), 500