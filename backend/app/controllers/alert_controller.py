from sqlalchemy.orm import Session

from app.models.alert_model import Alert
from app.schemas.alert_schema import AlertUpdate


# GET all alerts
def get_alerts(db: Session):

    return db.query(Alert).all()


# GET alert by id
def get_alert_by_id(
    db: Session,
    alert_id: int
):

    return db.query(Alert).filter(
        Alert.alert_id == alert_id
    ).first()


# UPDATE alert status
def update_alert_status(
    db: Session,
    alert_id: int,
    alert: AlertUpdate
):

    db_alert = db.query(Alert).filter(
        Alert.alert_id == alert_id
    ).first()

    if db_alert:

        db_alert.alert_status = alert.alert_status

        db.commit()
        db.refresh(db_alert)

    return db_alert