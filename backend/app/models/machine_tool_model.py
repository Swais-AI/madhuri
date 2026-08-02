from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    ForeignKey,
    TIMESTAMP,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.config.database import Base


class MachineTool(Base):
    __tablename__ = "mf_machine_tools"

    machine_tool_id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    machine_id = Column(
        Integer,
        ForeignKey("mf_machines.machine_id"),
        nullable=False,
    )

    tool_id = Column(
        Integer,
        ForeignKey("mf_tools.tool_id"),
        nullable=False,
    )

    install_date = Column(
        Date,
        nullable=False,
    )

    remove_date = Column(
        Date,
        nullable=True,
    )

    tool_position = Column(
        String(50),
        nullable=True,
    )

    status = Column(
        String(20),
        nullable=False,
        default="Installed",
        server_default="Installed",
    )

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

    machine = relationship(
        "Machine",
        back_populates="machine_tools",
    )

    tool = relationship(
        "Tool",
        back_populates="machine_tools",
    )