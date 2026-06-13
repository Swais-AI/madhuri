from fastapi import APIRouter
from ..database import get_connection

router = APIRouter()


def rows_to_dict(cursor):
    return [dict(row) for row in cursor.fetchall()]


@router.get("/class-teachers")
def get_class_teachers():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    c.class_id,
                    c.class_name,
                    c.section_name,
                    c.academic_year,
                    c.class_teacher_id,

                    u.full_name AS class_teacher_name,
                    u.email_id AS teacher_email,
                    u.mobile_no AS teacher_mobile

                FROM sgs_class_master c

                LEFT JOIN sgs_users_masters u
                ON c.class_teacher_id = u.user_id

                WHERE c.record_status='Active'

                ORDER BY c.class_id;
            """)
            return rows_to_dict(cur)

                                                