"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/lib/cn";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  ImageIcon,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { mockPackages, formatCurrency } from "@/lib/data";
import { TourPackage } from "@/types";

const CATEGORIES = ["Heritage", "Adventure", "City Tour", "Beach", "Nature"];
const DESTINATION_TAGS_OPTIONS = [
  "Borobudur",
  "Kraton",
  "Malioboro",
  "Pantai Parangtritis",
  "Gunung Merapi",
  "Taman Sari",
  "Alun-alun",
  "Prambanan",
];

export default function TourPackagesManagement() {
  const [packages, setPackages] = useState<TourPackage[]>(mockPackages);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    estimatedPrice: "",
    estimatedPriceUsd: "",
    duration: "",
    category: "",
    destinationTags: [] as string[],
    minPax: "",
    maxPax: "",
    startTime: "",
    endTime: "",
    includes: [""],
    excludes: [""],
  });

  const handleOpenForm = () => {
    setFormData({
      title: "",
      titleEn: "",
      description: "",
      descriptionEn: "",
      estimatedPrice: "",
      estimatedPriceUsd: "",
      duration: "",
      category: "",
      destinationTags: [],
      minPax: "",
      maxPax: "",
      startTime: "",
      endTime: "",
      includes: [""],
      excludes: [""],
    });
    setCurrentStep(1);
    setIsFormOpen(true);
  };

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      destinationTags: prev.destinationTags.includes(tag)
        ? prev.destinationTags.filter((t) => t !== tag)
        : [...prev.destinationTags, tag],
    }));
  };

  const handleSave = () => {
    const newPkg: TourPackage = {
      id: `pkg-${Date.now()}`,
      title: formData.title,
      titleEn: formData.titleEn,
      description: formData.description,
      descriptionEn: formData.descriptionEn,
      imageUrl: "",
      estimatedPrice: parseInt(formData.estimatedPrice) || 0,
      duration: formData.duration,
      minPax: parseInt(formData.minPax) || 2,
      maxPax: parseInt(formData.maxPax) || 6,
      startTime: formData.startTime,
      endTime: formData.endTime,
      includes: formData.includes.filter(Boolean),
      excludes: formData.excludes.filter(Boolean),
      vehicleOptions: [],
      category: formData.category,
      destinationTags: formData.destinationTags,
      status: "draft",
    };
    setPackages((prev) => [...prev, newPkg]);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Tour Packages" },
      ]}
    >
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Tour Package Management
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {packages.length} packages
          </p>
        </div>
        {!isFormOpen && (
          <Button icon={<Plus size={18} />} onClick={handleOpenForm}>
            Add Tour Package
          </Button>
        )}
      </div>

      {/* Add Package Form */}
      {isFormOpen && (
        <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6 mb-8">
          {/* Form Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Add Tour Package - Step {currentStep}/{totalSteps}
              </h2>
            </div>
            <button
              onClick={() => setIsFormOpen(false)}
              className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-main)] transition-colors cursor-pointer"
            >
              <X size={20} className="text-[var(--text-secondary)]" />
            </button>
          </div>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Image Upload */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Package Image
                </label>
                <div className="upload-zone rounded-[var(--radius-lg)] p-12 text-center cursor-pointer">
                  <ImageIcon
                    size={40}
                    className="mx-auto text-[var(--text-muted)] mb-3"
                  />
                  <p className="text-sm text-[var(--text-secondary)]">
                    Upload package image
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              {/* Right: Name & Price */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                      Package Name (ID)
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                      placeholder="Nama paket..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                      Package Name (EN)
                    </label>
                    <input
                      type="text"
                      value={formData.titleEn}
                      onChange={(e) =>
                        setFormData({ ...formData, titleEn: e.target.value })
                      }
                      className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                      placeholder="Package name..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                    Package Price (IDR)
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedPrice: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                    placeholder="650000"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all cursor-pointer"
                  >
                    <option value="">Select category...</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination Tags */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Destination Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DESTINATION_TAGS_OPTIONS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "px-3 py-1.5 rounded-[var(--radius-full)] text-xs font-medium transition-all cursor-pointer",
                          formData.destinationTags.includes(tag)
                            ? "bg-[var(--primary)] text-white"
                            : "bg-[var(--bg-main)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Description */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                  Description (Indonesia)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
                  placeholder="Masukkan deskripsi paket..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                  Description (English)
                </label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
                  placeholder="Enter package description..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                    placeholder="Full Day"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                      Min Pax
                    </label>
                    <input
                      type="number"
                      value={formData.minPax}
                      onChange={(e) =>
                        setFormData({ ...formData, minPax: e.target.value })
                      }
                      className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                      Max Pax
                    </label>
                    <input
                      type="number"
                      value={formData.maxPax}
                      onChange={(e) =>
                        setFormData({ ...formData, maxPax: e.target.value })
                      }
                      className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                      placeholder="15"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Includes/Excludes */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Includes
                </label>
                {formData.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newIncludes = [...formData.includes];
                        newIncludes[i] = e.target.value;
                        setFormData({ ...formData, includes: newIncludes });
                      }}
                      className="flex-1 bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                      placeholder="e.g. Kendaraan AC Premium"
                    />
                    {formData.includes.length > 1 && (
                      <button
                        onClick={() => {
                          const newIncludes = formData.includes.filter(
                            (_, idx) => idx !== i
                          );
                          setFormData({ ...formData, includes: newIncludes });
                        }}
                        className="p-2 text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      includes: [...formData.includes, ""],
                    })
                  }
                  className="text-sm text-[var(--primary)] font-medium hover:underline cursor-pointer mt-1"
                >
                  + Add Item
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Excludes
                </label>
                {formData.excludes.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newExcludes = [...formData.excludes];
                        newExcludes[i] = e.target.value;
                        setFormData({ ...formData, excludes: newExcludes });
                      }}
                      className="flex-1 bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                      placeholder="e.g. Tiket masuk wisata"
                    />
                    {formData.excludes.length > 1 && (
                      <button
                        onClick={() => {
                          const newExcludes = formData.excludes.filter(
                            (_, idx) => idx !== i
                          );
                          setFormData({ ...formData, excludes: newExcludes });
                        }}
                        className="p-2 text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      excludes: [...formData.excludes, ""],
                    })
                  }
                  className="text-sm text-[var(--primary)] font-medium hover:underline cursor-pointer mt-1"
                >
                  + Add Item
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="bg-[var(--bg-main)] rounded-[var(--radius-lg)] p-5">
                <h3 className="font-semibold text-[var(--text-primary)] mb-3">
                  Review Package Details
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-[var(--text-secondary)]">Name (ID):</span>
                    <span className="ml-2 font-medium">{formData.title || "-"}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">Name (EN):</span>
                    <span className="ml-2 font-medium">{formData.titleEn || "-"}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">Price:</span>
                    <span className="ml-2 font-medium">
                      {formData.estimatedPrice
                        ? formatCurrency(parseInt(formData.estimatedPrice))
                        : "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">Category:</span>
                    <span className="ml-2 font-medium">{formData.category || "-"}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">Duration:</span>
                    <span className="ml-2 font-medium">{formData.duration || "-"}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">Pax:</span>
                    <span className="ml-2 font-medium">
                      {formData.minPax || "?"} - {formData.maxPax || "?"}
                    </span>
                  </div>
                </div>
                {formData.destinationTags.length > 0 && (
                  <div className="mt-3">
                    <span className="text-sm text-[var(--text-secondary)]">Tags: </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {formData.destinationTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-[var(--primary)] text-white text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step Navigation */}
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-[var(--border)]">
            <Button
              variant="secondary"
              icon={<ChevronLeft size={16} />}
              onClick={() =>
                currentStep > 1
                  ? setCurrentStep(currentStep - 1)
                  : setIsFormOpen(false)
              }
            >
              {currentStep > 1 ? "Prev Step" : "Cancel"}
            </Button>
            {currentStep < totalSteps ? (
              <Button
                icon={<ChevronRight size={16} />}
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next Step
              </Button>
            ) : (
              <Button onClick={handleSave}>Publish Package</Button>
            )}
          </div>
        </div>
      )}

      {/* Existing Packages Table */}
      <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["Package Name", "Category", "Starting Price", "Status", "Action"].map(
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
              {packages.map((pkg, index) => (
                <tr
                  key={pkg.id}
                  className={cn(
                    "border-b border-[var(--border-light)] table-row-hover",
                    index % 2 === 1 && "bg-[#FAFBFC]"
                  )}
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {pkg.title}
                      </p>
                      {pkg.titleEn && (
                        <p className="text-xs text-[var(--text-muted)]">
                          {pkg.titleEn}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                    {pkg.category || "-"}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-[var(--text-primary)]">
                    {formatCurrency(pkg.estimatedPrice)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-full)] text-xs font-semibold",
                        pkg.status === "active"
                          ? "bg-[var(--status-available-bg)] text-green-700"
                          : "bg-[var(--status-service-bg)] text-amber-700"
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          pkg.status === "active"
                            ? "bg-green-500"
                            : "bg-amber-500"
                        )}
                      />
                      {pkg.status === "active" ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-[var(--radius-md)] text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 rounded-[var(--radius-md)] text-amber-500 hover:bg-amber-50 transition-colors cursor-pointer">
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
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
    </DashboardLayout>
  );
}
