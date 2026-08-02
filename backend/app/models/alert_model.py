from sqlalchemy import Column, Integer, String, ForeignKey, Text, TIMESTAMP
from sqlalchemy.sql import func

from app.config.database import Base


class Alert(Base):

    __tablename__ = "mf_alerts"

    alert_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    prediction_id = Column(
        Integer,
        ForeignKey("mf_tool_wear_predictions.prediction_id"),
        nullable=False
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

    alert_type = Column(
        String(50),
        nullable=False
    )

    severity = Column(
        String(20),
        default="Medium"
    )

    message = Column(
        Text,
        nullable=False
    )

    alert_status = Column(
        String(20),
        default="Open"
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )