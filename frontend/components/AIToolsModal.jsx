"use client";

import "./AIToolsModal.css";
import { useState } from "react";
import axios from "axios";

export default function AIToolsModal({
  open,
  onClose,
  headmaster,
}) {
  if (!open) return null;

  const [selectedReport, setSelectedReport] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  const generateReport = async () => {
    if (!selectedReport) {
      alert("Please select a report.");
      return;
    }

    // Skip Analytics API for now
    if (selectedReport === "analytics") {
      setReport(
        "📊 Academic Analytics feature is currently unavailable."
      );
      return;
    }

    setLoading(true);

    try {
      const payload = {
        user_info: {
          name: headmaster?.name || "",
          email: headmaster?.email || "",
          role: "Headmaster",
        },
      };

      let response;

      // Assignment Report
      if (selectedReport === "assignment") {
        response = await api.post(
          "/headmaster/assignment-report",
          payload
        );

        setReport(response.data.report);
      }

      // Teacher Performance
      else if (selectedReport === "teacher") {
        response = await api.post(
          "/headmaster/teacher-performance",
          payload
        );

        setReport(response.data.report);
      }
    } catch (error) {
      console.error(error);
      setReport("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-modal-overlay">
      <div className="ai-modal">

        <div className="ai-modal-header">
          <h2>🤖 AI Tools</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <div className="ai-modal-body">

          <div className="ai-left">

            <button
              className={`ai-card ${
                selectedReport === "assignment" ? "active" : ""
              }`}
              onClick={() => setSelectedReport("assignment")}
            >
              📋 Assignment Report
            </button>

            <button
              className={`ai-card ${
                selectedReport === "teacher" ? "active" : ""
              }`}
              onClick={() => setSelectedReport("teacher")}
            >
              👨‍🏫 Teacher Performance
            </button>

            <button
              className={`ai-card ${
                selectedReport === "analytics" ? "active" : ""
              }`}
              onClick={() => setSelectedReport("analytics")}
            >
              📊 Academic Analytics
            </button>

            <button
              className="generate-btn"
              onClick={generateReport}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Report"}
            </button>

          </div>

          <div className="ai-right">

            <h3>Report Preview</h3>

            <div className="report-preview">
              <pre className="report-text">
                {report || "Select a report and click Generate Report."}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}