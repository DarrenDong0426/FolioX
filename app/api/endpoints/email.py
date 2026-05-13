import os
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
import resend

load_dotenv()

email_bp = Blueprint("email", __name__, url_prefix="/api")

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
TO_EMAIL = os.getenv("TO_EMAIL")

resend.api_key = RESEND_API_KEY


@email_bp.route("/email", methods=["POST"])
def send_email():
    """Handles form submissions and sends them via Resend."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400

    user = data.get("name", "Anonymous")
    sender_email = data.get("email", "(No email provided)")
    desc = data.get("desc")

    if not desc:
        return jsonify({"error": "Missing required field: 'desc'"}), 400

    subject = f"[Folio-X] New Form Submission from {user}"
    body = (
        f"Name: {user}\n"
        f"Email: {sender_email}\n"
        f"Description: {desc}\n"
    )

    params: resend.Emails.SendParams = {
        "from": f"FolioX <no-reply@ddarren.org>",
        "to": [TO_EMAIL],
        "subject": subject,
        "text": body,
    }

    try:
        response = resend.Emails.send(params)

        response_id = None
        if isinstance(response, dict):
            response_id = response.get("id")
        elif hasattr(response, "id"):
            response_id = response.id

        if response_id:
            return jsonify({
                "status": "Email sent successfully",
                "id": response_id
            }), 200
        else:
            return jsonify({
                "error": "Failed to confirm email send",
                "raw_response": str(response)
            }), 200 

    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"error": "Exception while sending email", "details": str(e)}), 500
