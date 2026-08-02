"use client";

import {
  LayoutDashboard,
  Wrench,
  Cpu,
  BrainCircuit,
  History,
  Bell,
  Shield,
} from "lucide-react";
import Link from "next/link";
const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    name: "Tool Wear Prediction",
    icon: Wrench,
    href: "/tool-wear-prediction",
  },
  {
    name: "Machine Health",
    icon: Cpu,
    href: "/machine-health",
  },
  {
    name: "AI Recommendations",
    icon: BrainCircuit,
    href: "/ai-recommendations",
  },
  {
    name: "Prediction History",
    icon: History,
    href: "/prediction-history",
  },
 {
  name: "Alerts",
  icon: Bell,
  href: "/alerts",
},
{
  name: "Administration",
  icon: Shield,
  href: "/administration",
},

];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-slate-950 text-white border-r border-slate-800">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-violet-400">
          Tool Wear AI
        </h1>
        <p className="text-sm text-slate-400">
          Smart Manufacturing
        </p>
      </div>

      {/* Menu */}
      <nav className="mt-6 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
           <Link
  key={item.name}
  href={item.href}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-violet-600 hover:text-white transition-all duration-300 mb-2"
>
  <Icon size={20} />
  <span>{item.name}</span>
</Link>
          );
        })}
      </nav>
    </aside>
  );
}