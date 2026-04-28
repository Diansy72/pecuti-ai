"use client";

import React from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import StatsCardGrid from "@/components/organisms/StatsCardGrid";
import PerformanceChart from "@/components/organisms/PerformanceChart";
import RecentBookingsList from "@/components/organisms/RecentBookingsList";
import {
  dashboardStats,
  weeklyChartData,
  monthlyChartData,
  recentBookings,
} from "@/lib/data";

export default function DashboardPage() {
  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard" },
        { label: "Dashboard" },
      ]}
    >
      {/* Stats Cards */}
      <div className="mb-6">
        <StatsCardGrid stats={dashboardStats} />
      </div>

      {/* Performance Overview Chart */}
      <div className="mb-6">
        <PerformanceChart
          weeklyData={weeklyChartData}
          monthlyData={monthlyChartData}
        />
      </div>

      {/* Recent Bookings */}
      <div>
        <RecentBookingsList bookings={recentBookings} />
      </div>
    </DashboardLayout>
  );
}
