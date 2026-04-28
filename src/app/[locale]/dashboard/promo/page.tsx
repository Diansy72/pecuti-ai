"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import Button from "@/components/atoms/Button";
import { cn } from "@/lib/cn";
import {
  Send,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Plus,
  Eye,
  Trash2,
} from "lucide-react";
import { mockBroadcasts, mockCustomers } from "@/lib/data";
import { EmailBroadcast } from "@/types";

export default function PromoNotifManagement() {
  const [broadcasts, setBroadcasts] = useState<EmailBroadcast[]>(mockBroadcasts);
  const [activeTab, setActiveTab] = useState<"compose" | "history" | "customers">("compose");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSend = () => {
    setShowConfirm(true);
  };

  const confirmSend = () => {
    setIsSending(true);
    // Simulate sending
    setTimeout(() => {
      const newBroadcast: EmailBroadcast = {
        id: `em-${Date.now()}`,
        subject,
        body,
        recipientCount: mockCustomers.length,
        sentAt: new Date().toISOString(),
        status: "sent",
      };
      setBroadcasts((prev) => [newBroadcast, ...prev]);
      setSubject("");
      setBody("");
      setIsSending(false);
      setShowConfirm(false);
      setActiveTab("history");
    }, 1500);
  };

  const handleSaveDraft = () => {
    const draft: EmailBroadcast = {
      id: `em-${Date.now()}`,
      subject,
      body,
      recipientCount: 0,
      sentAt: "",
      status: "draft",
    };
    setBroadcasts((prev) => [draft, ...prev]);
    setSubject("");
    setBody("");
  };

  const handleDeleteBroadcast = (id: string) => {
    setBroadcasts((prev) => prev.filter((b) => b.id !== id));
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle size={14} className="text-green-500" />;
      case "draft":
        return <FileText size={14} className="text-amber-500" />;
      case "failed":
        return <AlertCircle size={14} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Promo & Notif" },
      ]}
    >
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Email Broadcasting
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Kirim email promo dan notifikasi ke pelanggan terdaftar
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[var(--bg-main)] rounded-[var(--radius-lg)] p-1 mb-6 w-fit">
        {[
          { id: "compose" as const, label: "Compose", icon: <Mail size={14} /> },
          { id: "history" as const, label: "History", icon: <Clock size={14} /> },
          { id: "customers" as const, label: "Customers", icon: <Users size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-5 py-2 rounded-[var(--radius-md)] text-sm font-semibold cursor-pointer",
              "transition-all duration-200 ease-out",
              activeTab === tab.id
                ? "bg-[var(--primary)] text-white shadow-[var(--shadow-sm)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Compose Tab */}
      {activeTab === "compose" && (
        <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--primary)] text-white flex items-center justify-center">
              <Mail size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Compose Email
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Akan dikirim ke {mockCustomers.length} pelanggan terdaftar
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                placeholder="Masukkan subjek email..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Message Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
                placeholder="Tulis isi pesan promo..."
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <Button
                variant="secondary"
                icon={<FileText size={16} />}
                onClick={handleSaveDraft}
                disabled={!subject && !body}
              >
                Save Draft
              </Button>
              <Button
                icon={<Send size={16} />}
                onClick={handleSend}
                disabled={!subject || !body}
              >
                Send Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {["Subject", "Recipients", "Status", "Sent At", "Action"].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] bg-[var(--bg-main)]/50"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {broadcasts.map((broadcast, index) => (
                  <tr
                    key={broadcast.id}
                    className={cn(
                      "border-b border-[var(--border-light)] table-row-hover",
                      index % 2 === 1 && "bg-[#FAFBFC]"
                    )}
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {broadcast.subject}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5">
                        {broadcast.body}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                      {broadcast.recipientCount > 0
                        ? `${broadcast.recipientCount} emails`
                        : "-"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-full)] text-xs font-semibold",
                          broadcast.status === "sent"
                            ? "bg-[var(--status-available-bg)] text-green-700"
                            : broadcast.status === "draft"
                            ? "bg-[var(--status-service-bg)] text-amber-700"
                            : "bg-[var(--status-booked-bg)] text-red-700"
                        )}
                      >
                        {statusIcon(broadcast.status)}
                        {broadcast.status.charAt(0).toUpperCase() +
                          broadcast.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                      {broadcast.sentAt
                        ? new Date(broadcast.sentAt).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-[var(--radius-md)] text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBroadcast(broadcast.id)}
                          className="p-2 rounded-[var(--radius-md)] text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customers Tab */}
      {activeTab === "customers" && (
        <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {["Name", "Email", "Phone", "Total Bookings", "Registered"].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] bg-[var(--bg-main)]/50"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {mockCustomers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className={cn(
                      "border-b border-[var(--border-light)] table-row-hover",
                      index % 2 === 1 && "bg-[#FAFBFC]"
                    )}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                      {customer.email}
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                      {customer.phone}
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-[var(--text-primary)]">
                      {customer.totalBookings}
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                      {new Date(customer.registeredAt).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Send Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop bg-black/50">
          <div className="bg-white rounded-[var(--radius-xl)] w-full max-w-md p-6 mx-4 modal-content shadow-[var(--shadow-xl)]">
            <div className="text-center mb-5">
              <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-3">
                <Send size={24} className="text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Konfirmasi Kirim Email
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                Email akan dikirim ke{" "}
                <strong>{mockCustomers.length} pelanggan</strong> terdaftar.
                Yakin ingin melanjutkan?
              </p>
            </div>
            <div className="bg-[var(--bg-main)] rounded-[var(--radius-lg)] p-4 mb-5">
              <p className="text-xs text-[var(--text-secondary)] mb-1">Subject:</p>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {subject}
              </p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowConfirm(false)}
              >
                Batal
              </Button>
              <Button
                icon={<Send size={16} />}
                onClick={confirmSend}
                isLoading={isSending}
              >
                {isSending ? "Mengirim..." : "Kirim Sekarang"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
