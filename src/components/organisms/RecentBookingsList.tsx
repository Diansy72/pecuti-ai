"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { RecentBooking } from "@/types";
import { ArrowRight } from "lucide-react";

interface RecentBookingsListProps {
  bookings: RecentBooking[];
}

export default function RecentBookingsList({
  bookings,
}: RecentBookingsListProps) {
  const displayedBookings = bookings.slice(0, 4);

  return (
    <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          Recent Bookings
        </h2>
        <a
          href="/id/dashboard/pricelist"
          className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </a>
      </div>
      <div className="space-y-0">
        {displayedBookings.map((booking) => (
          <div
            key={booking.id}
            className={cn(
              "flex items-center justify-between py-4 px-3 -mx-3 rounded-[var(--radius-lg)] booking-item",
              "border-b border-[var(--border-light)] last:border-b-0"
            )}
          >
            <div className="flex items-center gap-3">
              {/* Avatar circle */}
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {booking.initial}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {booking.vehicleName}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {booking.licensePlate} · {booking.vehicleType === "car" ? "Car" : "Motorcycle"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {booking.duration}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {booking.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
