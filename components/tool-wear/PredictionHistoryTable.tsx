"use client";

import { History } from "lucide-react";
import { useEffect, useState } from "react";
import { getPredictions } from "@/services/predictionService";

export default function PredictionHistoryTable() {

  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    try {
      const data = await getPredictions();
      setPredictions(data);
    } catch (error) {
      console.error("Failed to fetch predictions", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <table className="w-full">

        <thead className="bg-slate-800">
          <tr className="text-left text-slate-200">
            <th className="px-6 py-4">Prediction ID</th>
            <th className="px-6 py-4">Tool</th>
            <th className="px-6 py-4">Machine</th>
            <th className="px-6 py-4">Wear %</th>
            <th className="px-6 py-4">Health</th>
            <th className="px-6 py-4">Prediction Date</th>
          </tr>
        </thead>


        <tbody>

          {loading && (
            <tr>
              <td colSpan={6}>
                <div className="py-20 text-center text-white">
                  Loading predictions...
                </div>
              </td>
            </tr>
          )}


          {!loading && predictions.length === 0 && (
            <tr>
              <td colSpan={6}>
                <div className="flex flex-col items-center justify-center py-20">

                  <History
                    size={60}
                    className="text-slate-600"
                  />

                  <h2 className="mt-5 text-2xl font-semibold text-white">
                    No Predictions Available
                  </h2>

                  <p className="mt-2 text-slate-400">
                    Run your first AI prediction to view prediction history.
                  </p>

                </div>
              </td>
            </tr>
          )}


{predictions.map((item) => (
  <tr 
    key={item.prediction_id}
    className="border-t border-slate-800 text-slate-300"
  >

    <td className="px-6 py-4">
      {item.prediction_id}
    </td>

    <td className="px-6 py-4">
      {item.tool_id}
    </td>

    <td className="px-6 py-4">
      {item.machine_id}
    </td>

    <td className="px-6 py-4">
      {item.wear_percentage}%
    </td>

    <td className="px-6 py-4">
      {item.prediction_status}
    </td>

    <td className="px-6 py-4">
      {new Date(item.predicted_at).toLocaleDateString()}
    </td>

  </tr>
))}


        </tbody>

      </table>

    </div>
  );
}