"use client";

import { Bell, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function TopNavbar() {
  const [today, setToday] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setToday(
        now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      );

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-8 py-5">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back,
        </h1>

        <p className="mt-1 text-slate-400">
          Manufacturing AI System
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Date & Time */}
        <div className="hidden text-right lg:block">
          <p className="text-sm font-medium text-white">
            {today}
          </p>

          <p className="text-xs text-slate-400">
            {time}
          </p>
        </div>

        {/* Notification */}
        <button className="relative rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:border-violet-500">
          <Bell className="text-white" size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <button className="rounded-xl border border-slate-800 bg-slate-900 p-2 transition hover:border-violet-500">
          <UserCircle className="text-white" size={28} />
        </button>
      </div>
    </header>
  );
}