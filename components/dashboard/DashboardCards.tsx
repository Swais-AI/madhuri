"use client";

import StatCard from "@/components/dashboard/StatCard";
import useDashboard from "@/hooks/useDashboard";

import {
  Cpu,
  Wrench,
  Activity,
  BrainCircuit,
  AlertTriangle,
  ClipboardCheck,
} from "lucide-react";

export default function DashboardCards() {
  const {
    machines,
    tools,
    health,
    predictions,
    alerts,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-400">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        {error}
      </div>
    );
  }

  const averageHealth =
    health.length > 0
      ? (
          health.reduce(
            (sum: number, item: any) => sum + (item.health_score || 0),
            0
          ) / health.length
        ).toFixed(1)
      : "0";

  const criticalAlerts = alerts.filter(
    (alert: any) =>
      alert.severity?.toLowerCase() === "critical"
  ).length;

  const maintenanceDue = health.filter((item: any) =>
    ["warning", "critical"].includes(
      item.health_status?.toLowerCase()
    )
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

      <StatCard
        title="Active Machines"
        value={machines.length}
        description="Registered Machines"
        trend=""
        icon={<Cpu />}
      />

      <StatCard
        title="Active Tools"
        value={tools.length}
        description="Registered Tools"
        trend=""
        icon={<Wrench />}
      />

      <StatCard
        title="Tool Health"
        value={`${averageHealth}%`}
        description="Average Health Score"
        trend=""
        icon={<Activity />}
      />

      <StatCard
        title="Predictions"
        value={predictions.length}
        description="Prediction Records"
        trend=""
        icon={<BrainCircuit />}
      />

      <StatCard
        title="Critical Alerts"
        value={criticalAlerts}
        description="Need Immediate Action"
        trend=""
        icon={<AlertTriangle />}
      />

      <StatCard
        title="Maintenance Due"
        value={maintenanceDue}
        description="Machines Requiring Maintenance"
        trend=""
        icon={<ClipboardCheck />}
      />

    </div>
  );
}