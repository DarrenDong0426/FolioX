import os
from flask import Blueprint, jsonify, request
from sqlalchemy import create_engine, text
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

changelog_bp = Blueprint("changelog", __name__, url_prefix="/api")


# =========================
# GET /api/changelog — public list
# =========================
@changelog_bp.route("/changelog", methods=["GET"], strict_slashes=False)
def get_changelog():
    try:
        sql = text("""
            SELECT id, version, description, sort_order
            FROM changelog
            ORDER BY sort_order ASC, id ASC;
        """)

        with engine.connect() as conn:
            rows = conn.execute(sql).fetchall()

        entries = [{
            "id": r.id,
            "version": r.version,
            "description": r.description,
            "sort_order": r.sort_order,
        } for r in rows]

        return jsonify({"changelog": entries}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# POST /api/admin/changelog
# =========================
@changelog_bp.route("/admin/changelog", methods=["POST"], strict_slashes=False)
def create_changelog():
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}
    version = (data.get("version") or "").strip()
    description = (data.get("description") or "").strip()
    sort_order = data.get("sort_order")

    if not version or not description:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with engine.begin() as conn:
            # If no sort_order given, append at the end
            if sort_order is None:
                max_sort = conn.execute(text("SELECT COALESCE(MAX(sort_order), 0) FROM changelog")).scalar()
                sort_order = max_sort + 10

            result = conn.execute(
                text("""
                    INSERT INTO changelog (version, description, sort_order)
                    VALUES (:version, :description, :sort_order)
                    RETURNING id
                """),
                {"version": version, "description": description, "sort_order": sort_order}
            )
            new_id = result.scalar()

        return jsonify({"id": new_id, "status": "created"}), 201

    except Exception as e:
        print(f"Create changelog error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# PUT /api/admin/changelog/<id>
# =========================
@changelog_bp.route("/admin/changelog/<int:entry_id>", methods=["PUT"], strict_slashes=False)
def update_changelog(entry_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}
    version = (data.get("version") or "").strip()
    description = (data.get("description") or "").strip()
    sort_order = data.get("sort_order")

    if not version or not description or sort_order is None:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    UPDATE changelog
                    SET version = :version,
                        description = :description,
                        sort_order = :sort_order
                    WHERE id = :id
                """),
                {"id": entry_id, "version": version, "description": description, "sort_order": sort_order}
            )

            if result.rowcount == 0:
                return jsonify({"error": "Entry not found"}), 404

        return jsonify({"status": "updated"}), 200

    except Exception as e:
        print(f"Update changelog error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# DELETE /api/admin/changelog/<id>
# =========================
@changelog_bp.route("/admin/changelog/<int:entry_id>", methods=["DELETE"], strict_slashes=False)
def delete_changelog(entry_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("DELETE FROM changelog WHERE id = :id"),
                {"id": entry_id}
            )

            if result.rowcount == 0:
                return jsonify({"error": "Entry not found"}), 404

        return jsonify({"status": "deleted"}), 200

    except Exception as e:
        print(f"Delete changelog error: {e}")
        return jsonify({"error": str(e)}), 500