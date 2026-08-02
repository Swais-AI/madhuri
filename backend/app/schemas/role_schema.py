from pydantic import BaseModel
from typing import Optional

class RoleCreate(BaseModel):
    role_name: str
    description: Optional[str] = None


class RoleResponse(RoleCreate):
    role_id: int

    class Config:
        from_attributes = True