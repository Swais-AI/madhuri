"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardSection from "../components/DashboardSection";
import StudentsSection from "../components/StudentsSection";
import TeachersSection from "../components/TeachersSection";
import ProgressSection from "../components/ProgressSection";
import FunctionsSection from "../components/FunctionsSection";
import ToursSection from "../components/ToursSection";
import ClassTeachersSection from "../components/ClassTeachersSection";
import StudentLLMSection from "../components/StudentLLMSection";
const BASE_URL = "http://127.0.0.1:8000";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [classTeachers, setClassTeachers] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [functionsData, setFunctionsData] = useState([]);
  const [toursData, setToursData] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState({});

  useEffect(() => {
    axios.get(`${BASE_URL}/students`).then((res) => setStudents(res.data));
    axios.get(`${BASE_URL}/teachers`).then((res) => setTeachers(res.data));
    axios.get(`${BASE_URL}/progress`).then((res) => setProgressData(res.data));
    axios.get(`${BASE_URL}/class-teachers`).then((res) => setClassTeachers(res.data));
    axios.get(`${BASE_URL}/performance-chart`).then((res) => setPerformanceData(res.data));
    axios.get(`${BASE_URL}/pass-fail-chart`).then((res) => setPieData(res.data));
    axios.get(`${BASE_URL}/functions`).then((res) => setFunctionsData(res.data));
    axios.get(`${BASE_URL}/tours`).then((res) => setToursData(res.data));
    axios.get(`${BASE_URL}/dashboard-summary`).then((res) => setDashboardSummary(res.data));
  }, []);

  return (
    <div className="layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="main-content">
        <Topbar />

        {activeTab === "dashboard" && (
          <DashboardSection
            dashboardSummary={dashboardSummary}
            performanceData={performanceData}
            pieData={pieData}
          />
        )}

        {activeTab === "students" && <StudentsSection students={students} />}
        {activeTab === "studentLLM" && <StudentLLMSection />}
        {activeTab === "teachers" && <TeachersSection teachers={teachers} />}

        {activeTab === "progress" && <ProgressSection progressData={progressData} />}

        {activeTab === "functions" && <FunctionsSection functionsData={functionsData} />}

        {activeTab === "tours" && <ToursSection toursData={toursData} />}

        {activeTab === "classTeachers" && (
          <ClassTeachersSection classTeachers={classTeachers} />
        )}
      </div>
    </div>
  );
}
