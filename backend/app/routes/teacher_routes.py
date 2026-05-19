from fastapi import APIRouter
from app.database import conn

router = APIRouter()

@router.get("/teachers")
def get_teachers():

    cur = conn.cursor()

    cur.execute("""
        SELECT
            teacher_id,
            full_name,
            subject_name,
            class_id,
            section_1,
            role,
            email_id,
            section_2,
            phone,
            is_active
        FROM sgs_teacher_master
        ORDER BY teacher_id;
    """)

    teachers = cur.fetchall()
    cur.close()

    return teachers


@router.get("/ai-teacher-analysis")
def get_ai_teacher_analysis():

    cur = conn.cursor()

    cur.execute("""
        SELECT
            analysis_id,
            teacher_id,
            class_performance_score,
            attendance_handling_score,
            parent_feedback_score,
            overall_rating,
            ai_remarks
        FROM sgs_ai_teacher_analysis
        ORDER BY analysis_id;
    """)

    analysis = cur.fetchall()
    cur.close()

    return analysis