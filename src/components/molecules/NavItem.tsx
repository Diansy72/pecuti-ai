"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import {
  LayoutDashboard,
  ClipboardList,
  Globe,
  Map,
  FileText,
  Bell,
  ChevronDown,
} from "lucide-react";

interface NavItemProps {
  label: string;
  href: string;
  icon: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  hasSubmenu?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  ClipboardList: <ClipboardList size={20} />,
  Globe: <Globe size={20} />,
  Map: <Map size={20} />,
  FileText: <FileText size={20} />,
  Bell: <Bell size={20} />,
};

export default function NavItem({
  label,
  href,
  icon,
  isActive = false,
  isCollapsed = false,
  hasSubmenu = false,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] mx-3 mb-1",
        "transition-all duration-200 ease-out group relative",
        "text-sm font-medium",
        isActive
          ? "bg-[var(--accent)] text-white shadow-[0_2px_8px_rgba(212,168,67,0.3)]"
          : "text-[var(--text-sidebar)] hover:bg-white/8 hover:text-white",
        isCollapsed && "justify-center px-3"
      )}
    >
      <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
        {iconMap[icon] || <LayoutDashboard size={20} />}
      </span>
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {hasSubmenu && (
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform duration-200",
                isActive && "rotate-180"
              )}
            />
          )}
        </>
      )}
      {isCollapsed && (
        <div
          className={cn(
            "absolute left-full ml-2 px-3 py-1.5 rounded-[var(--radius-md)]",
            "bg-[var(--primary-dark)] text-white text-xs font-medium whitespace-nowrap",
            "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
            "transition-all duration-200 z-50",
            "shadow-[var(--shadow-lg)]"
          )}
        >
          {label}
        </div>
      )}
    </Link>
  );
}
