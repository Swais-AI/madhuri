from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    role_id: int
    employee_id: str
    first_name: str
    last_name: Optional[str] = None
    email: str
    phone: Optional[str] = None
    password_hash: str
    status: str = "Active"


class UserResponse(UserCreate):
    user_id: int

    class Config:
        from_attributes = True