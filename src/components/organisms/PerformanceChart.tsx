"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { ChartDataPoint } from "@/types";

interface PerformanceChartProps {
  weeklyData: ChartDataPoint[];
  monthlyData: ChartDataPoint[];
}

export default function PerformanceChart({
  weeklyData,
  monthlyData,
}: PerformanceChartProps) {
  const [activeRange, setActiveRange] = useState<"weekly" | "monthly">("weekly");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const data = activeRange === "weekly" ? weeklyData : monthlyData;

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [activeRange]);

  // Use a wider aspect ratio (4:1) so it doesn't grow too tall on large screens
  const chartWidth = 1200;
  const chartHeight = 300;
  const paddingLeft = 50;
  const paddingRight = 45; // increased padding for right numbers
  const paddingTop = 20;
  const paddingBottom = 40;

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  // Calculate scales
  const maxWebClicks = Math.max(...data.map((d) => d.webClicks));
  const maxBookings = Math.max(...data.map((d) => d.bookings));

  const yMaxLeft = Math.ceil(maxWebClicks / 1000) * 1000 || 6000;
  // Ensure we get clean numbers on the right side (e.g. 4000 instead of 3800)
  const yMaxRight = maxBookings > 100 
    ? Math.ceil(maxBookings / 1000) * 1000 
    : Math.max(Math.ceil(maxBookings / 4) * 4, 16);

  // Generate path points
  const getPath = (
    values: number[],
    yMax: number
  ): string => {
    const points = values.map((val, i) => {
      const x = paddingLeft + (i / (values.length - 1)) * plotWidth;
      const y = paddingTop + plotHeight - (val / yMax) * plotHeight;
      return { x, y };
    });

    if (points.length < 2) return "";

    // Smooth curve using cubic bezier
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
      const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
      path += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return path;
  };

  const webClicksPath = getPath(
    data.map((d) => d.webClicks),
    yMaxLeft
  );
  const bookingsPath = getPath(
    data.map((d) => d.bookings),
    yMaxRight
  );

  // Y-axis labels
  const yTicksLeft = 5;
  const yTicksRight = 5;
  const leftLabels = Array.from({ length: yTicksLeft }, (_, i) =>
    Math.round((yMaxLeft / (yTicksLeft - 1)) * i)
  );
  const rightLabels = Array.from({ length: yTicksRight }, (_, i) =>
    Math.round((yMaxRight / (yTicksRight - 1)) * i)
  );

  const colors = {
    webClicks: "#007AFF", // Blue
    bookings: "#FFB800",  // Yellow
  };

  return (
    <div
      ref={chartRef}
      className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">
            Performance Overview
          </h2>
          <p className="text-sm text-[#007AFF] mt-0.5 font-medium">
            Web clicks & booking trends
          </p>
        </div>
        <div className="flex items-center border border-[#E2E8F0] rounded-lg p-0.5">
          <button
            onClick={() => setActiveRange("weekly")}
            className={cn(
              "px-5 py-1.5 text-xs font-bold rounded-md transition-all duration-200 cursor-pointer",
              activeRange === "weekly"
                ? "bg-[#007AFF] text-white shadow-sm"
                : "bg-transparent text-[#64748B] hover:text-[#1E293B]"
            )}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveRange("monthly")}
            className={cn(
              "px-5 py-1.5 text-xs font-bold rounded-md transition-all duration-200 cursor-pointer",
              activeRange === "monthly"
                ? "bg-[#007AFF] text-white shadow-sm"
                : "bg-transparent text-[#64748B] hover:text-[#1E293B]"
            )}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full relative">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Grid lines */}
          {leftLabels.map((_, i) => {
            const y = paddingTop + plotHeight - (i / (yTicksLeft - 1)) * plotHeight;
            return (
              <line
                key={`grid-${i}`}
                x1={paddingLeft}
                y1={y}
                x2={chartWidth - paddingRight}
                y2={y}
                stroke="#E2E8F0"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Y-axis left labels */}
          {leftLabels.map((val, i) => {
            const y = paddingTop + plotHeight - (i / (yTicksLeft - 1)) * plotHeight;
            return (
              <text
                key={`yl-${i}`}
                x={paddingLeft - 12}
                y={y + 4}
                textAnchor="end"
                fontSize={12}
                fill="#94A3B8"
                fontFamily="inherit"
              >
                {val}
              </text>
            );
          })}

          {/* Y-axis right labels */}
          {rightLabels.map((val, i) => {
            const y = paddingTop + plotHeight - (i / (yTicksRight - 1)) * plotHeight;
            return (
              <text
                key={`yr-${i}`}
                x={chartWidth - paddingRight + 12}
                y={y + 4}
                textAnchor="start"
                fontSize={12}
                fill="#94A3B8"
                fontFamily="inherit"
              >
                {val}
              </text>
            );
          })}

          {/* X-axis labels */}
          {data.map((d, i) => {
            const x = paddingLeft + (i / (data.length - 1)) * plotWidth;
            return (
              <text
                key={`xl-${i}`}
                x={x}
                y={chartHeight - 12}
                textAnchor="middle"
                fontSize={12}
                fill="#94A3B8"
                fontFamily="inherit"
              >
                {d.label}
              </text>
            );
          })}

          {/* Web Clicks line */}
          {isVisible && (
            <path
              d={webClicksPath}
              fill="none"
              stroke={colors.webClicks}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="chart-line-animate"
            />
          )}

          {/* Bookings line */}
          {isVisible && (
            <path
              d={bookingsPath}
              fill="none"
              stroke={colors.bookings}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="chart-line-animate"
              style={{ animationDelay: "0.2s" }}
            />
          )}

          {/* Data points - Web Clicks */}
          {isVisible &&
            data.map((d, i) => {
              const x = paddingLeft + (i / (data.length - 1)) * plotWidth;
              const y = paddingTop + plotHeight - (d.webClicks / yMaxLeft) * plotHeight;
              const isHovered = hoveredIndex === i;
              return (
                <circle
                  key={`wc-${i}`}
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill="#ffffff"
                  stroke={colors.webClicks}
                  strokeWidth={2}
                  className="chart-line-animate transition-all duration-200"
                  style={{ animationDelay: `${0.4 + i * 0.05}s` }}
                />
              );
            })}

          {/* Data points - Bookings */}
          {isVisible &&
            data.map((d, i) => {
              const x = paddingLeft + (i / (data.length - 1)) * plotWidth;
              const y = paddingTop + plotHeight - (d.bookings / yMaxRight) * plotHeight;
              const isHovered = hoveredIndex === i;
              return (
                <circle
                  key={`bk-${i}`}
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill="#ffffff"
                  stroke={colors.bookings}
                  strokeWidth={2}
                  className="chart-line-animate transition-all duration-200"
                  style={{ animationDelay: `${0.6 + i * 0.05}s` }}
                />
              );
            })}

          {/* Hover interaction areas */}
          {data.map((_, i) => {
            const x = paddingLeft + (i / (data.length - 1)) * plotWidth;
            const segmentWidth = plotWidth / (data.length - 1);
            return (
              <rect
                key={`hover-${i}`}
                x={x - segmentWidth / 2}
                y={0}
                width={segmentWidth}
                height={chartHeight}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(i)}
                className="cursor-pointer"
              />
            );
          })}
        </svg>

        {/* Tooltip Overlay */}
        {hoveredIndex !== null && (
          <div
            className="absolute bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-[#E2E8F0] p-4 pointer-events-none z-10 min-w-[140px] transform -translate-x-1/2 -translate-y-[110%]"
            style={{
              left: `${( (paddingLeft + (hoveredIndex / (data.length - 1)) * plotWidth) / chartWidth ) * 100}%`,
              top: `${( (paddingTop + plotHeight - (data[hoveredIndex].webClicks / yMaxLeft) * plotHeight) / chartHeight ) * 100}%`,
              transition: 'left 0.15s ease-out, top 0.15s ease-out'
            }}
          >
            <p className="text-sm font-bold text-[#1E293B] mb-3">{data[hoveredIndex].label}</p>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#007AFF]">
                Web Clicks : {data[hoveredIndex].webClicks}
              </p>
              <p className="text-xs font-semibold text-[#FFB800]">
                Bookings : {data[hoveredIndex].bookings}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#007AFF]" />
          <span className="text-xs font-semibold text-[#64748B]">Web Clicks</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FFB800]" />
          <span className="text-xs font-semibold text-[#64748B]">Bookings</span>
        </div>
      </div>
    </div>
  );
}
