from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    TIMESTAMP,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.config.database import Base


class Tool(Base):
    __tablename__ = "mf_tools"

    tool_id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    tool_type_id = Column(
        Integer,
        ForeignKey("mf_tool_types.tool_type_id"),
        nullable=False,
    )

    tool_code = Column(
        String(30),
        unique=True,
        nullable=False,
    )

    tool_name = Column(
        String(100),
        nullable=False,
    )

    manufacturer = Column(
        String(100),
        nullable=True,
    )

    expected_life_hours = Column(
        Integer,
        nullable=False,
    )

    current_life_hours = Column(
        Integer,
        nullable=False,
        default=0,
        server_default="0",
    )

    tool_status = Column(
        String(20),
        nullable=False,
        default="Available",
        server_default="Available",
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

    tool_type = relationship(
        "ToolType",
        back_populates="tools",
    )

    machine_tools = relationship(
        "MachineTool",
        back_populates="tool",
    )