from fastapi import APIRouter
from app.database import get_connection

router = APIRouter()


@router.get("/teachers")
def get_teachers():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    t.teacher_id,
                    t.full_name,
                    t.subject_name,
                    t.class_id,
                    c.class_name,
                    c.section_name,
                    t.section_1,
                    t.role,
                    t.email_id,
                    t.section_2,
                    t.phone,
                    t.is_active
                FROM sgs_teacher_master t
                LEFT JOIN sgs_class_master c
                    ON t.class_id = c.class_id
                WHERE t.is_active = TRUE
                ORDER BY t.teacher_id;
            """)
            return cur.fetchall()


@router.get("/ai-teacher-analysis")
def get_ai_teacher_analysis():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    a.analysis_id,
                    a.teacher_id,
                    t.full_name,
                    t.subject_name,
                    c.class_name,
                    c.section_name,
                    a.class_performance_score,
                    a.attendance_handling_score,
                    a.parent_feedback_score,
                    a.overall_rating,
                    a.ai_remarks
                FROM sgs_ai_teacher_analysis a
                LEFT JOIN sgs_teacher_master t
                    ON a.teacher_id = t.teacher_id
                LEFT JOIN sgs_class_master c
                    ON t.class_id = c.class_id
                ORDER BY a.analysis_id;
            """)
            return cur.fetchall()