from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.config.database import Base


class ToolType(Base):
    __tablename__ = "mf_tool_types"

    tool_type_id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    tool_type_name = Column(
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

    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now(),
    )

    tools = relationship(
        "Tool",
        back_populates="tool_type",
    )