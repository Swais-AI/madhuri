"use client";

import { useState } from "react";
import { createPrediction } from "@/services/predictionService";

export default function PredictionForm({ setPrediction }: any) {

  const [toolId, setToolId] = useState("");
  const [machineId, setMachineId] = useState("");
  const [loading, setLoading] = useState(false);


  const handlePredict = async () => {

    if (!toolId || !machineId) {
      alert("Please select Tool and Machine");
      return;
    }

  const predictionData = {
  machine_id: Number(machineId),
  tool_id: Number(toolId)
};


    try {

      setLoading(true);

      const response = await createPrediction(predictionData);
      setPrediction(response);

      console.log("Prediction created:", response);

      alert("Prediction created successfully");

    } catch (error) {

      console.error("Prediction failed:", error);
      alert("Prediction failed");

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Prediction Parameters
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">


        <select
          value={toolId}
          onChange={(e)=>setToolId(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        >
          <option value="">
            Select Tool
          </option>

          <option value="1">
            Tool 1
          </option>

          <option value="2">
            Tool 2
          </option>

          <option value="3">
            Tool 3
          </option>

        </select>



        <select
          value={machineId}
          onChange={(e)=>setMachineId(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        >

          <option value="">
            Select Machine
          </option>

          <option value="1">
            Machine 1
          </option>

          <option value="2">
            Machine 2
          </option>

          <option value="3">
            Machine 3
          </option>

        </select>



        <select
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        >

          <option>
            Select AI Model
          </option>

          <option>
            Tool Wear Model
          </option>

        </select>



        <button
          onClick={handlePredict}
          disabled={loading}
          className="rounded-xl bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700 transition"
        >
          {loading ? "Predicting..." : "Predict"}

        </button>


      </div>

    </div>
  );
}