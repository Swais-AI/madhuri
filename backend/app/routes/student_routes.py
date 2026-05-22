from fastapi import APIRouter
from ..database import get_connection

router = APIRouter()


@router.get("/students")
def get_students():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    s.student_id,
                    s.admission_no,
                    s.full_name,
                    c.class_name,
                    c.section_name,
                    s.roll_no,
                    s.parent_name,
                    s.mobile_no,
                    s.email_id,
                    s.record_status
                FROM sgs_student_master s
                LEFT JOIN sgs_class_master c
                    ON s.class_id = c.class_id
                WHERE s.record_status = 'Active'
                ORDER BY s.student_id;
            """)
            return cur.fetchall()


@router.get("/attendance")
def get_attendance():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    a.attendance_id,
                    a.student_id,
                    s.full_name,
                    c.class_name,
                    c.section_name,
                    a.attendance_date,
                    a.attendance_status,
                    a.remarks
                FROM sgs_student_attendance a
                LEFT JOIN sgs_student_master s
                    ON a.student_id = s.student_id
                LEFT JOIN sgs_class_master c
                    ON s.class_id = c.class_id
                ORDER BY a.attendance_id;
            """)
            return cur.fetchall()


@router.get("/progress")
def get_progress():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    sm.marks_id,
                    s.student_id,
                    s.full_name,
                    c.class_name,
                    c.section_name,
                    sub.subject_name,
                    e.exam_name,
                    e.exam_type,
                    sm.marks_obtained,
                    sm.max_marks,
                    ROUND((sm.marks_obtained / sm.max_marks) * 100, 2) AS percentage,
                    sm.grade,
                    sm.remarks,
                    sm.record_status
                FROM sgs_student_marks sm
                LEFT JOIN sgs_student_master s
                    ON sm.student_id = s.student_id
                LEFT JOIN sgs_class_master c
                    ON s.class_id = c.class_id
                LEFT JOIN sgs_subject_master sub
                    ON sm.subject_id = sub.subject_id
                LEFT JOIN sgs_exam_master e
                    ON sm.exam_id = e.exam_id
                WHERE sm.record_status = 'Active'
                ORDER BY sm.marks_id;
            """)
            return cur.fetchall()


@router.get("/ai-student-analysis")
def get_ai_student_analysis():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    a.analysis_id,
                    a.student_id,
                    s.full_name,
                    c.class_name,
                    c.section_name,
                    a.attendance_percentage,
                    a.performance_score,
                    a.risk_level,
                    a.topper_prediction,
                    a.weak_subject,
                    a.ai_remarks
                FROM sgs_ai_student_analysis a
                LEFT JOIN sgs_student_master s
                    ON a.student_id = s.student_id
                LEFT JOIN sgs_class_master c
                    ON s.class_id = c.class_id
                ORDER BY a.analysis_id;
            """)
            return cur.fetchall()
