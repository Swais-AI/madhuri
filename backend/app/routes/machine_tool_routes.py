from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models.machine_tool_model import MachineTool
from app.schemas.machine_tool_schema import (
    MachineToolCreate,
    MachineToolUpdate,
    MachineToolResponse,
)

router = APIRouter(
    prefix="/machine-tools",
    tags=["Machine Tools"]
)


# GET ALL MACHINE TOOLS
@router.get("/", response_model=list[MachineToolResponse])
def get_machine_tools(db: Session = Depends(get_db)):
    return db.query(MachineTool).all()


# GET SINGLE MACHINE TOOL
@router.get("/{machine_tool_id}", response_model=MachineToolResponse)
def get_machine_tool(machine_tool_id: int, db: Session = Depends(get_db)):
    machine_tool = db.query(MachineTool).filter(
        MachineTool.machine_tool_id == machine_tool_id
    ).first()

    if not machine_tool:
        raise HTTPException(
            status_code=404,
            detail="Machine Tool not found"
        )

    return machine_tool


# CREATE MACHINE TOOL
@router.post("/", response_model=MachineToolResponse)
def create_machine_tool(
    machine_tool: MachineToolCreate,
    db: Session = Depends(get_db)
):
    new_machine_tool = MachineTool(
        machine_id=machine_tool.machine_id,
        tool_id=machine_tool.tool_id,
        installation_date=machine_tool.installation_date,
        status=machine_tool.status
    )

    db.add(new_machine_tool)
    db.commit()
    db.refresh(new_machine_tool)

    return new_machine_tool


# UPDATE MACHINE TOOL
@router.put("/{machine_tool_id}", response_model=MachineToolResponse)
def update_machine_tool(
    machine_tool_id: int,
    machine_tool: MachineToolUpdate,
    db: Session = Depends(get_db)
):
    existing = db.query(MachineTool).filter(
        MachineTool.machine_tool_id == machine_tool_id
    ).first()

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Machine Tool not found"
        )

    if machine_tool.machine_id is not None:
        existing.machine_id = machine_tool.machine_id

    if machine_tool.tool_id is not None:
        existing.tool_id = machine_tool.tool_id

    if machine_tool.installation_date is not None:
        existing.installation_date = machine_tool.installation_date

    if machine_tool.status is not None:
        existing.status = machine_tool.status

    db.commit()
    db.refresh(existing)

    return existing


# DELETE MACHINE TOOL
@router.delete("/{machine_tool_id}")
def delete_machine_tool(
    machine_tool_id: int,
    db: Session = Depends(get_db)
):
    machine_tool = db.query(MachineTool).filter(
        MachineTool.machine_tool_id == machine_tool_id
    ).first()

    if not machine_tool:
        raise HTTPException(
            status_code=404,
            detail="Machine Tool not found"
        )

    db.delete(machine_tool)
    db.commit()

    return {
        "message": "Machine Tool deleted successfully"
    }