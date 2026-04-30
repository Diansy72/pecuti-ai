"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Bell, ChevronRight, LogOut, User, Mail, ShieldCheck } from "lucide-react";
import SearchBar from "@/components/molecules/SearchBar";
import Avatar from "@/components/atoms/Avatar";

interface HeaderProps {
  breadcrumbs: { label: string; href?: string }[];
  isCollapsed: boolean;
}

const mockNotifications = [
  { id: 1, title: "Booking baru masuk", desc: "Toyota Avanza — 3 hari", time: "2 menit lalu", unread: true },
  { id: 2, title: "Kendaraan kembali", desc: "Honda Scoopy DK 9012 CC", time: "1 jam lalu", unread: true },
  { id: 3, title: "Email berhasil dikirim", desc: "Promo Akhir Tahun ke 150 pelanggan", time: "3 jam lalu", unread: false },
  { id: 4, title: "Paket tour baru dibuat", desc: "Jogja Heritage & Candi Tour", time: "Kemarin", unread: false },
];

export default function Header({ breadcrumbs, isCollapsed }: HeaderProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth");
      window.location.href = "/id/login";
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-[var(--header-height)] bg-white z-30",
        "flex items-center justify-between px-6 gap-4",
        "border-b border-[var(--border)]",
        "transition-sidebar",
        isCollapsed
          ? "left-[var(--sidebar-collapsed-width)]"
          : "left-[var(--sidebar-width)]"
      )}
    >
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight
                  size={14}
                  className="text-[var(--text-muted)]"
                />
              )}
              <span
                className={cn(
                  index === breadcrumbs.length - 1
                    ? "text-[var(--text-primary)] font-semibold"
                    : "text-[var(--text-secondary)]"
                )}
              >
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center max-w-lg">
        <SearchBar className="w-full" />
      </div>

      {/* Right: Notification + User */}
      <div className="flex items-center gap-4">
        {/* Notification Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className={cn(
              "relative p-2.5 rounded-[var(--radius-md)]",
              "text-[var(--text-secondary)] hover:bg-[var(--bg-main)] hover:text-[var(--text-primary)]",
              "transition-all duration-200 cursor-pointer"
            )}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {showNotif && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-[var(--radius-xl)] border border-[var(--border)] shadow-[var(--shadow-xl)] z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <h4 className="text-sm font-bold text-[var(--text-primary)]">Notifikasi</h4>
                <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-[var(--radius-full)]">
                  {mockNotifications.filter(n => n.unread).length} baru
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {mockNotifications.map(n => (
                  <div key={n.id} className={cn(
                    "px-4 py-3 border-b border-[var(--border-light)] last:border-0 hover:bg-[var(--bg-main)] transition-colors cursor-pointer",
                    n.unread && "bg-[var(--primary)]/[0.03]"
                  )}>
                    <div className="flex items-start gap-3">
                      {n.unread && <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />}
                      {!n.unread && <div className="w-2 h-2 rounded-full bg-transparent mt-1.5 shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{n.title}</p>
                        <p className="text-xs text-[var(--text-secondary)] truncate">{n.desc}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-[var(--border)] text-center">
                <button className="text-xs font-semibold text-[var(--primary)] hover:underline cursor-pointer">
                  Lihat Semua Notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-8 bg-[var(--border)]" />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Avatar name="Admin" size="md" />
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                Halo, Admin
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Selamat datang</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-[var(--radius-xl)] border border-[var(--border)] shadow-[var(--shadow-xl)] z-50 overflow-hidden">
              <div className="p-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <Avatar name="Admin" size="lg" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)]">Admin</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">admin@lagroupandika.com</p>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <div className="px-4 py-2.5 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <User size={16} />
                  <span>Super Admin</span>
                </div>
                <div className="px-4 py-2.5 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Mail size={16} />
                  <span className="truncate">admin@lagroupandika.com</span>
                </div>
                <div className="px-4 py-2.5 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <ShieldCheck size={16} />
                  <span>Role: Administrator</span>
                </div>
              </div>
              <div className="border-t border-[var(--border)] p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-[var(--radius-md)] transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
