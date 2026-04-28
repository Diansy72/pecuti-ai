"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import Button from "@/components/atoms/Button";
import { Save, Globe } from "lucide-react";

export default function AboutUsManagement() {
  const [activeLanguage, setActiveLanguage] = useState<"id" | "en">("id");

  const [contentId, setContentId] = useState({
    companyName: "LA Group and Andika Trans",
    tagline: "Solusi Rental Kendaraan Terpercaya di Yogyakarta",
    description:
      "LA Group & Andika Trans adalah penyedia layanan rental kendaraan profesional yang telah melayani pelanggan sejak 2018. Kami menyediakan armada berkualitas dengan driver berpengalaman untuk kebutuhan wisata dan transportasi Anda di Yogyakarta dan sekitarnya.",
    vision:
      "Menjadi penyedia layanan rental kendaraan dan paket wisata terdepan di Yogyakarta dengan standar pelayanan internasional.",
    mission:
      "Memberikan pengalaman perjalanan yang aman, nyaman, dan berkesan bagi setiap pelanggan dengan armada terawat dan driver profesional.",
    address: "Jl. Malioboro No. 123, Yogyakarta, Indonesia 55271",
    phone: "+62 812-3456-7890",
    email: "info@lagroupandika.com",
  });

  const [contentEn, setContentEn] = useState({
    companyName: "LA Group and Andika Trans",
    tagline: "Trusted Vehicle Rental Solution in Yogyakarta",
    description:
      "LA Group & Andika Trans is a professional vehicle rental service provider that has been serving customers since 2018. We provide quality fleets with experienced drivers for your tourism and transportation needs in Yogyakarta and surrounding areas.",
    vision:
      "To become the leading vehicle rental and tour package provider in Yogyakarta with international service standards.",
    mission:
      "To provide safe, comfortable, and memorable travel experiences for every customer with well-maintained fleets and professional drivers.",
    address: "Jl. Malioboro No. 123, Yogyakarta, Indonesia 55271",
    phone: "+62 812-3456-7890",
    email: "info@lagroupandika.com",
  });

  const content = activeLanguage === "id" ? contentId : contentEn;
  const setContent = activeLanguage === "id" ? setContentId : setContentEn;

  const updateField = (field: string, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "About Us" },
      ]}
    >
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            About Us Management
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Kelola informasi perusahaan yang ditampilkan ke pelanggan
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex items-center gap-0 rounded-[var(--radius-md)] overflow-hidden">
            <button
              onClick={() => setActiveLanguage("id")}
              className={`px-4 py-2 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeLanguage === "id"
                  ? "toggle-btn-active"
                  : "toggle-btn-inactive"
              }`}
            >
              <Globe size={14} />
              ID
            </button>
            <button
              onClick={() => setActiveLanguage("en")}
              className={`px-4 py-2 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeLanguage === "en"
                  ? "toggle-btn-active"
                  : "toggle-btn-inactive"
              }`}
            >
              <Globe size={14} />
              EN
            </button>
          </div>
          <Button icon={<Save size={16} />}>Save Changes</Button>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6 mb-6">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-5">
          Company Information
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                value={content.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Tagline
              </label>
              <input
                type="text"
                value={content.tagline}
                onChange={(e) => updateField("tagline", e.target.value)}
                className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Description
            </label>
            <textarea
              value={content.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6 mb-6">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-5">
          Vision & Mission
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Vision
            </label>
            <textarea
              value={content.vision}
              onChange={(e) => updateField("vision", e.target.value)}
              rows={3}
              className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Mission
            </label>
            <textarea
              value={content.mission}
              onChange={(e) => updateField("mission", e.target.value)}
              rows={3}
              className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-5">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Address
            </label>
            <input
              type="text"
              value={content.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Phone
            </label>
            <input
              type="text"
              value={content.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Email
            </label>
            <input
              type="text"
              value={content.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
