from sqlalchemy.orm import Session

from app.models.tool_wear_prediction_model import ToolWearPrediction


def generate_prediction(
    db: Session,
    machine_id: int,
    tool_id: int
):

    prediction = db.query(
        ToolWearPrediction
    ).filter(
        ToolWearPrediction.machine_id == machine_id,
        ToolWearPrediction.tool_id == tool_id
    ).order_by(
        ToolWearPrediction.prediction_id.desc()
    ).first()


    if prediction:

        return {
            "wear_percentage": prediction.wear_percentage,
            "remaining_life_hours": prediction.remaining_life_hours,
            "confidence_score": prediction.confidence_score,
            "prediction_status": prediction.prediction_status
        }


    return {
        "wear_percentage": 0,
        "remaining_life_hours": 0,
        "confidence_score": 0,
        "prediction_status": "Normal"
    }



def create_prediction(
    db: Session,
    prediction
):

    result = generate_prediction(
        db,
        prediction.machine_id,
        prediction.tool_id
    )


    db_prediction = ToolWearPrediction(

        machine_id=prediction.machine_id,

        tool_id=prediction.tool_id,

        wear_percentage=result["wear_percentage"],

        remaining_life_hours=result["remaining_life_hours"],

        confidence_score=result["confidence_score"],

        prediction_status=result["prediction_status"]

    )


    db.add(db_prediction)

    db.commit()

    db.refresh(db_prediction)

    return db_prediction



def get_predictions(db: Session):

    return db.query(
        ToolWearPrediction
    ).all()