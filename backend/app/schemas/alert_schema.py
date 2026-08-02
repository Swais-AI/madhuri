from pydantic import BaseModel
from datetime import datetime


class AlertCreate(BaseModel):

    prediction_id: int
    machine_id: int
    tool_id: int
    alert_type: str
    severity: str
    message: str


class AlertUpdate(BaseModel):

    alert_status: str


class AlertResponse(AlertCreate):

    alert_id: int
    alert_status: str
    created_at: datetime

    class Config:
        from_attributes = True