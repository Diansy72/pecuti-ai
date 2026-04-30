"use client";

import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import Button from "@/components/atoms/Button";
import { cn } from "@/lib/cn";
import {
  Plus,
  X,
  Check,
  Star,
  Pencil,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { mockTourists, mockGoogleReviews } from "@/lib/data";
import { Tourist, GoogleReview } from "@/types";
import ConfirmDialog from "@/components/organisms/ConfirmDialog";

const CONTINENTS = ["All", "Asia", "Europe", "Americas"] as const;

export default function AboutUsManagement() {
  const [activeTab, setActiveTab] = useState<"gallery" | "reviews">("gallery");

  // Tourist Gallery State
  const [tourists, setTourists] = useState<Tourist[]>(mockTourists);
  const [continentFilter, setContinentFilter] = useState<string>("All");
  const [showTouristForm, setShowTouristForm] = useState(false);
  const [touristForm, setTouristForm] = useState({
    nationality: "",
    continent: "Asia" as Tourist["continent"],
    packageTaken: "",
  });

  // Google Reviews State
  const [reviews, setReviews] = useState<GoogleReview[]>(mockGoogleReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    country: "",
    rating: 5,
    comment: "",
  });

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: "tourist" | "review"; id: string; name: string } | null>(null);

  // Filtered tourists
  const filteredTourists = useMemo(() => {
    if (continentFilter === "All") return tourists;
    return tourists.filter((t) => t.continent === continentFilter);
  }, [tourists, continentFilter]);

  // Tourist CRUD
  const handleAddTourist = () => {
    if (!touristForm.nationality || !touristForm.packageTaken) return;
    const newTourist: Tourist = {
      id: `t-${Date.now()}`,
      ...touristForm,
    };
    setTourists((prev) => [...prev, newTourist]);
    setTouristForm({ nationality: "", continent: "Asia", packageTaken: "" });
    setShowTouristForm(false);
  };

  const handleDeleteTourist = (id: string) => {
    setTourists((prev) => prev.filter((t) => t.id !== id));
  };

  // Review CRUD
  const handleAddReview = () => {
    if (!reviewForm.name || !reviewForm.comment) return;
    const newReview: GoogleReview = {
      id: `r-${Date.now()}`,
      ...reviewForm,
    };
    setReviews((prev) => [...prev, newReview]);
    setReviewForm({ name: "", country: "", rating: 5, comment: "" });
    setShowReviewForm(false);
  };

  const handleDeleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
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
            Manage tourist gallery and Google reviews
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[var(--bg-main)] rounded-[var(--radius-lg)] p-1 mb-6 w-fit">
        <button
          onClick={() => setActiveTab("gallery")}
          className={cn(
            "px-5 py-2 rounded-[var(--radius-md)] text-sm font-semibold cursor-pointer transition-all duration-200",
            activeTab === "gallery"
              ? "bg-[var(--primary)] text-white shadow-[var(--shadow-sm)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white"
          )}
        >
          Tourist Gallery
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={cn(
            "px-5 py-2 rounded-[var(--radius-md)] text-sm font-semibold cursor-pointer transition-all duration-200",
            activeTab === "reviews"
              ? "bg-[var(--primary)] text-white shadow-[var(--shadow-sm)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white"
          )}
        >
          Google Reviews
        </button>
      </div>

      {/* ===================== TOURIST GALLERY TAB ===================== */}
      {activeTab === "gallery" && (
        <>
          {/* Continent Filter + Add Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {CONTINENTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setContinentFilter(c)}
                  className={cn(
                    "px-4 py-1.5 rounded-[var(--radius-full)] text-xs font-semibold cursor-pointer transition-all border",
                    continentFilter === c
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-white text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/50"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <Button
              icon={<Plus size={16} />}
              onClick={() => setShowTouristForm(true)}
            >
              Add Tourist
            </Button>
          </div>

          {/* Add Tourist Modal */}
          {showTouristForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-[var(--radius-xl)] w-full max-w-lg p-6 mx-4 shadow-[var(--shadow-xl)]">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Add Tourist</h3>
                  <button
                    onClick={() => setShowTouristForm(false)}
                    className="p-1.5 rounded-[var(--radius-md)] hover:bg-[var(--bg-main)] cursor-pointer"
                  >
                    <X size={18} className="text-[var(--text-secondary)]" />
                  </button>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                      Photo
                    </label>
                    <button className="w-full flex items-center justify-center gap-2 bg-[var(--bg-main)] border border-dashed border-[var(--border)] rounded-[var(--radius-md)] px-4 py-6 text-sm text-[var(--text-muted)] cursor-pointer hover:border-[var(--primary)] hover:bg-blue-50 transition-all">
                      <Upload size={20} className="text-[var(--primary)]" /> Click to upload photo
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                      Nationality
                    </label>
                    <input
                      type="text"
                      value={touristForm.nationality}
                      onChange={(e) => setTouristForm({ ...touristForm, nationality: e.target.value })}
                      className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                      placeholder="e.g. Japan 🇯🇵"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        Continent
                      </label>
                      <select
                        value={touristForm.continent}
                        onChange={(e) => setTouristForm({ ...touristForm, continent: e.target.value as Tourist["continent"] })}
                        className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all cursor-pointer"
                      >
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Americas">Americas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        Package Taken
                      </label>
                      <input
                        type="text"
                        value={touristForm.packageTaken}
                        onChange={(e) => setTouristForm({ ...touristForm, packageTaken: e.target.value })}
                        className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                        placeholder="e.g. Bali Explorer"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
                  <Button variant="secondary" onClick={() => setShowTouristForm(false)}>
                    Cancel
                  </Button>
                  <Button icon={<Check size={16} />} onClick={handleAddTourist}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Tourist Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredTourists.map((tourist) => (
              <div
                key={tourist.id}
                className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] overflow-hidden"
              >
                {/* Gradient header with avatar */}
                <div className="bg-gradient-to-br from-[#003B73] to-[#0059A7] h-32 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
                    <User size={32} className="text-white/60" />
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <h4 className="font-bold text-[var(--text-primary)] text-sm">
                    {tourist.nationality}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {tourist.packageTaken}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[var(--radius-md)] text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 transition-colors cursor-pointer">
                      <Pencil size={12} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTourist(tourist.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[var(--radius-md)] text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===================== GOOGLE REVIEWS TAB ===================== */}
      {activeTab === "reviews" && (
        <>
          {/* Add Review Button */}
          <div className="flex items-center justify-end mb-6">
            <Button
              icon={<Plus size={16} />}
              onClick={() => setShowReviewForm(true)}
            >
              Add Review
            </Button>
          </div>

          {/* Add Review Modal */}
          {showReviewForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-[var(--radius-xl)] w-full max-w-lg p-6 mx-4 shadow-[var(--shadow-xl)]">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Add Review</h3>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="p-1.5 rounded-[var(--radius-md)] hover:bg-[var(--bg-main)] cursor-pointer"
                  >
                    <X size={18} className="text-[var(--text-secondary)]" />
                  </button>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                      Profile Photo
                    </label>
                    <button className="w-full flex items-center justify-center gap-2 bg-[var(--bg-main)] border border-dashed border-[var(--border)] rounded-[var(--radius-md)] px-4 py-6 text-sm text-[var(--text-muted)] cursor-pointer hover:border-[var(--primary)] hover:bg-blue-50 transition-all">
                      <Upload size={20} className="text-[var(--primary)]" /> Click to upload photo
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        Country
                      </label>
                      <input
                        type="text"
                        value={reviewForm.country}
                        onChange={(e) => setReviewForm({ ...reviewForm, country: e.target.value })}
                        className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                        placeholder="e.g. USA 🇺🇸"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        Rating
                      </label>
                      <div className="flex items-center gap-1 p-2 bg-[var(--bg-main)] rounded-[var(--radius-md)] w-fit border border-[var(--border)]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            onClick={() => setReviewForm({ ...reviewForm, rating: s })}
                            className="cursor-pointer hover:scale-110 transition-transform"
                          >
                            <Star
                              size={28}
                              className={cn(
                                "transition-colors",
                                s <= reviewForm.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300"
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        Comment
                      </label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        rows={4}
                        className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
                        placeholder="Write customer review..."
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
                  <Button variant="secondary" onClick={() => setShowReviewForm(false)}>
                    Cancel
                  </Button>
                  <Button icon={<Check size={16} />} onClick={handleAddReview}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">
                        {review.name}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                         {review.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className={cn(
                          s <= review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] italic mb-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 transition-colors cursor-pointer">
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => {
          if (deleteConfirm?.type === "tourist") handleDeleteTourist(deleteConfirm.id);
          if (deleteConfirm?.type === "review") handleDeleteReview(deleteConfirm.id);
          setDeleteConfirm(null);
        }}
        title={deleteConfirm?.type === "tourist" ? "Hapus Tourist" : "Hapus Review"}
        message={`Apakah Anda yakin ingin menghapus data "${deleteConfirm?.name}"? Tindakan ini tidak dapat dibatalkan.`}
      />
    </DashboardLayout>
  );
}
