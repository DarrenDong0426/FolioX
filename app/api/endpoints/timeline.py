import os
import uuid
import requests
from flask import Blueprint, jsonify, request
from sqlalchemy import create_engine, text
from datetime import datetime
from dotenv import load_dotenv
import urllib.parse
from api.endpoints.auth import require_admin
import re

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
BUCKET_NAME = "Events"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=3,
    max_overflow=5
)

timeline_bp = Blueprint("timeline", __name__, url_prefix="/api")


# =========================
# GET /api/events — public list (year-filtered for timeline)
# =========================
@timeline_bp.route("/events", methods=["GET"], strict_slashes=False)
def get_events():
    year = request.args.get("year", type=int)
    filters_raw = request.args.get("filters", "", type=str).strip()
    filter_tags = [f for f in filters_raw.split(",") if f]
    all_mode = request.args.get("all") == "true"  # admin list view passes ?all=true

    params = {}
    where_clauses = []

    if not all_mode and year is not None:
        params["start_date"] = f"{year}-01-01"
        params["end_date"] = f"{year}-12-31"
        where_clauses.append('(start <= :end_date AND "end" >= :start_date)')

    if filter_tags:
        tag_clauses = []
        for i, f in enumerate(filter_tags):
            tag_clauses.append(f"tags ILIKE :tag{i}")
            params[f"tag{i}"] = f"%{f}%"
        where_clauses.append("(" + " OR ".join(tag_clauses) + ")")

    where_sql = ""
    if where_clauses:
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

        for e in events:
            if hasattr(e["start"], "isoformat"):
                e["start"] = e["start"].isoformat()
            if hasattr(e["end"], "isoformat"):
                e["end"] = e["end"].isoformat()

        return jsonify({"events": events}), 200

    except Exception as e:
        print(f"Get events error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# POST /api/admin/events/upload-image — upload single image to Supabase Storage
# =========================
@timeline_bp.route("/admin/events/upload-image", methods=["POST"], strict_slashes=False)
def upload_event_image():
    auth_error = require_admin()
    if auth_error:
        return auth_error

    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    f = request.files["file"]
    if not f.filename:
        return jsonify({"error": "Empty filename"}), 400

    # Replace spaces to prevent URL encoding issues
    clean_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', f.filename)
    safe_name = f"{uuid.uuid4().hex[:8]}_{clean_filename}"
    file_bytes = f.read()

    # URL-encode the filename just in case there are weird characters
    encoded_safe_name = urllib.parse.quote(safe_name)

    upload_url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{encoded_safe_name}"

    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Content-Type": f.mimetype or "application/octet-stream",
        "x-upsert": "true"
    }

    try:
        response = requests.post(upload_url, headers=headers, data=file_bytes)

        if not response.ok:
            print(f"Supabase rejected upload: {response.text}")
            return jsonify({
                "error": "Supabase API Error",
                "details": response.json()
            }), response.status_code

        public_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{encoded_safe_name}"

        return jsonify({"url": public_url, "filename": safe_name}), 200

    except Exception as e:
        print(f"Upload error: {e}")
        return jsonify({"error": str(e)}), 500

# =========================
# POST /api/admin/events — create
# =========================
@timeline_bp.route("/admin/events", methods=["POST"], strict_slashes=False)
def create_event():
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}

    title = (data.get("title") or "").strip()
    desc = (data.get("desc") or "").strip()
    tags = (data.get("tags") or "").strip()
    start = data.get("start")
    end = data.get("end")
    images = data.get("images") or []

    if not title or not tags or not start or not end:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    INSERT INTO events (title, description, tags, start, "end", images)
                    VALUES (:title, :desc, :tags, :start, :end, :images)
                    RETURNING id
                """),
                {
                    "title": title, "desc": desc, "tags": tags,
                    "start": start, "end": end, "images": images,
                }
            )
            new_id = result.scalar()

        return jsonify({"id": new_id, "status": "created"}), 201

    except Exception as e:
        print(f"Create event error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# PUT /api/admin/events/<id> — update
# =========================
@timeline_bp.route("/admin/events/<int:event_id>", methods=["PUT"], strict_slashes=False)
def update_event(event_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}

    title = (data.get("title") or "").strip()
    desc = (data.get("desc") or "").strip()
    tags = (data.get("tags") or "").strip()
    start = data.get("start")
    end = data.get("end")
    images = data.get("images") or []

    if not title or not tags or not start or not end:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    UPDATE events
                    SET title = :title,
                        description = :desc,
                        tags = :tags,
                        start = :start,
                        "end" = :end,
                        images = :images
                    WHERE id = :id
                """),
                {
                    "id": event_id, "title": title, "desc": desc, "tags": tags,
                    "start": start, "end": end, "images": images,
                }
            )

            if result.rowcount == 0:
                return jsonify({"error": "Event not found"}), 404

        return jsonify({"status": "updated"}), 200

    except Exception as e:
        print(f"Update event error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# DELETE /api/admin/events/<id>
# =========================
@timeline_bp.route("/admin/events/<int:event_id>", methods=["DELETE"], strict_slashes=False)
def delete_event(event_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    try:
        with engine.begin() as conn:
            # Fetch images for cleanup
            row = conn.execute(
                text('SELECT images FROM events WHERE id = :id'),
                {"id": event_id}
            ).fetchone()

            if not row:
                return jsonify({"error": "Event not found"}), 404

            conn.execute(
                text("DELETE FROM events WHERE id = :id"),
                {"id": event_id}
            )

        # Best-effort: delete the images from Supabase Storage
        try:
            images = row.images or []
            filenames = []
            for url in images:
                if BUCKET_NAME in url:
                    filenames.append(url.split(f"{BUCKET_NAME}/")[-1])
            if filenames:
                for fname in filenames:
                    requests.delete(
                        f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{fname}",
                        headers={
                            "apikey": SUPABASE_KEY,
                            "Authorization": f"Bearer {SUPABASE_KEY}",
                        },
                        timeout=10,
                    )
        except Exception as e:
            print(f"Image cleanup error (event row still deleted): {e}")

        return jsonify({"status": "deleted"}), 200

    except Exception as e:
        print(f"Delete event error: {e}")
        return jsonify({"error": str(e)}), 500