from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MachineHealthCreate(BaseModel):

    machine_id: int
    health_score: Optional[float]
    temperature: Optional[float]
    vibration: Optional[float]
    operating_hours: Optional[int]
    health_status: Optional[str]


class MachineHealthResponse(MachineHealthCreate):

    health_id: int
    checked_at: datetime

    class Config:
        from_attributes = True