"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import Button from "@/components/atoms/Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Hapus",
  message = "Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[var(--radius-xl)] w-full max-w-sm p-6 mx-4 shadow-[var(--shadow-xl)]">
        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-2">{message}</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-5 py-2.5 rounded-[var(--radius-md)] bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
