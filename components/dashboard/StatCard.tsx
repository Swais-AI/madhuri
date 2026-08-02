"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-slate-800/80 backdrop-blur rounded-xl border border-slate-700 p-5 shadow-lg hover:border-cyan-500/50 transition-all duration-300">
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>

          {description && (
            <p className="text-xs text-slate-400 mt-2">
              {description}
            </p>
          )}

          {trend && (
            <p className="text-sm text-cyan-400 mt-2">
              {trend}
            </p>
          )}
        </div>

        {icon && (
          <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 text-2xl">
            {icon}
          </div>
        )}
      </div>

    </div>
  );
}