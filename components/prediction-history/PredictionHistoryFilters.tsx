import { Search } from "lucide-react";

export default function PredictionHistoryFilters() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-3.5 text-slate-500"
        />

        <input
          placeholder="Search prediction..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none"
        />
      </div>

      <select className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white">
        <option>Machine</option>
      </select>

      <select className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white">
        <option>Tool</option>
      </select>

      <select className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white">
        <option>Health Status</option>
      </select>

      <input
        type="date"
        className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white"
      />

    </div>
  );
}