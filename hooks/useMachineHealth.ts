"use client";

import { useEffect, useState } from "react";
import { getMachineHealth } from "@/services/machineHealthService";

export default function useMachineHealth() {
  const [health, setHealth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHealth();
  }, []);

  const loadHealth = async () => {
    try {
      setLoading(true);

      const data = await getMachineHealth();

      setHealth(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load machine health.");
    } finally {
      setLoading(false);
    }
  };

  return {
    health,
    loading,
    error,
    refresh: loadHealth,
  };
}