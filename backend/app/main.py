from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.config.database import engine, Base

# Import models
import os
from app.models.role_model import Role
from app.models.user_model import User
from app.models.machine_model import Machine
from app.models.tool_type_model import ToolType
from app.models.tool_model import Tool
from app.models.machine_tool_model import MachineTool
from app.models.tool_wear_prediction_model import ToolWearPrediction
from app.models.alert_model import Alert

print("Loaded tables:", list(Base.metadata.tables.keys()))


# Import routers
from app.routes.role_routes import router as role_router
from app.routes.user_routes import router as user_router
from app.routes.machine_type_routes import router as machine_type_router
from app.routes.machine_routes import router as machine_router
from app.routes.tool_type_routes import router as tool_type_router
from app.routes.tool_routes import router as tool_router
from app.routes.machine_tool_routes import router as machine_tool_router
from app.routes import machine_health_routes
from app.routes import tool_wear_prediction_routes
from app.routes import alert_routes


app = FastAPI(
    title="Tool Wear Prediction API",
    version="1.0.0"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL"),
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Routers
app.include_router(role_router)
app.include_router(user_router)
app.include_router(machine_type_router)
app.include_router(machine_router)
app.include_router(tool_type_router)
app.include_router(tool_router)
app.include_router(machine_tool_router)

app.include_router(machine_health_routes.router)
app.include_router(tool_wear_prediction_routes.router)
app.include_router(alert_routes.router)


@app.get("/")
def root():
    return {
        "message": "Manufacturing Tool Wear Prediction Backend is Running"
    }


@app.get("/db-test")
def db_test():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "Database Connected Successfully"
        }

    except Exception as e:
        return {
            "status": "Connection Failed",
            "error": str(e)
        }