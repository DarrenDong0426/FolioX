from flask import Blueprint, jsonify, request
import requests
from sqlalchemy import create_engine, text
from supabase import create_client
import os
import uuid
from dotenv import load_dotenv
from api.endpoints.auth import require_admin

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
BUCKET_NAME = "Documents"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=3,
    max_overflow=5
)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

documents_bp = Blueprint("documents", __name__, url_prefix="/api")


# =========================
# GET /api/documents — public list
# =========================
@documents_bp.route("/documents", methods=["GET"], strict_slashes=False)
def get_documents():
    try:
        sql = text("""
            SELECT id, title, description, last_updated, file_path
            FROM documents
            ORDER BY last_updated DESC;
        """)

        with engine.connect() as conn:
            rows = conn.execute(sql).fetchall()

        documents = []
        for r in rows:
            documents.append({
                "id": r.id,
                "title": r.title,
                "desc": r.description,
                "month_year": r.last_updated.strftime("%B %Y") if r.last_updated else None,
                "last_updated_raw": r.last_updated.isoformat() if r.last_updated else None,
                "file_path": r.file_path
            })

        return jsonify({"documents": documents}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# POST /api/admin/documents/upload — upload a file to Supabase Storage
# =========================
import urllib.parse

# =========================
# POST /api/admin/documents/upload — upload a file via REST
# =========================
@documents_bp.route("/admin/documents/upload", methods=["POST"], strict_slashes=False)
def upload_document_file():
    auth_error = require_admin()
    if auth_error:
        return auth_error

    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    f = request.files["file"]
    if not f.filename:
        return jsonify({"error": "Empty filename"}), 400

    # Replace spaces to prevent URL encoding issues
    clean_filename = f.filename.replace(" ", "_")
    safe_name = f"{uuid.uuid4().hex[:8]}_{clean_filename}"
    file_bytes = f.read()

    # URL-encode the filename just in case there are weird characters
    encoded_safe_name = urllib.parse.quote(safe_name)
    
    # Direct Supabase REST API URL
    upload_url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{encoded_safe_name}"

    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Content-Type": f.mimetype or "application/octet-stream",
        "x-upsert": "true"
    }

    try:
        # Send raw bytes directly to the REST API
        response = requests.post(upload_url, headers=headers, data=file_bytes)

        # If Supabase rejects it, we will FINALLY see the real error message
        if not response.ok:
            print(f"Supabase rejected upload: {response.text}")
            return jsonify({
                "error": "Supabase API Error", 
                "details": response.json()
            }), response.status_code

        # Manually construct the public URL if successful
        public_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{encoded_safe_name}"

        return jsonify({"url": public_url, "filename": safe_name}), 200

    except Exception as e:
        print(f"Upload error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# POST /api/admin/documents — create
# =========================
@documents_bp.route("/admin/documents", methods=["POST"], strict_slashes=False)
def create_document():
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}

    title = (data.get("title") or "").strip()
    desc = (data.get("desc") or "").strip()
    last_updated = data.get("last_updated")
    file_path = (data.get("file_path") or "").strip()

    if not title or not last_updated or not file_path:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    INSERT INTO documents (title, description, last_updated, file_path)
                    VALUES (:title, :desc, :last_updated, :file_path)
                    RETURNING id
                """),
                {"title": title, "desc": desc, "last_updated": last_updated, "file_path": file_path}
            )
            new_id = result.scalar()

        return jsonify({"id": new_id, "status": "created"}), 201

    except Exception as e:
        print(f"Create document error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# PUT /api/admin/documents/<id> — update
# =========================
@documents_bp.route("/admin/documents/<int:doc_id>", methods=["PUT"], strict_slashes=False)
def update_document(doc_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}

    title = (data.get("title") or "").strip()
    desc = (data.get("desc") or "").strip()
    last_updated = data.get("last_updated")
    file_path = (data.get("file_path") or "").strip()

    if not title or not last_updated or not file_path:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    UPDATE documents
                    SET title = :title,
                        description = :desc,
                        last_updated = :last_updated,
                        file_path = :file_path
                    WHERE id = :id
                """),
                {"id": doc_id, "title": title, "desc": desc, "last_updated": last_updated, "file_path": file_path}
            )

            if result.rowcount == 0:
                return jsonify({"error": "Document not found"}), 404

        return jsonify({"status": "updated"}), 200

    except Exception as e:
        print(f"Update document error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# DELETE /api/admin/documents/<id>
# =========================
@documents_bp.route("/admin/documents/<int:doc_id>", methods=["DELETE"], strict_slashes=False)
def delete_document(doc_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    try:
        with engine.begin() as conn:
            # First, get the file_path so we can delete the file too
            row = conn.execute(
                text("SELECT file_path FROM documents WHERE id = :id"),
                {"id": doc_id}
            ).fetchone()

            if not row:
                return jsonify({"error": "Document not found"}), 404

            # Delete the DB row
            conn.execute(
                text("DELETE FROM documents WHERE id = :id"),
                {"id": doc_id}
            )

        # Try to delete the file from Supabase Storage too
        # (extract filename from the URL — best-effort, don't fail if it errors)
        try:
            file_url = row.file_path
            if BUCKET_NAME in file_url:
                # URL format: https://xxx.supabase.co/storage/v1/object/public/documents/FILENAME
                filename = file_url.split(f"{BUCKET_NAME}/")[-1]
                supabase.storage.from_(BUCKET_NAME).remove([filename])
        except Exception as e:
            print(f"File cleanup error (DB row still deleted): {e}")

        return jsonify({"status": "deleted"}), 200

    except Exception as e:
        print(f"Delete document error: {e}")
        return jsonify({"error": str(e)}), 500