from sqlalchemy import Column, Integer, String, Date, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.config.database import Base


class Machine(Base):
    __tablename__ = "mf_machines"

    machine_id = Column(Integer, primary_key=True, index=True)

    machine_code = Column(String(50), unique=True, nullable=False)

    machine_name = Column(String(100), nullable=False)

    machine_type_id = Column(
        Integer,
        ForeignKey("mf_machine_types.machine_type_id"),
        nullable=False,
    )

    manufacturer = Column(String(100))
    model_number = Column(String(100))
    installation_date = Column(Date)
    location = Column(String(100))

    status = Column(
        String(20),
        nullable=False,
        default="Active",
        server_default="Active",
    )

    # Soft Delete
    record_status = Column(
        String(20),
        nullable=False,
        default="Active",
        server_default="Active",
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now(),
    )

    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now(),
    )

    machine_tools = relationship(
        "MachineTool",
        back_populates="machine",
    )

    health_records = relationship(
        "MachineHealth",
        back_populates="machine",
    )