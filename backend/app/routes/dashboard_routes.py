from fastapi import APIRouter
from app.database import get_connection

router = APIRouter()


def rows_to_dict(cursor):
    return [dict(row) for row in cursor.fetchall()]


def row_to_dict(cursor):
    row = cursor.fetchone()
    return dict(row) if row else {}


@router.get("/classes")
def get_classes():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    class_id,
                    class_name,
                    section_name,
                    academic_year,
                    record_status
                FROM sgs_class_master
                ORDER BY class_id;
            """)
            return rows_to_dict(cur)


@router.get("/subjects")
def get_subjects():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    s.subject_id,
                    s.subject_name,
                    s.subject_code,
                    s.class_id,
                    c.class_name,
                    c.section_name,
                    s.teacher_id,
                    t.full_name AS teacher_name
                FROM sgs_subject_master s
                LEFT JOIN sgs_class_master c
                    ON s.class_id = c.class_id
                LEFT JOIN sgs_teacher_master t
                    ON s.teacher_id = t.teacher_id
                ORDER BY s.subject_id;
            """)
            return rows_to_dict(cur)


@router.get("/exams")
def get_exams():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    exam_id,
                    exam_name,
                    academic_year,
                    exam_type,
                    start_date,
                    end_date
                FROM sgs_exam_master
                ORDER BY exam_id;
            """)
            return rows_to_dict(cur)


@router.get("/notices")
def get_notices():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    notice_id,
                    notice_title,
                    notice_text,
                    notice_date,
                    applicable_class
                FROM sgs_notice_board
                ORDER BY notice_id DESC;
            """)
            return rows_to_dict(cur)


@router.get("/functions")
def get_functions():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    function_id,
                    function_name,
                    function_date,
                    coordinator_name,
                    participants_count,
                    status,
                    description
                FROM sgs_school_functions
                ORDER BY function_id DESC;
            """)
            return rows_to_dict(cur)


@router.get("/tours")
def get_tours():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    tour_id,
                    tour_name,
                    location_name,
                    tour_date,
                    incharge_name,
                    students_count,
                    status
                FROM sgs_school_tours
                ORDER BY tour_id DESC;
            """)
            return rows_to_dict(cur)


@router.get("/dashboard-summary")
def dashboard_summary():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    (SELECT COUNT(*) FROM sgs_student_master WHERE record_status = 'Active') AS total_students,
                    (SELECT COUNT(*) FROM sgs_teacher_master WHERE is_active = TRUE) AS total_teachers,
                    (SELECT COUNT(*) FROM sgs_class_master WHERE record_status = 'Active') AS total_classes,

                    COALESCE((
                        SELECT ROUND(AVG(marks_obtained), 2)
                        FROM sgs_student_marks
                        WHERE record_status = 'Active'
                    ), 0) AS average_marks,

                    COALESCE((
                        SELECT ROUND(
                            (SUM(CASE WHEN marks_obtained >= 40 THEN 1 ELSE 0 END)::numeric
                            / NULLIF(COUNT(*), 0)) * 100,
                            2
                        )
                        FROM sgs_student_marks
                        WHERE record_status = 'Active'
                    ), 0) AS pass_percentage,

                    COALESCE((
                        SELECT ROUND(
                            (SUM(CASE WHEN attendance_status = 'Present' THEN 1 ELSE 0 END)::numeric
                            / NULLIF(COUNT(*), 0)) * 100,
                            2
                        )
                        FROM sgs_student_attendance
                    ), 0) AS attendance_percentage;
            """)
            return row_to_dict(cur)


@router.get("/performance-chart")
def performance_chart():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    c.class_name,
                    c.section_name,
                    ROUND(AVG((m.marks_obtained / m.max_marks) * 100), 2) AS percentage
                FROM sgs_student_marks m
                JOIN sgs_student_master s
                    ON m.student_id = s.student_id
                JOIN sgs_class_master c
                    ON s.class_id = c.class_id
                WHERE m.record_status = 'Active'
                GROUP BY c.class_name, c.section_name
                ORDER BY c.class_name, c.section_name;
            """)
            return rows_to_dict(cur)


@router.get("/pass-fail-chart")
def pass_fail_chart():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    SUM(CASE WHEN marks_obtained >= 40 THEN 1 ELSE 0 END) AS pass_count,
                    SUM(CASE WHEN marks_obtained < 40 THEN 1 ELSE 0 END) AS fail_count
                FROM sgs_student_marks
                WHERE record_status = 'Active';
            """)
            result = row_to_dict(cur)

    return [
        {"name": "Pass", "value": result.get("pass_count") or 0},
        {"name": "Fail", "value": result.get("fail_count") or 0}
    ]