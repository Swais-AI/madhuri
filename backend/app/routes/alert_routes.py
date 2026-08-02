from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.controllers.alert_controller import (
    get_alerts,
    get_alert_by_id,
    update_alert_status
)

from app.schemas.alert_schema import (
    AlertResponse,
    AlertUpdate
)


router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)


# GET ALL
@router.get("/", response_model=list[AlertResponse])
def read_alerts(
    db: Session = Depends(get_db)
):

    return get_alerts(db)


# GET BY ID
@router.get("/{alert_id}", response_model=AlertResponse)
def read_alert(
    alert_id: int,
    db: Session = Depends(get_db)
):

    alert = get_alert_by_id(
        db,
        alert_id
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found"
        )

    return alert


# UPDATE STATUS
@router.put("/{alert_id}", response_model=AlertResponse)
def update_alert(
    alert_id: int,
    alert: AlertUpdate,
    db: Session = Depends(get_db)
):

    updated = update_alert_status(
        db,
        alert_id,
        alert
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Alert not found"
        )

    return updated