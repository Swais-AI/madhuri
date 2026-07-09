import json
import re
from sqlalchemy import text
from sqlalchemy.orm import Session
from decimal import Decimal

from app.ai_config import GeminiService


# ==================================================
# Helper: Clean AI Text
# ==================================================
def clean_ai_text(text: str):
    return re.sub(r"(\$\$|\$|```|\\\(|\\\)|\\\[|\\\])", "", text or "").strip()


# ==================================================
# Helper: Log AI Usage
# ==================================================
def log_ai_usage(db: Session, user_info: dict, feature_used: str):
    try:
        db.execute(text("""
            INSERT INTO ai_usage_logs (user_name, user_email, user_type, feature_used)
            VALUES (:name, :email, :role, :feature)
        """), {
            "name": user_info.get("name"),
            "email": user_info.get("email"),
            "role": user_info.get("role"),
            "feature": feature_used
        })
        db.commit()
    except Exception as e:
        print("LOG ERROR:", e)


# ==================================================
# 1. ASSIGNMENT REPORT
# ==================================================
def get_assignment_report(db: Session, data: dict, user_info: dict):

    log_ai_usage(db, user_info, "School-Wide Assignment Report")

    result = db.execute(text("""
        SELECT 
            COUNT(*) AS total_assigned,
            SUM(CASE WHEN marks_obtained IS NOT NULL THEN 1 ELSE 0 END) AS completed,
            SUM(CASE WHEN marks_obtained IS NULL OR is_absent = true THEN 1 ELSE 0 END) AS missing
        FROM sgs_assessment_results
    """)).mappings().first()

    prompt = f"""
You are SGS AI Executive Assistant for the Headmaster.

Review the following school-wide assignment statistics.

School Data:

{json.dumps(dict(result or {}))}

Prepare a concise executive report.

Include:

- Overall completion status.
- Key concerns requiring intervention.
- Recommended administrative action.

IMPORTANT FORMAT RULES:

- Maximum 3 bullet points.
- Professional tone.
- Plain text only.
- No Markdown.
- No tables.
- No HTML.
- No code blocks.
- No LaTeX.
"""

    ai_result = GeminiService.generate_content(prompt)

    return {
        "report": clean_ai_text(ai_result.get("text", ""))
    }

# ==================================================
# 2. ACADEMIC ANALYTICS
# ==================================================
def get_academic_analytics(db: Session, payload: dict, user_info: dict):

    print("\n========== ACADEMIC ANALYTICS ==========")
    print("Payload:", payload)

    target_name = payload.get("target_name") or ""
    target_type = payload.get("target_type")
    scope = payload.get("scope")

    log_ai_usage(db, user_info, f"Academic Analytics {target_type}-{scope}")

    data = []

    if target_type == "student" and scope == "all_subjects":
        data = db.execute(text("""
            SELECT
                a.assessment_type AS subject,
                ROUND(AVG(ar.percentage),2) AS score
            FROM sgs_assessment_results ar
            JOIN sgs_assessments a ON a.assessment_id = ar.assessment_id
            JOIN sgs_student_master s ON s.student_id = ar.student_id
            WHERE s.full_name ILIKE :name
            GROUP BY a.assessment_type
        """), {"name": f"%{target_name}%"}).mappings().all()

    elif target_type == "class" and scope == "all_subjects":
        data = db.execute(text("""
            SELECT
                a.assessment_type AS subject,
                ROUND(AVG(ar.percentage),2) AS score
            FROM sgs_assessment_results ar
            JOIN sgs_assessments a ON a.assessment_id = ar.assessment_id
            GROUP BY a.assessment_type
        """)).mappings().all()

    elif target_type == "student" and scope == "single_subject":
        data = db.execute(text("""
            SELECT
                a.title AS test,
                ar.percentage AS score
            FROM sgs_assessment_results ar
            JOIN sgs_assessments a ON a.assessment_id = ar.assessment_id
            JOIN sgs_student_master s ON s.student_id = ar.student_id
            WHERE s.full_name ILIKE :name
        """), {"name": f"%{target_name}%"}).mappings().all()

    elif target_type == "class" and scope == "single_subject":
        data = db.execute(text("""
            SELECT
                s.full_name AS student,
                ar.percentage AS score
            FROM sgs_assessment_results ar
            JOIN sgs_student_master s ON s.student_id = ar.student_id
        """)).mappings().all()

    print("SQL RESULT:", [dict(r) for r in data])

    # ✅ CLEAN DATA (FIX DECIMAL CRASH)
    cleaned_data = []
    for row in data:
        row_dict = dict(row)

        for k, v in row_dict.items():
            if isinstance(v, Decimal):
                row_dict[k] = float(v)

        cleaned_data.append(row_dict)

    # ✅ SAFE JSON FOR PROMPT
    safe_json = json.dumps(cleaned_data, ensure_ascii=False)

    prompt = f"""
You are SGS AI Academic Analytics Assistant.

Analyze this academic data:

{safe_json}

Return ONLY valid JSON.

Format:

{{
 "trend":"",
 "strengths":"",
 "weaknesses":"",
 "recommendations":""
}}

Rules:

- Values must be plain text.
- No Markdown.
- No explanations.
- No JSON code blocks.
- No extra keys.
"""

    ai_result = GeminiService.generate_content(prompt)

    ai_text = ai_result.get("text", "{}")

    try:
        ai_json = json.loads(ai_text)
    except:
        ai_json = {
            "trend": "",
            "strengths": "",
            "weaknesses": "",
            "recommendations": ""
        }

    return {
        "analysis": ai_json,
        "chartData": cleaned_data
    }
