from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.controllers.machine_type_controller import (
    get_machine_types,
    get_machine_type_by_id,
    create_machine_type,
    update_machine_type,
    delete_machine_type,
)
from app.schemas.machine_type_schema import (
    MachineTypeCreate,
    MachineTypeResponse,
)

router = APIRouter(
    prefix="/machine-types",
    tags=["Machine Types"],
)


@router.get("/", response_model=list[MachineTypeResponse])
def read_machine_types(db: Session = Depends(get_db)):
    return get_machine_types(db)


@router.get("/{machine_type_id}", response_model=MachineTypeResponse)
def read_machine_type(
    machine_type_id: int,
    db: Session = Depends(get_db),
):
    machine_type = get_machine_type_by_id(
        db,
        machine_type_id,
    )

    if not machine_type:
        raise HTTPException(
            status_code=404,
            detail="Machine Type not found or already deleted",
        )

    return machine_type


@router.post("/", response_model=MachineTypeResponse)
def add_machine_type(
    machine_type: MachineTypeCreate,
    db: Session = Depends(get_db),
):
    return create_machine_type(
        db,
        machine_type,
    )


@router.put(
    "/{machine_type_id}",
    response_model=MachineTypeResponse,
)
def edit_machine_type(
    machine_type_id: int,
    machine_type: MachineTypeCreate,
    db: Session = Depends(get_db),
):
    updated = update_machine_type(
        db,
        machine_type_id,
        machine_type,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Machine Type not found or already deleted",
        )

    return updated


@router.delete("/{machine_type_id}")
def remove_machine_type(
    machine_type_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_machine_type(
        db,
        machine_type_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Machine Type not found or already deleted",
        )

    return {
        "message": "Machine Type deleted successfully",
        "machine_type_id": deleted.machine_type_id,
        "record_status": deleted.record_status,
    }