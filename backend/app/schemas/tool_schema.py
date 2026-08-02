from pydantic import BaseModel
from typing import Optional


class ToolCreate(BaseModel):
    tool_code: str
    tool_name: str
    tool_type_id: int
    manufacturer: Optional[str] = None
    expected_life_hours: int
    current_life_hours: int = 0
    tool_status: str = "Available"


class ToolUpdate(BaseModel):
    tool_code: Optional[str] = None
    tool_name: Optional[str] = None
    tool_type_id: Optional[int] = None
    manufacturer: Optional[str] = None
    expected_life_hours: Optional[int] = None
    current_life_hours: Optional[int] = None
    tool_status: Optional[str] = None


class ToolResponse(BaseModel):
    tool_id: int
    tool_code: str
    tool_name: str
    tool_type_id: int
    manufacturer: Optional[str] = None
    expected_life_hours: int
    current_life_hours: int
    tool_status: str
    record_status: str

    class Config:
        from_attributes = True