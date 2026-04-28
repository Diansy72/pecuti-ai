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
  const chartRef = useRef<HTMLDivElement>(null);

  const data = activeRange === "weekly" ? weeklyData : monthlyData;

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [activeRange]);

  // Chart dimensions
  const chartWidth = 700;
  const chartHeight = 280;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 20;
  const paddingBottom = 40;

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  // Calculate scales
  const maxWebClicks = Math.max(...data.map((d) => d.webClicks));
  const maxBookings = Math.max(...data.map((d) => d.bookings));

  const yMaxLeft = Math.ceil(maxWebClicks / 1000) * 1000;
  const yMaxRight = Math.ceil(maxBookings / 1000) * 1000 || Math.ceil(maxBookings / 4) * 4;

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
  const yTicksLeft = 6;
  const yTicksRight = 6;
  const leftLabels = Array.from({ length: yTicksLeft }, (_, i) =>
    Math.round((yMaxLeft / (yTicksLeft - 1)) * i)
  );
  const rightLabels = Array.from({ length: yTicksRight }, (_, i) =>
    Math.round((yMaxRight / (yTicksRight - 1)) * i)
  );

  const formatK = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
    return n.toString();
  };

  return (
    <div
      ref={chartRef}
      className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Performance Overview
          </h2>
          <p className="text-xs text-[var(--accent)] mt-0.5">
            Web clicks & booking trends
          </p>
        </div>
        <div className="flex items-center gap-0 rounded-[var(--radius-md)] overflow-hidden">
          <button
            onClick={() => setActiveRange("weekly")}
            className={cn(
              "px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer",
              activeRange === "weekly"
                ? "toggle-btn-active"
                : "toggle-btn-inactive"
            )}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveRange("monthly")}
            className={cn(
              "px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer",
              activeRange === "monthly"
                ? "toggle-btn-active"
                : "toggle-btn-inactive"
            )}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B2A4A]" />
          <span className="text-xs text-[var(--text-secondary)]">Web Clicks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <span className="text-xs text-[var(--text-secondary)]">Bookings</span>
        </div>
      </div>

      {/* Chart SVG */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
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
                stroke="#F1F5F9"
                strokeWidth={1}
              />
            );
          })}

          {/* Y-axis left labels */}
          {leftLabels.map((val, i) => {
            const y = paddingTop + plotHeight - (i / (yTicksLeft - 1)) * plotHeight;
            return (
              <text
                key={`yl-${i}`}
                x={paddingLeft - 8}
                y={y + 4}
                textAnchor="end"
                fontSize={11}
                fill="#94A3B8"
                fontFamily="Plus Jakarta Sans"
              >
                {formatK(val)}
              </text>
            );
          })}

          {/* Y-axis right labels */}
          {rightLabels.map((val, i) => {
            const y = paddingTop + plotHeight - (i / (yTicksRight - 1)) * plotHeight;
            return (
              <text
                key={`yr-${i}`}
                x={chartWidth - paddingRight + 8}
                y={y + 4}
                textAnchor="start"
                fontSize={11}
                fill="#94A3B8"
                fontFamily="Plus Jakarta Sans"
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
                y={chartHeight - 8}
                textAnchor="middle"
                fontSize={11}
                fill="#94A3B8"
                fontFamily="Plus Jakarta Sans"
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
              stroke="#1B2A4A"
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
              stroke="#D4A843"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="chart-line-animate"
              style={{ animationDelay: "0.3s" }}
            />
          )}

          {/* Data points - Web Clicks */}
          {isVisible &&
            data.map((d, i) => {
              const x = paddingLeft + (i / (data.length - 1)) * plotWidth;
              const y =
                paddingTop +
                plotHeight -
                (d.webClicks / yMaxLeft) * plotHeight;
              return (
                <circle
                  key={`wc-${i}`}
                  cx={x}
                  cy={y}
                  r={3}
                  fill="#1B2A4A"
                  className="chart-line-animate"
                  style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                />
              );
            })}

          {/* Data points - Bookings */}
          {isVisible &&
            data.map((d, i) => {
              const x = paddingLeft + (i / (data.length - 1)) * plotWidth;
              const y =
                paddingTop +
                plotHeight -
                (d.bookings / yMaxRight) * plotHeight;
              return (
                <circle
                  key={`bk-${i}`}
                  cx={x}
                  cy={y}
                  r={3}
                  fill="#D4A843"
                  className="chart-line-animate"
                  style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                />
              );
            })}
        </svg>
      </div>
    </div>
  );
}
