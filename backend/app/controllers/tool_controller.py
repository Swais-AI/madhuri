from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.tool_model import Tool
from app.schemas.tool_schema import (
    ToolCreate,
    ToolUpdate,
)


def get_tools(db: Session):
    return (
        db.query(Tool)
        .filter(Tool.record_status == "Active")
        .order_by(Tool.tool_id.asc())
        .all()
    )


def get_tool_by_id(
    db: Session,
    tool_id: int,
):
    return (
        db.query(Tool)
        .filter(
            Tool.tool_id == tool_id,
            Tool.record_status == "Active",
        )
        .first()
    )


def create_tool(
    db: Session,
    tool: ToolCreate,
):
    existing_tool = (
        db.query(Tool)
        .filter(
            Tool.tool_code == tool.tool_code
        )
        .first()
    )

    if existing_tool:
        raise HTTPException(
            status_code=400,
            detail="Tool code already exists.",
        )

    db_tool = Tool(
        **tool.model_dump(),
        record_status="Active",
    )

    db.add(db_tool)
    db.commit()
    db.refresh(db_tool)

    return db_tool


def update_tool(
    db: Session,
    tool_id: int,
    tool: ToolUpdate,
):
    db_tool = (
        db.query(Tool)
        .filter(
            Tool.tool_id == tool_id,
            Tool.record_status == "Active",
        )
        .first()
    )

    if not db_tool:
        return None

    update_data = tool.model_dump(
        exclude_unset=True
    )

    if "tool_code" in update_data:
        existing_tool = (
            db.query(Tool)
            .filter(
                Tool.tool_code
                == update_data["tool_code"],
                Tool.tool_id != tool_id,
            )
            .first()
        )

        if existing_tool:
            raise HTTPException(
                status_code=400,
                detail="Tool code already exists.",
            )

    for key, value in update_data.items():
        setattr(db_tool, key, value)

    db.commit()
    db.refresh(db_tool)

    return db_tool


def delete_tool(
    db: Session,
    tool_id: int,
):
    db_tool = (
        db.query(Tool)
        .filter(
            Tool.tool_id == tool_id,
            Tool.record_status == "Active",
        )
        .first()
    )

    if not db_tool:
        return None

    db_tool.record_status = "Deleted"

    db.commit()
    db.refresh(db_tool)

    return db_tool