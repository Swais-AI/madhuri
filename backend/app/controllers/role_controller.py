from sqlalchemy.orm import Session
from app.models.role_model import Role
from app.schemas.role_schema import RoleCreate

# Get all roles
def get_roles(db: Session):
    return db.query(Role).all()

# Get role by ID
def get_role_by_id(db: Session, role_id: int):
    return db.query(Role).filter(Role.role_id == role_id).first()

# Create role
def create_role(db: Session, role: RoleCreate):
    new_role = Role(**role.model_dump())
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return new_role

# Update role
def update_role(db: Session, role_id: int, role: RoleCreate):
    db_role = db.query(Role).filter(Role.role_id == role_id).first()

    if not db_role:
        return None

    db_role.role_name = role.role_name
    db_role.description = role.description

    db.commit()
    db.refresh(db_role)

    return db_role

# Delete role
def delete_role(db: Session, role_id: int):
    role = db.query(Role).filter(Role.role_id == role_id).first()

    if not role:
        return None

    db.delete(role)
    db.commit()

    return role