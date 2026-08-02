from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.config.database import Base


class User(Base):
    __tablename__ = "mf_users"

    user_id = Column(Integer, primary_key=True, index=True)
    role_id = Column(Integer, ForeignKey("mf_roles.role_id"), nullable=False)

    employee_id = Column(String(30), unique=True, nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50))
    email = Column(String(120), unique=True, nullable=False)
    phone = Column(String(20))
    password_hash = Column(String)
    status = Column(String(20), default="Active")

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now())
    