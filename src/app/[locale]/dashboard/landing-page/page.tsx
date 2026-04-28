"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import Button from "@/components/atoms/Button";
import { cn } from "@/lib/cn";
import {
  Plus,
  Pencil,
  Trash2,
  ImageIcon,
  X,
} from "lucide-react";
import { mockDestinations, mockHeroContent } from "@/lib/data";
import { Destination } from "@/types";

export default function LandingPageManagement() {
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [heroContent] = useState(mockHeroContent);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formTitleEn, setFormTitleEn] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDescEn, setFormDescEn] = useState("");

  const openAddModal = () => {
    setFormTitle("");
    setFormTitleEn("");
    setFormDesc("");
    setFormDescEn("");
    setEditingDest(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (dest: Destination) => {
    setFormTitle(dest.title);
    setFormTitleEn(dest.titleEn || "");
    setFormDesc(dest.description);
    setFormDescEn(dest.descriptionEn || "");
    setEditingDest(dest);
    setIsAddModalOpen(true);
  };

  const handleSave = () => {
    if (editingDest) {
      setDestinations((prev) =>
        prev.map((d) =>
          d.id === editingDest.id
            ? {
                ...d,
                title: formTitle,
                titleEn: formTitleEn,
                description: formDesc,
                descriptionEn: formDescEn,
              }
            : d
        )
      );
    } else {
      const newDest: Destination = {
        id: `dest-${Date.now()}`,
        title: formTitle,
        titleEn: formTitleEn,
        description: formDesc,
        descriptionEn: formDescEn,
        imageUrl: "",
      };
      setDestinations((prev) => [...prev, newDest]);
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Landing Page" },
      ]}
    >
      {/* Hero Section Preview/Editor */}
      <div className="bg-[var(--primary)] rounded-[var(--radius-xl)] p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-2xl font-bold text-white mb-2">
            {heroContent.title}
          </h1>
          <p className="text-sm text-[var(--text-sidebar)] mb-6 leading-relaxed">
            {heroContent.subtitle}
          </p>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-[var(--radius-lg)] px-5 py-3">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold">
              H
            </div>
            <span className="text-white text-sm font-medium">
              {heroContent.featuredVehicle}
            </span>
          </div>
        </div>
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-64 h-full opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="150" cy="100" r="120" fill="white" />
          </svg>
        </div>
      </div>

      {/* Recommended Destinations */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Recommended Destinations
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              {destinations.length} destinations
            </p>
          </div>
          <Button
            icon={<Plus size={18} />}
            onClick={openAddModal}
          >
            Add Destination
          </Button>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] overflow-hidden destination-card"
            >
              {/* Image */}
              <div className="h-40 bg-[var(--bg-main)] relative flex items-center justify-center">
                {dest.imageUrl ? (
                  <div className="w-full h-full bg-gradient-to-br from-[#1B2A4A]/20 to-[#1B2A4A]/5 flex items-center justify-center">
                    <ImageIcon size={32} className="text-[var(--text-muted)]" />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#E2E8F0] to-[#F1F5F9] flex items-center justify-center">
                    <ImageIcon size={32} className="text-[var(--text-muted)]" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {dest.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                  {dest.description}
                </p>
              </div>

              {/* Dark Footer with actions */}
              <div className="bg-[var(--primary)] px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-white/70 font-medium">
                  {dest.titleEn || "No English Title"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(dest)}
                    className="p-1.5 rounded-[var(--radius-sm)] text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(dest.id)}
                    className="p-1.5 rounded-[var(--radius-sm)] text-white/70 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop bg-black/50">
          <div className="bg-white rounded-[var(--radius-xl)] w-full max-w-lg p-6 mx-4 modal-content shadow-[var(--shadow-xl)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                {editingDest ? "Edit Destination" : "Add Destination"}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-main)] transition-colors cursor-pointer"
              >
                <X size={20} className="text-[var(--text-secondary)]" />
              </button>
            </div>

            {/* Image Upload */}
            <div className="upload-zone rounded-[var(--radius-lg)] p-8 text-center mb-5 cursor-pointer">
              <ImageIcon size={32} className="mx-auto text-[var(--text-muted)] mb-2" />
              <p className="text-sm text-[var(--text-secondary)]">
                Click to upload image
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                PNG, JPG up to 2MB
              </p>
            </div>

            {/* Title ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Title (Indonesia)
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
                placeholder="Masukkan judul destinasi..."
              />
            </div>

            {/* Title EN */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Title (English)
              </label>
              <input
                type="text"
                value={formTitleEn}
                onChange={(e) => setFormTitleEn(e.target.value)}
                className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
                placeholder="Enter destination title..."
              />
            </div>

            {/* Description ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Description (Indonesia)
              </label>
              <textarea
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                rows={3}
                className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200 resize-none"
                placeholder="Masukkan deskripsi..."
              />
            </div>

            {/* Description EN */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Description (English)
              </label>
              <textarea
                value={formDescEn}
                onChange={(e) => setFormDescEn(e.target.value)}
                rows={3}
                className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200 resize-none"
                placeholder="Enter description..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingDest ? "Save Changes" : "Add Destination"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
