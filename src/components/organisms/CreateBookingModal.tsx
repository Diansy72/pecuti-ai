"use client";

import React, { useState } from "react";
import { X, CalendarCheck } from "lucide-react";
import Button from "@/components/atoms/Button";
import { Vehicle } from "@/types";

interface CreateBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  onSubmit: (vehicleId: number, bookingData: { customerName: string; phone: string; startDate: string; endDate: string; notes: string }) => void;
}

export default function CreateBookingModal({ isOpen, onClose, vehicle, onSubmit }: CreateBookingModalProps) {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  if (!isOpen || !vehicle) return null;

  const handleSubmit = () => {
    if (!form.customerName || !form.startDate || !form.endDate) return;
    onSubmit(vehicle.id, form);
    setForm({ customerName: "", phone: "", startDate: "", endDate: "", notes: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[var(--radius-xl)] w-full max-w-md p-6 mx-4 shadow-[var(--shadow-xl)]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--primary)] text-white flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Create Booking</h3>
              <p className="text-xs text-[var(--text-secondary)]">{vehicle.name} — {vehicle.licensePlate}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-main)] cursor-pointer">
            <X size={20} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Customer Name</label>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              placeholder="Nama pelanggan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              placeholder="+62 812-xxxx-xxxx"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">End Date</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
              placeholder="Catatan tambahan..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[var(--border)]">
          <Button variant="secondary" onClick={onClose}>Batal</Button>
          <Button
            icon={<CalendarCheck size={16} />}
            onClick={handleSubmit}
            disabled={!form.customerName || !form.startDate || !form.endDate}
          >
            Create Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
