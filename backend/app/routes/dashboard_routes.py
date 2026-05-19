from fastapi import APIRouter
from app.database import conn

router = APIRouter()

@router.get("/classes")
def get_classes():
    cur = conn.cursor()
    cur.execute("""
        SELECT class_id, class_name, section_name, academic_year, record_status
        FROM sgs_class_master
        ORDER BY class_id;
    """)
    data = cur.fetchall()
    cur.close()
    return data


@router.get("/subjects")
def get_subjects():
    cur = conn.cursor()
    cur.execute("""
        SELECT subject_id, subject_name, subject_code, class_id, teacher_id
        FROM sgs_subject_master
        ORDER BY subject_id;
    """)
    data = cur.fetchall()
    cur.close()
    return data


@router.get("/exams")
def get_exams():
    cur = conn.cursor()
    cur.execute("""
        SELECT exam_id, exam_name, academic_year, exam_type, start_date, end_date
        FROM sgs_exam_master
        ORDER BY exam_id;
    """)
    data = cur.fetchall()
    cur.close()
    return data


@router.get("/notices")
def get_notices():
    cur = conn.cursor()
    cur.execute("""
        SELECT notice_id, notice_title, notice_text, notice_date, applicable_class
        FROM sgs_notice_board
        ORDER BY notice_id DESC;
    """)
    data = cur.fetchall()
    cur.close()
    return data


@router.get("/functions")
def get_functions():
    cur = conn.cursor()
    cur.execute("""
        SELECT function_id, function_name, function_date, coordinator_name,
               participants_count, status, description
        FROM sgs_school_functions
        ORDER BY function_id DESC;
    """)
    data = cur.fetchall()
    cur.close()
    return data


@router.get("/tours")
def get_tours():
    cur = conn.cursor()
    cur.execute("""
        SELECT tour_id, tour_name, location_name, tour_date,
               incharge_name, students_count, status
        FROM sgs_school_tours
        ORDER BY tour_id DESC;
    """)
    data = cur.fetchall()
    cur.close()
    return data


@router.get("/dashboard-summary")
def dashboard_summary():
    cur = conn.cursor()
    cur.execute("""
        SELECT
        (SELECT COUNT(*) FROM sgs_student_master) AS total_students,
        (SELECT COUNT(*) FROM sgs_teacher_master) AS total_teachers,
        (SELECT COUNT(*) FROM sgs_class_master) AS total_classes,
        (SELECT ROUND(AVG(marks_obtained), 2) FROM sgs_student_marks) AS average_marks;
    """)
    data = cur.fetchone()
    cur.close()
    return data


@router.get("/performance-chart")
def performance_chart():
    cur = conn.cursor()
    cur.execute("""
        SELECT c.class_name, ROUND(AVG(m.marks_obtained), 2) AS percentage
        FROM sgs_student_marks m
        JOIN sgs_student_master s ON m.student_id = s.student_id
        JOIN sgs_class_master c ON s.class_id = c.class_id
        GROUP BY c.class_name
        ORDER BY c.class_name;
    """)
    data = cur.fetchall()
    cur.close()
    return data


@router.get("/pass-fail-chart")
def pass_fail_chart():
    cur = conn.cursor()
    cur.execute("""
        SELECT
            SUM(CASE WHEN marks_obtained >= 40 THEN 1 ELSE 0 END) AS pass_count,
            SUM(CASE WHEN marks_obtained < 40 THEN 1 ELSE 0 END) AS fail_count
        FROM sgs_student_marks;
    """)
    result = cur.fetchone()
    cur.close()

    return [
        {"name": "Pass", "value": result["pass_count"]},
        {"name": "Fail", "value": result["fail_count"]}
    ]