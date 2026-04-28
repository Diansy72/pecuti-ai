"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import NavItem from "@/components/molecules/NavItem";
import { sidebarNavItems } from "@/lib/data";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentPath: string;
}

export default function Sidebar({
  isCollapsed,
  onToggle,
  currentPath,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-[var(--primary)] z-40",
        "flex flex-col transition-sidebar",
        isCollapsed
          ? "w-[var(--sidebar-collapsed-width)]"
          : "w-[var(--sidebar-width)]"
      )}
    >
      {/* Logo Area */}
      <div
        className={cn(
          "flex items-center gap-3 px-5 py-6 border-b border-white/10",
          isCollapsed && "px-4 justify-center"
        )}
      >
        <div className="flex-shrink-0 w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center">
          <span className="text-[var(--primary-dark)] font-bold text-sm">
            LA
          </span>
        </div>
        {!isCollapsed && (
          <div className="min-w-0">
            <h1 className="text-white font-bold text-sm leading-tight truncate">
              LA Group and
            </h1>
            <p className="text-[var(--accent-light)] text-xs font-medium truncate">
              Andika Trans
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {sidebarNavItems.map((item) => (
          <NavItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={
              currentPath === item.href ||
              (item.href !== "/dashboard" &&
                currentPath.startsWith(item.href))
            }
            isCollapsed={isCollapsed}
            hasSubmenu={item.hasSubmenu}
          />
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-white/10 p-3 flex justify-center">
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-[var(--radius-lg)]",
            "text-[var(--text-sidebar)] hover:bg-white/8 hover:text-white",
            "transition-all duration-200 text-sm font-medium cursor-pointer",
            "justify-center w-fit",
            isCollapsed && "px-3"
          )}
        >
          {isCollapsed ? (
            <ChevronsRight size={20} />
          ) : (
            <>
              <ChevronsLeft size={20} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Version */}
      {!isCollapsed && (
        <div className="px-5 pb-4">
          <p className="text-[var(--text-sidebar)] text-xs opacity-50 text-center">
            LA Group v1.0
          </p>
        </div>
      )}
    </aside>
  );
}