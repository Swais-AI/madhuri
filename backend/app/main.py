from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import student_routes
from .routes import teacher_routes
from .routes import dashboard_routes
from .routes import class_teachers
from .routes import headmaster_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_routes.router)
app.include_router(teacher_routes.router)
app.include_router(dashboard_routes.router)
app.include_router(class_teachers.router)
app.include_router(headmaster_routes.router)


@app.get("/")
def home():
    return {"message": "Backend running successfully"}