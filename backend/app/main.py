from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.student_routes import router as student_router
from app.routes.teacher_routes import router as teacher_router
from app.routes.dashboard_routes import router as dashboard_router
from app.llm_analysis import router as llm_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "SGS School ERP Backend Running"}

app.include_router(student_router)
app.include_router(teacher_router)
app.include_router(dashboard_router)
app.include_router(llm_router)