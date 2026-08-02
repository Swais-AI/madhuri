from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.sql import func

from app.config.database import Base


class MachineType(Base):
    __tablename__ = "mf_machine_types"

    machine_type_id = Column(Integer, primary_key=True, index=True)

    machine_type_name = Column(
        String(100),
        unique=True,
        nullable=False,
    )

    description = Column(Text)

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