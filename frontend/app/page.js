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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function loadDashboardData() {
      setLoading(true);
      setError("");

      const results = await Promise.allSettled([
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

      const getData = (index, fallback) =>
        results[index]?.status === "fulfilled"
          ? results[index].value.data
          : fallback;

      setStudents(getData(0, []));
      setTeachers(getData(1, []));
      setProgressData(getData(2, []));
      setClassTeachers(getData(3, []));
      setPerformanceData(getData(4, []));
      setPieData(getData(5, []));
      setFunctionsData(getData(6, []));
      setToursData(getData(7, []));
      setDashboardSummary(getData(8, {}));
      setHeadmaster(getData(9, null));

      if (
        results.some((result) => result.status === "rejected")
      ) {
        setError(
          "Backend unavailable. Showing available UI."
        );
      }

      setLoading(false);
    }

    loadDashboardData();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.full_name
      ?.toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="main-content">
        <Topbar
          headmaster={headmaster}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        {error && (
          <div className="error-banner">{error}</div>
        )}

        {loading && (
          <div className="loading-text">
            Loading...
          </div>
        )}

        {activeTab === "dashboard" && (
          <DashboardSection
            dashboardSummary={dashboardSummary || {}}
            performanceData={performanceData || []}
            pieData={pieData || []}
          />
        )}

        {activeTab === "students" && (
          <StudentsSection
            students={filteredStudents || []}
          />
        )}

        {activeTab === "teachers" && (
          <TeachersSection
            teachers={teachers || []}
          />
        )}

        {activeTab === "progress" && (
          <ProgressSection
            progressData={progressData || []}
          />
        )}

        {activeTab === "functions" && (
          <FunctionsSection
            functionsData={functionsData || []}
          />
        )}

        {activeTab === "tours" && (
          <ToursSection toursData={toursData || []} />
        )}

        {activeTab === "classTeachers" && (
          <ClassTeachersSection
            classTeachers={classTeachers || []}
          />
        )}
      </div>
    </div>
  );
}