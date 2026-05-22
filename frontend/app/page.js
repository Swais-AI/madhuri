"use client";

import { useEffect, useRef, useState } from "react";
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

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function HomePage() {
  const fetched = useRef(false);

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
  const [headmaster, setHeadmaster] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function loadDashboardData() {
      try {
        setLoading(true);
        setError("");

        const [
          studentsRes,
          teachersRes,
          progressRes,
          classTeachersRes,
          performanceRes,
          passFailRes,
          functionsRes,
          toursRes,
          summaryRes,
          headmasterRes,
        ] = await Promise.all([
          axios.get(`${BASE_URL}/students`),
          axios.get(`${BASE_URL}/teachers`),
          axios.get(`${BASE_URL}/progress`),
          axios.get(`${BASE_URL}/class-teachers`),
          axios.get(`${BASE_URL}/performance-chart`),
          axios.get(`${BASE_URL}/pass-fail-chart`),
          axios.get(`${BASE_URL}/functions`),
          axios.get(`${BASE_URL}/tours`),
          axios.get(`${BASE_URL}/dashboard-summary`),
          axios.get(`${BASE_URL}/headmaster`),
        ]);

        setStudents(studentsRes.data || []);
        setTeachers(teachersRes.data || []);
        setProgressData(progressRes.data || []);
        setClassTeachers(classTeachersRes.data || []);
        setPerformanceData(performanceRes.data || []);
        setPieData(passFailRes.data || []);
        setFunctionsData(functionsRes.data || []);
        setToursData(toursRes.data || []);
        setDashboardSummary(summaryRes.data || {});
        setHeadmaster(headmasterRes.data || null);
      } catch (err) {
        console.error("Dashboard API loading failed:", err);
        setError("Unable to load dashboard data. Please check backend API and routes.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.full_name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="main-content">
        <Topbar
          headmaster={headmaster}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        {error && <div className="error-banner">{error}</div>}
        {loading && <div className="loading-text">Loading dashboard...</div>}

        {!loading && activeTab === "dashboard" && (
          <DashboardSection
            dashboardSummary={dashboardSummary}
            performanceData={performanceData}
            pieData={pieData}
          />
        )}

        {!loading && activeTab === "students" && (
          <StudentsSection students={filteredStudents} />
        )}

        {!loading && activeTab === "teachers" && (
          <TeachersSection teachers={teachers} />
        )}

        {!loading && activeTab === "progress" && (
          <ProgressSection progressData={progressData} />
        )}

        {!loading && activeTab === "functions" && (
          <FunctionsSection functionsData={functionsData} />
        )}

        {!loading && activeTab === "tours" && (
          <ToursSection toursData={toursData} />
        )}

        {!loading && activeTab === "classTeachers" && (
          <ClassTeachersSection classTeachers={classTeachers} />
        )}
      </div>
    </div>
  );
}