from sqlalchemy.orm import Session

from app.models.machine_health_model import MachineHealth
from app.schemas.machine_health_schema import MachineHealthCreate


# GET ALL
def get_machine_health(db: Session):
    return db.query(MachineHealth).all()


# GET BY ID
def get_machine_health_by_id(
    db: Session,
    health_id: int
):
    return (
        db.query(MachineHealth)
        .filter(MachineHealth.health_id == health_id)
        .first()
    )


# CREATE
def create_machine_health(
    db: Session,
    health: MachineHealthCreate
):

    new_health = MachineHealth(
        **health.dict()
    )

    db.add(new_health)
    db.commit()
    db.refresh(new_health)

    return new_health


# UPDATE
def update_machine_health(
    db: Session,
    health_id: int,
    health: MachineHealthCreate
):

    existing_health = (
        db.query(MachineHealth)
        .filter(MachineHealth.health_id == health_id)
        .first()
    )

    if not existing_health:
        return None

    for key, value in health.dict().items():
        setattr(existing_health, key, value)

    db.commit()
    db.refresh(existing_health)

    return existing_health


# DELETE
def delete_machine_health(
    db: Session,
    health_id: int
):

    health = (
        db.query(MachineHealth)
        .filter(MachineHealth.health_id == health_id)
        .first()
    )

    if not health:
        return None

    db.delete(health)
    db.commit()

    return health