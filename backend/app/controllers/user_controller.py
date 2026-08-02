from sqlalchemy.orm import Session

from app.models.user_model import User
from app.schemas.user_schema import UserCreate


# Get all users
def get_users(db: Session):
    return db.query(User).all()


# Get user by ID
def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.user_id == user_id).first()


# Create user
def create_user(db: Session, user: UserCreate):
    new_user = User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# Update user
def update_user(db: Session, user_id: int, user: UserCreate):
    db_user = db.query(User).filter(User.user_id == user_id).first()

    if not db_user:
        return None

    for key, value in user.model_dump().items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)

    return db_user


# Delete user
def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.user_id == user_id).first()

    if not db_user:
        return None

    db.delete(db_user)
    db.commit()

    return db_user