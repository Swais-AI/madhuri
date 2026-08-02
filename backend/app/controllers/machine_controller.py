from sqlalchemy.orm import Session

from app.models.machine_model import Machine
from app.schemas.machine_schema import MachineCreate
from fastapi import HTTPException


def get_machines(db: Session):
    return (
        db.query(Machine)
        .filter(Machine.record_status == "Active")
        .order_by(Machine.machine_id.asc())
        .all()
    )


def get_machine_by_id(db: Session, machine_id: int):
    return (
        db.query(Machine)
        .filter(
            Machine.machine_id == machine_id,
            Machine.record_status == "Active",
        )
        .first()
    )

def create_machine(db: Session, machine: MachineCreate):

    existing_machine = (
        db.query(Machine)
        .filter(Machine.machine_code == machine.machine_code)
        .first()
    )

    if existing_machine:
        raise HTTPException(
            status_code=400,
            detail="Machine code already exists."
        )

    db_machine = Machine(
        **machine.model_dump(),
        record_status="Active",
    )

    db.add(db_machine)
    db.commit()
    db.refresh(db_machine)

    return db_machine
def update_machine(
    db: Session,
    machine_id: int,
    machine: MachineCreate,
):
    db_machine = (
        db.query(Machine)
        .filter(
            Machine.machine_id == machine_id,
            Machine.record_status == "Active",
        )
        .first()
    )

    if not db_machine:
        return None

    existing_machine = (
        db.query(Machine)
        .filter(
            Machine.machine_code == machine.machine_code,
            Machine.machine_id != machine_id,
        )
        .first()
    )

    if existing_machine:
        raise HTTPException(
            status_code=400,
            detail="Machine code already exists.",
        )

    update_data = machine.model_dump()

    for key, value in update_data.items():
        setattr(db_machine, key, value)

    db.commit()
    db.refresh(db_machine)

    return db_machine


def delete_machine(db: Session, machine_id: int):
    db_machine = (
        db.query(Machine)
        .filter(
            Machine.machine_id == machine_id,
            Machine.record_status == "Active",
        )
        .first()
    )

    if not db_machine:
        return None

    db_machine.record_status = "Deleted"

    db.commit()
    db.refresh(db_machine)

    return db_machine