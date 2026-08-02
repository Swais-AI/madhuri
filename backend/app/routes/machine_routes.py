from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.controllers.machine_controller import (
    get_machines,
    get_machine_by_id,
    create_machine,
    update_machine,
    delete_machine,
)

from app.schemas.machine_schema import (
    MachineCreate,
    MachineResponse,
)

router = APIRouter(
    prefix="/machines",
    tags=["Machines"],
)


@router.get("/", response_model=list[MachineResponse])
def read_machines(db: Session = Depends(get_db)):
    return get_machines(db)


@router.get("/{machine_id}", response_model=MachineResponse)
def read_machine(machine_id: int, db: Session = Depends(get_db)):
    machine = get_machine_by_id(db, machine_id)

    if not machine:
        raise HTTPException(
            status_code=404,
            detail="Machine not found",
        )

    return machine


@router.post("/", response_model=MachineResponse)
def add_machine(
    machine: MachineCreate,
    db: Session = Depends(get_db),
):
    return create_machine(db, machine)


@router.put("/{machine_id}", response_model=MachineResponse)
def edit_machine(
    machine_id: int,
    machine: MachineCreate,
    db: Session = Depends(get_db),
):
    updated = update_machine(
        db,
        machine_id,
        machine,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Machine not found",
        )

    return updated


@router.delete("/{machine_id}")
def remove_machine(
    machine_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_machine(
        db,
        machine_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Machine not found",
        )

    return {
        "message": "Machine deleted successfully",
        "machine_id": deleted.machine_id,
        "record_status": deleted.record_status,
    }