import { Download } from "lucide-react";

export default function PredictionHistoryHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Prediction History
        </h1>

        <p className="mt-2 text-slate-400">
          View AI-generated tool wear prediction history.
        </p>
      </div>

      <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700 transition">
        <Download size={18} />
        Export History
      </button>
    </div>
  );
}