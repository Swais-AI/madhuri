"use client";

import {
  Search,
  Sparkles,
  Bot,
} from "lucide-react";

export default function AIRecommendationsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-white">
            AI Recommendations
          </h1>

          <p className="text-slate-400 mt-2 text-xl">
            Generate AI-powered maintenance recommendations.
          </p>
        </div>

        <button className="px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center gap-3 transition">
          <Sparkles size={22} />
          Generate Recommendation
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <select className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 text-white">
            <option>Select Machine</option>
          </select>

          <select className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 text-white">
            <option>Select Tool</option>
          </select>

          <select className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 text-white">
            <option>Priority</option>
          </select>

        </div>

      </div>

      {/* Result */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl min-h-[500px]">

        <div className="border-b border-slate-800 p-6">
          <h2 className="text-2xl font-semibold text-white">
            AI Recommendation Result
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center h-[420px]">

          <Bot
            size={90}
            className="text-slate-600 mb-6"
          />

          <h3 className="text-3xl font-bold text-white">
            No Recommendations Generated
          </h3>

          <p className="text-slate-400 mt-4 text-lg text-center max-w-xl">
            Select a machine and tool, then click
            <span className="text-violet-400 font-semibold">
              {" "}Generate Recommendation{" "}
            </span>
            to receive AI-based maintenance suggestions.
          </p>

        </div>

      </div>

    </div>
  );
}