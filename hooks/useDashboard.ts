"use client";

import { useEffect, useState } from "react";
import {
  getMachines,
  getTools,
  getMachineHealth,
  getPredictions,
  getAlerts,
} from "@/services/dashboardService";

export default function useDashboard() {
  const [machines, setMachines] = useState([]);
  const [tools, setTools] = useState([]);
  const [health, setHealth] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

const loadDashboard = async () => {
  try {
    setLoading(true);
    setError("");

    const results = await Promise.allSettled([
      getMachines(),
      getTools(),
      getMachineHealth(),
      getPredictions(),
      getAlerts(),
    ]);

    const [
      machinesResult,
      toolsResult,
      healthResult,
      predictionsResult,
      alertsResult,
    ] = results;


    if (machinesResult.status === "fulfilled") {
      setMachines(machinesResult.value);
    } else {
      console.error("Machines API failed", machinesResult.reason);
    }


    if (toolsResult.status === "fulfilled") {
      setTools(toolsResult.value);
    } else {
      console.error("Tools API failed", toolsResult.reason);
    }


    if (healthResult.status === "fulfilled") {
      setHealth(healthResult.value);
    } else {
      console.error("Machine Health API failed", healthResult.reason);
    }


    if (predictionsResult.status === "fulfilled") {
      setPredictions(predictionsResult.value);
    } else {
      console.error("Predictions API failed", predictionsResult.reason);
    }


    if (alertsResult.status === "fulfilled") {
      setAlerts(alertsResult.value);
    } else {
      console.error("Alerts API failed", alertsResult.reason);
    }


  } catch (err) {
    console.error("Dashboard Error:", err);
    setError("Unable to load dashboard data.");

  } finally {
    setLoading(false);
  }
};
  return {
    machines,
    tools,
    health,
    predictions,
    alerts,
    loading,
    error,
    refresh: loadDashboard,
  };
}