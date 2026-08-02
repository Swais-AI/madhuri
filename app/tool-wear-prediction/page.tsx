"use client";

import { useState } from "react";

import PredictionHeader from "@/components/tool-wear/PredictionHeader";
import PredictionForm from "@/components/tool-wear/PredictionForm";
import PredictionResult from "@/components/tool-wear/PredictionResult";
import PredictionHistoryTable from "@/components/tool-wear/PredictionHistoryTable";


export default function ToolWearPredictionPage() {

  const [prediction, setPrediction] = useState<any>(null);


  return (
    <div className="space-y-6">

      <PredictionHeader />


      <PredictionForm
        setPrediction={setPrediction}
      />


      <PredictionResult
        prediction={prediction}
      />


      <PredictionHistoryTable />

    </div>
  );
}