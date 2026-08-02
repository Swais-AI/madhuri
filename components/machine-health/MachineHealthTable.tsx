"use client";

import { Cpu } from "lucide-react";
import useDashboard from "@/hooks/useDashboard";

export default function MachineHealthTable() {
  const { health, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="p-8 text-center text-white">
        Loading Machine Health...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
      <table className="min-w-full">
        <thead className="bg-slate-800">
          <tr className="text-left text-slate-200">
            <th className="px-6 py-4">Health ID</th>
            <th className="px-6 py-4">Machine ID</th>
            <th className="px-6 py-4">Temperature (°C)</th>
            <th className="px-6 py-4">Vibration</th>
            <th className="px-6 py-4">Operating Hours</th>
            <th className="px-6 py-4">Health Score</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Checked At</th>
          </tr>
        </thead>

        <tbody>
          {health.length === 0 ? (
            <tr>
              <td colSpan={8}>
                <div className="flex flex-col items-center justify-center py-20">
                  <Cpu size={60} className="text-slate-600" />

                  <h2 className="mt-5 text-2xl font-semibold text-white">
                    No Machine Health Records
                  </h2>

                  <p className="mt-2 text-slate-400">
                    Register a machine to start monitoring its health.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            health.map((item: any) => (
              <tr
                key={item.health_id}
                className="border-t border-slate-800 hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 text-white">{item.health_id}</td>

                <td className="px-6 py-4 text-white">{item.machine_id}</td>

                <td className="px-6 py-4 text-white">
                  {item.temperature} °C
                </td>

                <td className="px-6 py-4 text-white">{item.vibration}</td>

                <td className="px-6 py-4 text-white">
                  {item.operating_hours}
                </td>

                <td className="px-6 py-4 font-bold text-green-400">
                  {item.health_score}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        item.health_status === "Healthy"
                          ? "bg-green-500/20 text-green-400"
                          : item.health_status === "Warning"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {item.health_status}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {new Date(item.checked_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}