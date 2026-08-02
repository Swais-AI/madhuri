from sqlalchemy import Column, Integer, ForeignKey, DECIMAL, String, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.config.database import Base


class MachineHealth(Base):

    __tablename__ = "mf_machine_health"

    health_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    machine_id = Column(
        Integer,
        ForeignKey("mf_machines.machine_id"),
        nullable=False
    )

    health_score = Column(
        DECIMAL(5,2),
        nullable=True
    )

    temperature = Column(
        DECIMAL(6,2),
        nullable=True
    )

    vibration = Column(
        DECIMAL(6,2),
        nullable=True
    )

    operating_hours = Column(
        Integer,
        nullable=True
    )

    health_status = Column(
        String(20),
        default="Good"
    )

    checked_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )


    machine = relationship(
        "Machine",
        back_populates="health_records"
    )