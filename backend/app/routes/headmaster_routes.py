from fastapi import APIRouter
from ..database import get_connection

router = APIRouter()

@router.get("/headmaster")
def get_headmaster():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
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
        """)

        row = cursor.fetchone()

        if row:
            return {
                "name": row["full_name"],
                "role": row["role_name"]
            }

        return {
            "name": "",
            "role": "Headmaster"
        }

    finally:
        cursor.close()
        conn.close()
