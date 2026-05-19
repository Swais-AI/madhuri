from fastapi import APIRouter
from app.database import conn

router = APIRouter()

@router.get("/students")
def get_students():
    cur = conn.cursor()
    cur.execute("""
        SELECT
            student_id,
            admission_no,
            full_name,
            class_id,
            section,
            roll_no,
            parent_name,
            mobile_no,
            email_id,
            record_status
        FROM sgs_student_master
        ORDER BY student_id;
    """)
    students = cur.fetchall()
    cur.close()
    return students


@router.get("/attendance")
def get_attendance():
    cur = conn.cursor()
    cur.execute("""
        SELECT
            attendance_id,
            student_id,
            attendance_date,
            attendance_status,
            remarks
        FROM sgs_student_attendance
        ORDER BY attendance_id;
    """)
    attendance = cur.fetchall()
    cur.close()
    return attendance


@router.get("/progress")
def get_progress():
    cur = conn.cursor()
    cur.execute("""
        SELECT
            sm.marks_id,
            s.full_name AS student_name,
            s.section,
            c.class_name,
            sub.subject_name,
            e.exam_name,
            e.exam_type,
            sm.marks_obtained,
            sm.max_marks,
            sm.grade,
            sm.remarks,
            sm.record_status
        FROM sgs_student_marks sm
        LEFT JOIN sgs_student_master s ON sm.student_id = s.student_id
        LEFT JOIN sgs_class_master c ON s.class_id = c.class_id
        LEFT JOIN sgs_subject_master sub ON sm.subject_id = sub.subject_id
        LEFT JOIN sgs_exam_master e ON sm.exam_id = e.exam_id
        ORDER BY sm.marks_id;
    """)
    marks = cur.fetchall()
    cur.close()
    return marks


@router.get("/ai-student-analysis")
def get_ai_student_analysis():
    cur = conn.cursor()
    cur.execute("""
        SELECT
            analysis_id,
            student_id,
            attendance_percentage,
            performance_score,
            risk_level,
            topper_prediction,
            weak_subject,
            ai_remarks
        FROM sgs_ai_student_analysis
        ORDER BY analysis_id;
    """)
    analysis = cur.fetchall()
    cur.close()
    return analysis