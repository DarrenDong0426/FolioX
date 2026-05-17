import os
import uuid
import re
import urllib.parse
import requests
from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
from api.endpoints.auth import require_admin

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
BUCKET_NAME = "Content"   # ← match the bucket name you create

content_bp = Blueprint("content", __name__, url_prefix="/api")


@content_bp.route("/admin/content/upload-image", methods=["POST"], strict_slashes=False)
def upload_content_image():
    auth_error = require_admin()
    if auth_error:
        return auth_error

    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    f = request.files["file"]
    if not f.filename:
        return jsonify({"error": "Empty filename"}), 400

    # Strip everything except letters, digits, underscores, dashes, and dots
    clean_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', f.filename)
    safe_name = f"{uuid.uuid4().hex[:8]}_{clean_filename}"
    file_bytes = f.read()

    encoded_safe_name = urllib.parse.quote(safe_name)
    upload_url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{encoded_safe_name}"

    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Content-Type": f.mimetype or "application/octet-stream",
        "x-upsert": "true",
    }

    try:
        response = requests.post(upload_url, headers=headers, data=file_bytes)

        if not response.ok:
            print(f"Supabase rejected upload: {response.text}")
            return jsonify({
                "error": "Supabase API Error",
                "details": response.json() if response.text else None,
            }), response.status_code

        public_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{encoded_safe_name}"
        return jsonify({"url": public_url, "filename": safe_name}), 200

    except Exception as e:
        print(f"Upload error: {e}")
        return jsonify({"error": str(e)}), 500