from pydantic import BaseModel, Field
from typing import Literal


# =========================
# USER INFO (COMMON MODEL)
# =========================
class UserInfo(BaseModel):
    name: str = Field(default="")
    email: str = Field(default="")
    role: Literal["Headmaster", "Teacher", "Admin"] = "Headmaster"


# =========================
# 1. ASSIGNMENT REPORT
# =========================
class AssignmentReportRequest(BaseModel):
    user_info: UserInfo


# =========================
# 2. ACADEMIC ANALYTICS
# =========================
class AcademicAnalyticsRequest(BaseModel):
    target_name: str = Field(..., min_length=1, max_length=100)
    target_type: Literal["student", "class"]
    scope: Literal["single_subject", "all_subjects"]
    user_info: UserInfo


# =========================
# 3. TEACHER PERFORMANCE
# =========================
class TeacherPerformanceRequest(BaseModel):
    user_info: UserInfo


# =========================
# 4. TRANSLATE
# =========================
from typing import Union, List

class TranslateRequest(BaseModel):
    text: Union[str, List[str]]
    target_language: str = Field(..., min_length=2, max_length=50)
    user_info: UserInfo