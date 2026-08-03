"use client";

import { useEffect, useState } from "react";
import AlertItem from "./AlertItem";
import AlertFilter from "./AlertFilter";
import api from "@/services/api";

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  async function fetchAlerts() {
    try {
      const response = await api.get("/alerts");

      setAlerts(response.data);
    } catch (error) {
      console.error("Failed to load alerts", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter((item) => item.severity === filter);

  return (
    <div
      className="
      bg-[#0f172a]
      rounded-2xl
      p-6
      border
      border-purple-500/20
      shadow-xl
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        mb-5
        border-b
        border-purple-500/30
        pb-4
        "
      >
        <h1
          className="
          text-xl
          font-bold
          text-white
          "
        >
          ALERTS
        </h1>
      </div>

      <AlertFilter
        selected={filter}
        setSelected={setFilter}
      />

      {loading ? (
        <p className="text-gray-400">
          Loading alerts...
        </p>
      ) : filteredAlerts.length === 0 ? (
        <p className="text-gray-400">
          No alerts available
        </p>
      ) : (
        filteredAlerts.map((alert) => (
          <AlertItem
            key={alert.alert_id}
            level={alert.severity}
            message={alert.message}
            action={alert.alert_status}
            time={new Date(alert.created_at).toLocaleTimeString()}
          />
        ))
      )}
    </div>
  );
}