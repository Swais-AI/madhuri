import { Activity } from "lucide-react";

export default function ToolWearTrend() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[350px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Tool Wear Trend
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            AI prediction trend over time
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
          <Activity className="text-violet-400" size={20} />
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center h-[240px] border-2 border-dashed border-slate-700 rounded-xl">
        <Activity className="text-slate-600" size={50} />

        <h3 className="mt-5 text-lg font-semibold text-white">
          No Prediction Data
        </h3>

        <p className="text-slate-400 text-sm mt-2 text-center max-w-sm">
          Tool wear prediction trends will appear here after AI predictions
          are generated.
        </p>
      </div>
    </div>
  );
}