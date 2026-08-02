from sqlalchemy import Column, Integer, ForeignKey, Numeric, String, TIMESTAMP
from sqlalchemy.sql import func

from app.config.database import Base


class ToolWearPrediction(Base):

    __tablename__ = "mf_tool_wear_predictions"

    prediction_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    machine_id = Column(
        Integer,
        ForeignKey("mf_machines.machine_id"),
        nullable=False
    )

    tool_id = Column(
        Integer,
        ForeignKey("mf_tools.tool_id"),
        nullable=False
    )

    wear_percentage = Column(
        Numeric(5,2)
    )

    remaining_life_hours = Column(
        Numeric(8,2)
    )

    confidence_score = Column(
        Numeric(5,2)
    )

    prediction_status = Column(
        String(20),
        default="Normal"
    )

    predicted_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )