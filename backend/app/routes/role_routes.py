from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.controllers.role_controller import (
    get_roles,
    get_role_by_id,
    create_role,
    update_role,
    delete_role,
)
from app.schemas.role_schema import RoleCreate, RoleResponse

router = APIRouter(
    prefix="/roles",
    tags=["Roles"]
)


# Get All Roles
@router.get("/", response_model=list[RoleResponse])
def read_roles(db: Session = Depends(get_db)):
    return get_roles(db)


# Get Role By ID
@router.get("/{role_id}", response_model=RoleResponse)
def read_role(role_id: int, db: Session = Depends(get_db)):
    role = get_role_by_id(db, role_id)

    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    return role


# Create Role
@router.post("/", response_model=RoleResponse)
def add_role(role: RoleCreate, db: Session = Depends(get_db)):
    return create_role(db, role)


# Update Role
@router.put("/{role_id}", response_model=RoleResponse)
def edit_role(role_id: int, role: RoleCreate, db: Session = Depends(get_db)):
    updated_role = update_role(db, role_id, role)

    if not updated_role:
        raise HTTPException(status_code=404, detail="Role not found")

    return updated_role


# Delete Role
@router.delete("/{role_id}")
def remove_role(role_id: int, db: Session = Depends(get_db)):
    deleted_role = delete_role(db, role_id)

    if not deleted_role:
        raise HTTPException(status_code=404, detail="Role not found")

    return {"message": "Role deleted successfully"}