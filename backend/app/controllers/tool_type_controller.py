from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.tool_type_model import ToolType
from app.schemas.tool_type_schema import ToolTypeCreate


def get_tool_types(db: Session):
    return (
        db.query(ToolType)
        .filter(ToolType.record_status == "Active")
        .order_by(ToolType.tool_type_id.asc())
        .all()
    )


def get_tool_type_by_id(
    db: Session,
    tool_type_id: int,
):
    return (
        db.query(ToolType)
        .filter(
            ToolType.tool_type_id == tool_type_id,
            ToolType.record_status == "Active",
        )
        .first()
    )


def create_tool_type(
    db: Session,
    tool_type: ToolTypeCreate,
):
    existing_tool_type = (
        db.query(ToolType)
        .filter(
            ToolType.tool_type_name
            == tool_type.tool_type_name
        )
        .first()
    )

    if existing_tool_type:
        raise HTTPException(
            status_code=400,
            detail="Tool type name already exists.",
        )

    db_tool_type = ToolType(
        **tool_type.model_dump(),
        record_status="Active",
    )

    db.add(db_tool_type)
    db.commit()
    db.refresh(db_tool_type)

    return db_tool_type


def update_tool_type(
    db: Session,
    tool_type_id: int,
    tool_type: ToolTypeCreate,
):
    db_tool_type = (
        db.query(ToolType)
        .filter(
            ToolType.tool_type_id == tool_type_id,
            ToolType.record_status == "Active",
        )
        .first()
    )

    if not db_tool_type:
        return None

    existing_tool_type = (
        db.query(ToolType)
        .filter(
            ToolType.tool_type_name
            == tool_type.tool_type_name,
            ToolType.tool_type_id != tool_type_id,
        )
        .first()
    )

    if existing_tool_type:
        raise HTTPException(
            status_code=400,
            detail="Tool type name already exists.",
        )

    update_data = tool_type.model_dump()

    for key, value in update_data.items():
        setattr(db_tool_type, key, value)

    db.commit()
    db.refresh(db_tool_type)

    return db_tool_type


def delete_tool_type(
    db: Session,
    tool_type_id: int,
):
    db_tool_type = (
        db.query(ToolType)
        .filter(
            ToolType.tool_type_id == tool_type_id,
            ToolType.record_status == "Active",
        )
        .first()
    )

    if not db_tool_type:
        return None

    db_tool_type.record_status = "Deleted"

    db.commit()
    db.refresh(db_tool_type)

    return db_tool_type