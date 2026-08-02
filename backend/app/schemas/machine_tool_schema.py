from datetime import date
from typing import Optional

from pydantic import BaseModel


class MachineToolCreate(BaseModel):
    machine_id: int
    tool_id: int
    install_date: date
    remove_date: Optional[date] = None
    tool_position: Optional[str] = None
    status: str = "Installed"


class MachineToolUpdate(BaseModel):
    machine_id: Optional[int] = None
    tool_id: Optional[int] = None
    install_date: Optional[date] = None
    remove_date: Optional[date] = None
    tool_position: Optional[str] = None
    status: Optional[str] = None


class MachineToolResponse(BaseModel):
    machine_tool_id: int
    machine_id: int
    tool_id: int
    install_date: date
    remove_date: Optional[date] = None
    tool_position: Optional[str] = None
    status: str
    record_status: str

    class Config:
        from_attributes = True