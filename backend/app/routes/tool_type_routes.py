from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.controllers.tool_type_controller import (
    get_tool_types,
    get_tool_type_by_id,
    create_tool_type,
    update_tool_type,
    delete_tool_type,
)
from app.schemas.tool_type_schema import (
    ToolTypeCreate,
    ToolTypeResponse,
)

router = APIRouter(
    prefix="/tool-types",
    tags=["Tool Types"],
)


@router.get("/", response_model=list[ToolTypeResponse])
def read_tool_types(
    db: Session = Depends(get_db),
):
    return get_tool_types(db)


@router.get(
    "/{tool_type_id}",
    response_model=ToolTypeResponse,
)
def read_tool_type(
    tool_type_id: int,
    db: Session = Depends(get_db),
):
    tool_type = get_tool_type_by_id(
        db,
        tool_type_id,
    )

    if not tool_type:
        raise HTTPException(
            status_code=404,
            detail="Tool type not found or already deleted",
        )

    return tool_type


@router.post(
    "/",
    response_model=ToolTypeResponse,
)
def add_tool_type(
    tool_type: ToolTypeCreate,
    db: Session = Depends(get_db),
):
    return create_tool_type(
        db,
        tool_type,
    )


@router.put(
    "/{tool_type_id}",
    response_model=ToolTypeResponse,
)
def edit_tool_type(
    tool_type_id: int,
    tool_type: ToolTypeCreate,
    db: Session = Depends(get_db),
):
    updated = update_tool_type(
        db,
        tool_type_id,
        tool_type,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Tool type not found or already deleted",
        )

    return updated


@router.delete("/{tool_type_id}")
def remove_tool_type(
    tool_type_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_tool_type(
        db,
        tool_type_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Tool type not found or already deleted",
        )

    return {
        "message": "Tool type deleted successfully",
        "tool_type_id": deleted.tool_type_id,
        "record_status": deleted.record_status,
    }