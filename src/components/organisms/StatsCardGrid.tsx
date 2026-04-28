"use client";

import React from "react";
import { cn } from "@/lib/cn";
import {
  TrendingUp,
  CalendarCheck,
  Car,
} from "lucide-react";
import { DashboardStat } from "@/types";

interface StatsCardGridProps {
  stats: DashboardStat[];
}

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={22} />,
  CalendarCheck: <CalendarCheck size={22} />,
  Car: <Car size={22} />,
};

export default function StatsCardGrid({ stats }: StatsCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            "bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6",
            "hover:shadow-[var(--shadow-md)] transition-all duration-300",
            "stat-card-animate opacity-0",
            "flex items-center justify-between"
          )}
        >
          <div>
            <p className="text-sm text-[var(--text-secondary)] mb-1.5">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </p>
          </div>
          <div
            className={cn(
              "w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center",
              stat.iconBg,
              stat.iconColor
            )}
          >
            {iconMap[stat.icon] || <TrendingUp size={22} />}
          </div>
        </div>
      ))}
    </div>
  );
}
