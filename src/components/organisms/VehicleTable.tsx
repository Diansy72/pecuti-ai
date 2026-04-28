"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { Eye, Pencil, Trash2, Car, Bike } from "lucide-react";
import Badge from "@/components/atoms/Badge";
import IconButton from "@/components/atoms/IconButton";
import { Vehicle } from "@/types";
import { formatCurrency } from "@/lib/data";

interface VehicleTableProps {
  vehicles: Vehicle[];
  className?: string;
}

export default function VehicleTable({
  vehicles,
  className,
}: VehicleTableProps) {
  const columns = [
    "ID",
    "Image",
    "Vehicle Name",
    "Plate Number",
    "Category",
    "Price/Day",
    "Status",
    "Action",
  ];

  return (
    <div
      className={cn(
        "bg-white border border-[var(--border)] rounded-b-[var(--radius-xl)] rounded-t-none",
        "overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {columns.map((col) => (
                <th
                  key={col}
                  className={cn(
                    "px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider",
                    "text-[var(--text-secondary)] bg-[var(--bg-main)]/50"
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr
                key={vehicle.id}
                className={cn(
                  "border-b border-[var(--border-light)] table-row-hover",
                  index % 2 === 1 && "bg-[#FAFBFC]"
                )}
              >
                {/* ID */}
                <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                  {vehicle.id}
                </td>

                {/* Image */}
                <td className="px-5 py-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center",
                      "bg-[var(--primary)] text-white"
                    )}
                  >
                    {vehicle.type === "car" ? (
                      <Car size={18} />
                    ) : (
                      <Bike size={18} />
                    )}
                  </div>
                </td>

                {/* Name */}
                <td className="px-5 py-4">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {vehicle.name}
                  </span>
                </td>

                {/* Plate */}
                <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                  {vehicle.licensePlate}
                </td>

                {/* Category */}
                <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                  {vehicle.category}
                </td>

                {/* Price */}
                <td className="px-5 py-4 text-sm font-medium text-[var(--text-primary)]">
                  {formatCurrency(vehicle.pricePerDay)}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <Badge status={vehicle.status === "rented" ? "booked" : vehicle.status} />
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <IconButton
                      variant="info"
                      icon={<Eye size={16} />}
                      tooltip="View details"
                    />
                    <IconButton
                      variant="warning"
                      icon={<Pencil size={16} />}
                      tooltip="Edit vehicle"
                    />
                    <IconButton
                      variant="danger"
                      icon={<Trash2 size={16} />}
                      tooltip="Delete vehicle"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
