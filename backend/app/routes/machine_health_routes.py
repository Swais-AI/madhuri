from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.machine_health_schema import (
    MachineHealthCreate,
    MachineHealthResponse
)

from app.controllers.machine_health_controller import (
    get_machine_health,
    get_machine_health_by_id,
    create_machine_health,
    update_machine_health,
    delete_machine_health
)


router = APIRouter(
    prefix="/machine-health",
    tags=["Machine Health"]
)


@router.get("/", response_model=list[MachineHealthResponse])
def read_machine_health(
    db: Session = Depends(get_db)
):
    return get_machine_health(db)



@router.get("/{health_id}", response_model=MachineHealthResponse)
def read_machine_health_by_id(
    health_id: int,
    db: Session = Depends(get_db)
):

    health = get_machine_health_by_id(
        db,
        health_id
    )

    if not health:
        raise HTTPException(
            status_code=404,
            detail="Machine health not found"
        )

    return health



@router.post("/", response_model=MachineHealthResponse)
def create_health(
    health: MachineHealthCreate,
    db: Session = Depends(get_db)
):

    return create_machine_health(
        db,
        health
    )



@router.put("/{health_id}", response_model=MachineHealthResponse)
def update_health(
    health_id: int,
    health: MachineHealthCreate,
    db: Session = Depends(get_db)
):

    updated = update_machine_health(
        db,
        health_id,
        health
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Machine health not found"
        )

    return updated



@router.delete("/{health_id}")
def delete_health(
    health_id: int,
    db: Session = Depends(get_db)
):

    deleted = delete_machine_health(
        db,
        health_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Machine health not found"
        )

    return {
        "message": "Machine health deleted successfully"
    }