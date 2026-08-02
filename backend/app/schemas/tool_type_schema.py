from pydantic import BaseModel
from typing import Optional


class ToolTypeCreate(BaseModel):
    tool_type_name: str
    description: Optional[str] = None


class ToolTypeUpdate(BaseModel):
    tool_type_name: Optional[str] = None
    description: Optional[str] = None


class ToolTypeResponse(ToolTypeCreate):
    tool_type_id: int
    record_status: str

    class Config:
        from_attributes = True