from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.machine_type_model import MachineType
from app.schemas.machine_type_schema import MachineTypeCreate


def get_machine_types(db: Session):
    return (
        db.query(MachineType)
        .filter(MachineType.record_status == "Active")
        .order_by(MachineType.machine_type_id.asc())
        .all()
    )


def get_machine_type_by_id(
    db: Session,
    machine_type_id: int,
):
    return (
        db.query(MachineType)
        .filter(
            MachineType.machine_type_id == machine_type_id,
            MachineType.record_status == "Active",
        )
        .first()
    )


def create_machine_type(
    db: Session,
    machine_type: MachineTypeCreate,
):
    existing_machine_type = (
        db.query(MachineType)
        .filter(
            MachineType.machine_type_name
            == machine_type.machine_type_name
        )
        .first()
    )

    if existing_machine_type:
        raise HTTPException(
            status_code=400,
            detail="Machine type name already exists.",
        )

    new_machine_type = MachineType(
        **machine_type.model_dump(),
        record_status="Active",
    )

    db.add(new_machine_type)
    db.commit()
    db.refresh(new_machine_type)

    return new_machine_type


def update_machine_type(
    db: Session,
    machine_type_id: int,
    machine_type: MachineTypeCreate,
):
    db_machine_type = (
        db.query(MachineType)
        .filter(
            MachineType.machine_type_id == machine_type_id,
            MachineType.record_status == "Active",
        )
        .first()
    )

    if not db_machine_type:
        return None

    duplicate_machine_type = (
        db.query(MachineType)
        .filter(
            MachineType.machine_type_name
            == machine_type.machine_type_name,
            MachineType.machine_type_id
            != machine_type_id,
        )
        .first()
    )

    if duplicate_machine_type:
        raise HTTPException(
            status_code=400,
            detail="Machine type name already exists.",
        )

    update_data = machine_type.model_dump()

    for key, value in update_data.items():
        setattr(db_machine_type, key, value)

    db.commit()
    db.refresh(db_machine_type)

    return db_machine_type


def delete_machine_type(
    db: Session,
    machine_type_id: int,
):
    db_machine_type = (
        db.query(MachineType)
        .filter(
            MachineType.machine_type_id == machine_type_id,
            MachineType.record_status == "Active",
        )
        .first()
    )

    if not db_machine_type:
        return None

    db_machine_type.record_status = "Deleted"

    db.commit()
    db.refresh(db_machine_type)

    return db_machine_type