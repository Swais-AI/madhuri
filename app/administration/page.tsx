"use client";

import { useState } from "react";

import MachinesTab from "@/components/administration/machines/MachinesTab";
import MachineTypesTab from "@/components/administration/machine-types/MachineTypesTab";
import ToolTypesTab from "@/components/administration/tool-types/ToolTypesTab";
import ToolsTab from "@/components/administration/tools/ToolsTab";

const tabs = [
  "Machine Types",
  "Machines",
  "Tool Types",
  "Tools",
];

export default function AdministrationPage() {
  const [activeTab, setActiveTab] = useState("Machines");

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Administration
        </h1>

        <p className="mt-2 text-slate-400">
          Manage users, machines, tools and system configuration.
        </p>
      </div>

      {/* Tabs */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-2 transition ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        {activeTab === "Machines" && <MachinesTab />}

        {activeTab === "Machine Types" && <MachineTypesTab />}

        {activeTab === "Tool Types" && <ToolTypesTab />}

        {activeTab === "Tools" && <ToolsTab />}

     
      </div>
    </div>
  );
}