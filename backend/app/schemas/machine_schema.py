from pydantic import BaseModel
from datetime import date
from typing import Optional


class MachineCreate(BaseModel):
    machine_code: str
    machine_name: str
    machine_type_id: int
    manufacturer: Optional[str] = None
    model_number: Optional[str] = None
    installation_date: Optional[date] = None
    location: Optional[str] = None
    status: Optional[str] = "Active"


class MachineResponse(MachineCreate):
    machine_id: int
    record_status: str

    class Config:
        from_attributes = True