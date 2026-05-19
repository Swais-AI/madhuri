from fastapi import APIRouter
from app.llm_analysis import student_llm_analysis

router = APIRouter(
    prefix="/llm",
    tags=["LLM"]
)

router.add_api_route(
    "/student/{student_id}",
    student_llm_analysis,
    methods=["GET"]
)