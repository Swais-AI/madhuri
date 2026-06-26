from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database import get_db

router = APIRouter()


@router.get("/")
def get_headmaster(db: Session = Depends(get_db)):

    query = """
        SELECT 
            u.full_name,
            r.role_name
        FROM sgs_users_masters u
        JOIN sgs_role_response r
            ON r.role_id = u.role_id
        WHERE LOWER(r.role_name) = 'headmaster'
          AND u.is_active = TRUE
          AND u.record_status = 'Active'
        LIMIT 1
    """

    row = db.execute(text(query)).mappings().fetchone()

    if row:
        return {
            "name": row["full_name"],
            "role": row["role_name"]
        }

    return {
        "name": "",
        "role": "Headmaster"
    }