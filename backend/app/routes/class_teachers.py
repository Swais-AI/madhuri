from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database import get_db

router = APIRouter()


@router.get("/")
def get_class_teachers(db: Session = Depends(get_db)):

    query = """
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
        INNER JOIN sgs_users_masters u
            ON c.class_teacher_id = u.user_id
        WHERE c.record_status = 'Active'
        AND u.record_status = 'Active'
        AND u.full_name IS NOT NULL
        AND TRIM(u.full_name) <> ''
        ORDER BY c.class_id;
    """

    result = db.execute(text(query)).mappings().all()

    return [dict(row) for row in result]