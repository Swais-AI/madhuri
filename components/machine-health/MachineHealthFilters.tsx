import { Search } from "lucide-react";

export default function MachineHealthFilters() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-3.5 text-slate-500"
        />

        <input
          placeholder="Search machine..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none"
        />
      </div>

      <select className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white">
        <option>Status</option>
      </select>

      <select className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white">
        <option>Health</option>
      </select>

      <select className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white">
        <option>Plant</option>
      </select>

    </div>
  );
}