"use client";

import { useEffect, useState } from "react";
import {
  getMachines,
} from "@/services/machineService";

export default function useMachines() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMachines = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMachines();

      setMachines(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load machines.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMachines();
  }, []);

  return {
    machines,
    loading,
    error,
    refresh: loadMachines,
  };
}