# ==================================================
# 3. TEACHER PERFORMANCE
# ==================================================
def get_teacher_performance(db: Session, data: dict, user_info: dict):

    log_ai_usage(db, user_info, "Teacher Performance Review")

    teacher_data = db.execute(text("""
        SELECT u.full_name AS name,
               COUNT(a.assessment_id) AS assessments_created
        FROM sgs_users_masters u
        LEFT JOIN sgs_assessments a ON u.user_id::text = a.teacher_id
        GROUP BY u.full_name
        ORDER BY assessments_created DESC
    """)).mappings().all()

    prompt = f"""
You are SGS AI School Performance Advisor.

Review the following teacher performance data.

Teacher Data:

{json.dumps([dict(x) for x in teacher_data])}

Generate an executive summary.

Include:

- High-performing teachers.
- Teachers requiring support.
- Administrative recommendations.
- Professional development suggestions.

IMPORTANT FORMAT RULES:

- Maximum 4 bullet points.
- Professional tone.
- Plain text only.
- No Markdown.
- No HTML.
- No LaTeX.
"""

    ai_result = GeminiService.generate_content(prompt)

    return {
        "report": clean_ai_text(ai_result.get("text", ""))
    }
# ==================================================
# 4. TRANSLATE
# ==================================================
def translate_for_headmaster(db: Session, payload: dict, user_info: dict):

    text_value = payload.get("text")
    target_language = payload.get("target_language")

    if not text_value or not target_language:
        return {"error": "Missing parameters"}

    log_ai_usage(
        db,
        user_info,
        "Headmaster Translator"
    )

    is_bulk = isinstance(text_value, list)

    if is_bulk:

        prompt = f"""
Translate the following list into {target_language}.

Rules:
- Return ONLY a JSON array.
- Keep the same order.
- Do not translate numbers.
- Do not translate emails.
- Do not translate phone numbers.
- Do not explain.

Text:
{json.dumps(text_value, ensure_ascii=False)}
"""

    else:

        prompt = f"""
Translate the following text into {target_language}.

Rules:
- Return ONLY translated text.
- Do not translate numbers.
- Do not translate emails.
- Do not translate phone numbers.
- Do not explain.

Text:
{text_value}
"""


    ai_result = GeminiService.generate_content(prompt)


    translated_text = clean_ai_text(
        ai_result.get("text", "")
    )


    if is_bulk:
        try:
            translated_text = json.loads(translated_text)
        except:
            translated_text = text_value


    return {
        "original": text_value,
        "translated": translated_text,
        "target_language": target_language
    }