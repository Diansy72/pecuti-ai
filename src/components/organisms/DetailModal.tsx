"use client";

import React from "react";
import { X } from "lucide-react";

interface DetailItem {
  label: string;
  value: React.ReactNode;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: DetailItem[];
}

export default function DetailModal({ isOpen, onClose, title, items }: DetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[var(--radius-xl)] w-full max-w-lg p-6 mx-4 shadow-[var(--shadow-xl)] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-main)] transition-colors cursor-pointer"
          >
            <X size={20} className="text-[var(--text-secondary)]" />
          </button>
        </div>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider w-36 shrink-0 pt-0.5">
                {item.label}
              </span>
              <span className="text-sm text-[var(--text-primary)] flex-1">
                {item.value || "-"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-[var(--border)] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[var(--radius-md)] bg-[var(--bg-main)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
