"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardSection from "../components/DashboardSection";
import StudentsSection from "../components/StudentsSection";
import TeachersSection from "../components/TeachersSection";
import ProgressSection from "../components/ProgressSection";
import NotificationsSection from "../components/NotificationsSection";
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
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [classTeachers, setClassTeachers] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [functionsData, setFunctionsData] = useState([]);
  const [toursData, setToursData] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState({});
  const [headmaster, setHeadmaster] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function loadDashboardData() {
      setLoading(true);

      const results = await Promise.allSettled([
        axios.get(`${BASE_URL}/students`),
        axios.get(`${BASE_URL}/teachers`),
        axios.get(`${BASE_URL}/progress`),
        axios.get(`${BASE_URL}/notifications`),
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
      const notificationData = getData(3, []);

setNotifications(notificationData);

setUnreadCount(
  notificationData.filter((item) => item.is_read === false).length
);
      setClassTeachers(getData(4, []));
      setPerformanceData(getData(5, []));
      setPieData(getData(6, []));
      setFunctionsData(getData(7, []));
      setToursData(getData(8, []));
      setDashboardSummary(getData(9, {}));
      setHeadmaster(getData(10, null));

      setLoading(false);
    }

    loadDashboardData();
  }, []);
const searchItems = (items, keys) => {
  if (!searchText.trim()) return items || [];

  const search = searchText.trim().toLowerCase();

  return (items || []).filter((item) =>
    keys.some((key) => {
      const value = String(item?.[key] || "").trim().toLowerCase();
      return value.includes(search);
    })
  );
};

const handleTabChange = async (tab) => {
  setActiveTab(tab);

  if (tab === "notifications") {
    await axios.put(`${BASE_URL}/notifications/mark-read`);

    setUnreadCount(0);
  }
};

  return (
    <div className="layout">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      <div className="main-content">
        <Topbar
          headmaster={headmaster}
          searchText={searchText}
          setSearchText={setSearchText}
          notificationCount={unreadCount}

        />

        {loading && <div className="loading-text">Loading...</div>}

        {activeTab === "dashboard" && (
          <DashboardSection
            dashboardSummary={dashboardSummary || {}}
            performanceData={performanceData || []}
            pieData={pieData || []}
          />
        )}
        {activeTab === "students" && (
        <StudentsSection
        students={students}
        searchText={searchText}
  />
)}
        {activeTab === "teachers" && (
          <TeachersSection
            teachers={searchItems(teachers, [
              "full_name",
              "subject_name",
              "role",
              "email_id",
              "phone",
            ])}
          />
        )}

        {activeTab === "progress" && (
          <ProgressSection
            progressData={searchItems(progressData, [
              "full_name",
              "exam_name",
              "subject_name",
              "grade",
              "remarks",
            ])}
          />
        )}

        {activeTab === "notifications" && (
          <NotificationsSection
            notifications={searchItems(notifications, [
              "notice_title",
              "notice_text",
              "applicable_class",
            ])}
          />
        )}

        {activeTab === "functions" && (
          <FunctionsSection
            functionsData={searchItems(functionsData, [
              "function_name",
              "coordinator_name",
              "status",
              "description",
            ])}
          />
        )}

        {activeTab === "tours" && (
          <ToursSection
            toursData={searchItems(toursData, [
              "tour_name",
              "location_name",
              "incharge_name",
              "status",
            ])}
          />
        )}

        {activeTab === "classTeachers" && (
          <ClassTeachersSection
            classTeachers={searchItems(classTeachers, [
              "class_name",
              "section_name",
              "academic_year",
              "class_teacher_name",
              "teacher_email",
              "teacher_mobile",
            ])}
          />
        )}
      </div>
    </div>
  );
}