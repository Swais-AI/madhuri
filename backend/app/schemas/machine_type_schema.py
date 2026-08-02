from pydantic import BaseModel
from typing import Optional


class MachineTypeCreate(BaseModel):
    machine_type_name: str
    description: Optional[str] = None


class MachineTypeResponse(MachineTypeCreate):
    machine_type_id: int
    record_status: str

    class Config:
        from_attributes = True