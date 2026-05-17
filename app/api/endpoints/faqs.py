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

faqs_bp = Blueprint("faqs", __name__, url_prefix="/api")


@faqs_bp.route("/faqs", methods=["GET"], strict_slashes=False)
def get_faqs():
    try:
        sql = text("""
            SELECT id, question, answer, sort_order
            FROM faqs
            ORDER BY sort_order ASC, id ASC;
        """)

        with engine.connect() as conn:
            rows = conn.execute(sql).fetchall()

        entries = [{
            "id": r.id,
            "question": r.question,
            "answer": r.answer,
            "sort_order": r.sort_order,
        } for r in rows]

        return jsonify({"faqs": entries}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@faqs_bp.route("/admin/faqs", methods=["POST"], strict_slashes=False)
def create_faq():
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}
    question = (data.get("question") or "").strip()
    answer = (data.get("answer") or "").strip()
    sort_order = data.get("sort_order")

    if not question or not answer:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with engine.begin() as conn:
            if sort_order is None:
                max_sort = conn.execute(text("SELECT COALESCE(MAX(sort_order), 0) FROM faqs")).scalar()
                sort_order = max_sort + 10

            result = conn.execute(
                text("""
                    INSERT INTO faqs (question, answer, sort_order)
                    VALUES (:question, :answer, :sort_order)
                    RETURNING id
                """),
                {"question": question, "answer": answer, "sort_order": sort_order}
            )
            new_id = result.scalar()

        return jsonify({"id": new_id, "status": "created"}), 201

    except Exception as e:
        print(f"Create faq error: {e}")
        return jsonify({"error": str(e)}), 500


@faqs_bp.route("/admin/faqs/<int:faq_id>", methods=["PUT"], strict_slashes=False)
def update_faq(faq_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    data = request.get_json() or {}
    question = (data.get("question") or "").strip()
    answer = (data.get("answer") or "").strip()
    sort_order = data.get("sort_order")

    if not question or not answer or sort_order is None:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    UPDATE faqs
                    SET question = :question,
                        answer = :answer,
                        sort_order = :sort_order
                    WHERE id = :id
                """),
                {"id": faq_id, "question": question, "answer": answer, "sort_order": sort_order}
            )

            if result.rowcount == 0:
                return jsonify({"error": "FAQ not found"}), 404

        return jsonify({"status": "updated"}), 200

    except Exception as e:
        print(f"Update faq error: {e}")
        return jsonify({"error": str(e)}), 500


@faqs_bp.route("/admin/faqs/<int:faq_id>", methods=["DELETE"], strict_slashes=False)
def delete_faq(faq_id):
    auth_error = require_admin()
    if auth_error:
        return auth_error

    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("DELETE FROM faqs WHERE id = :id"),
                {"id": faq_id}
            )

            if result.rowcount == 0:
                return jsonify({"error": "FAQ not found"}), 404

        return jsonify({"status": "deleted"}), 200

    except Exception as e:
        print(f"Delete faq error: {e}")
        return jsonify({"error": str(e)}), 500