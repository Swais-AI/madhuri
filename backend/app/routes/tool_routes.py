from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.controllers.tool_controller import (
    get_tools,
    get_tool_by_id,
    create_tool,
    update_tool,
    delete_tool,
)
from app.schemas.tool_schema import (
    ToolCreate,
    ToolUpdate,
    ToolResponse,
)

router = APIRouter(
    prefix="/tools",
    tags=["Tools"],
)


@router.get("/", response_model=list[ToolResponse])
def read_tools(
    db: Session = Depends(get_db),
):
    return get_tools(db)


@router.get("/{tool_id}", response_model=ToolResponse)
def read_tool(
    tool_id: int,
    db: Session = Depends(get_db),
):
    tool = get_tool_by_id(
        db,
        tool_id,
    )

    if not tool:
        raise HTTPException(
            status_code=404,
            detail="Tool not found or already deleted",
        )

    return tool


@router.post("/", response_model=ToolResponse)
def add_tool(
    tool: ToolCreate,
    db: Session = Depends(get_db),
):
    return create_tool(
        db,
        tool,
    )


@router.put("/{tool_id}", response_model=ToolResponse)
def edit_tool(
    tool_id: int,
    tool: ToolUpdate,
    db: Session = Depends(get_db),
):
    updated_tool = update_tool(
        db,
        tool_id,
        tool,
    )

    if not updated_tool:
        raise HTTPException(
            status_code=404,
            detail="Tool not found or already deleted",
        )

    return updated_tool


@router.delete("/{tool_id}")
def remove_tool(
    tool_id: int,
    db: Session = Depends(get_db),
):
    deleted_tool = delete_tool(
        db,
        tool_id,
    )

    if not deleted_tool:
        raise HTTPException(
            status_code=404,
            detail="Tool not found or already deleted",
        )

    return {
        "message": "Tool deleted successfully",
        "tool_id": deleted_tool.tool_id,
        "record_status": deleted_tool.record_status,
    }