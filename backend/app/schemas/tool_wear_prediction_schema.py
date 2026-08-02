from pydantic import BaseModel
from datetime import datetime


# Data coming from frontend
class ToolWearPredictionCreate(BaseModel):

    machine_id: int
    tool_id: int



# Data returned from backend
class ToolWearPredictionResponse(BaseModel):

    prediction_id: int

    machine_id: int
    tool_id: int

    wear_percentage: float
    remaining_life_hours: float
    confidence_score: float

    prediction_status: str

    predicted_at: datetime


    class Config:
        from_attributes = True