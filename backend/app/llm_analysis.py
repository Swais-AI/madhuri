import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from groq import Groq

from app.database import get_connection


BASE_DIR = Path(__file__).resolve().parent.parent
ENV_FILE = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_FILE)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise Exception(f"GROQ_API_KEY not found. Checked: {ENV_FILE}")

client = Groq(api_key=GROQ_API_KEY)

router = APIRouter(prefix="/llm", tags=["LLM Analysis"])


@router.get("/test")
def test_llm():
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": "Say LLM backend integration is working"
                }
            ]
        )

        return {
            "response": response.choices[0].message.content
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/student-analysis/{student_id}")
def student_analysis(student_id: int):
    conn = None
    cursor = None

    try:
        conn = get_connection()
        cursor = conn.cursor()

        query = """
        SELECT
            s.full_name,
            s.section,
            e.exam_name,
            sub.subject_name,
            m.marks_obtained
        FROM sgs_student_marks m
        JOIN sgs_student_master s
            ON s.student_id = m.student_id
        JOIN sgs_exam_master e
            ON e.exam_id = m.exam_id
        JOIN sgs_subject_master sub
            ON sub.subject_id = m.subject_id
        WHERE s.student_id = %s
        ORDER BY e.exam_name, sub.subject_name;
        """

        cursor.execute(query, (student_id,))
        rows = cursor.fetchall()

        if not rows:
            raise HTTPException(
                status_code=404,
                detail="No student marks found"
            )

        student_data = rows

        prompt = f"""
You are a school academic performance analyzer.

Analyze this student marks data:

{student_data}

Give answer in simple points:
1. Overall performance
2. Strong subjects
3. Weak subjects
4. Improvement suggestions
5. Final conclusion
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return {
            "student_id": student_id,
            "student_data": student_data,
            "llm_analysis": response.choices[0].message.content
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


@router.get("/overall-analysis")
def overall_analysis():
    conn = None
    cursor = None

    try:
        conn = get_connection()
        cursor = conn.cursor()

        query = """
        SELECT
            s.full_name,
            s.section,
            e.exam_name,
            sub.subject_name,
            m.marks_obtained
        FROM sgs_student_marks m
        JOIN sgs_student_master s
            ON s.student_id = m.student_id
        JOIN sgs_exam_master e
            ON e.exam_id = m.exam_id
        JOIN sgs_subject_master sub
            ON sub.subject_id = m.subject_id
        ORDER BY s.full_name, e.exam_name, sub.subject_name;
        """

        cursor.execute(query)
        rows = cursor.fetchall()

        if not rows:
            raise HTTPException(
                status_code=404,
                detail="No marks data found"
            )

        all_data = rows

        prompt = f"""
You are a school dashboard AI assistant.

Analyze this full school/class marks data:

{all_data}

Give answer in simple points:
1. Overall class performance
2. Best performing subjects
3. Weak subjects
4. Students who need attention
5. Suggestions for teachers
6. Final conclusion
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return {
            "total_records": len(all_data),
            "data": all_data,
            "llm_analysis": response.choices[0].message.content
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()