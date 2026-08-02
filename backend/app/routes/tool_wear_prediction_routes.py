from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.tool_wear_prediction_schema import (
    ToolWearPredictionCreate,
    ToolWearPredictionResponse
)

from app.controllers.tool_wear_prediction_controller import (
    create_prediction,
    get_predictions
)


router = APIRouter(
    prefix="/tool-wear-predictions",
    tags=["Tool Wear Prediction"]
)


@router.post(
    "/",
    response_model=ToolWearPredictionResponse
)
def add_prediction(
    prediction: ToolWearPredictionCreate,
    db: Session = Depends(get_db)
):

    return create_prediction(
        db,
        prediction
    )



@router.get(
    "/",
    response_model=list[ToolWearPredictionResponse]
)
def read_predictions(
    db: Session = Depends(get_db)
):

    return get_predictions(db)