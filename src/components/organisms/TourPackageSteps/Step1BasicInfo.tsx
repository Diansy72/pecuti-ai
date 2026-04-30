import React from "react";
import { cn } from "@/lib/cn";
import { Car, Bus, X, Plus, Check } from "lucide-react";
import Button from "@/components/atoms/Button";
import { TourPackageFormData } from "@/types";

const CATEGORIES = ["Heritage", "Adventure", "City Tour", "Beach", "Nature"];

interface Step1Props {
  formData: TourPackageFormData;
  setFormData: React.Dispatch<React.SetStateAction<TourPackageFormData>>;
  currentTag: string;
  setCurrentTag: React.Dispatch<React.SetStateAction<string>>;
}

export default function Step1BasicInfo({
  formData,
  setFormData,
  currentTag,
  setCurrentTag,
}: Step1Props) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
          STEP 1 — SELECT PRICING TYPE
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setFormData({ ...formData, priceType: "per_car" })}
            className={cn(
              "p-4 rounded-[var(--radius-lg)] border-2 cursor-pointer transition-all flex flex-col gap-2",
              formData.priceType === "per_car"
                ? "border-[var(--primary)] bg-[var(--primary)]/5"
                : "border-[var(--border)] bg-[var(--bg-main)] hover:border-[var(--primary)]/50"
            )}
          >
            <Car
              size={24}
              className={
                formData.priceType === "per_car"
                  ? "text-[var(--primary)]"
                  : "text-[var(--text-secondary)]"
              }
            />
            <div>
              <p className="font-bold text-[var(--text-primary)]">Price per Car</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Avanza, Xpander, Innova, Alphard, dll
              </p>
            </div>
          </div>
          <div
            onClick={() => setFormData({ ...formData, priceType: "per_person" })}
            className={cn(
              "p-4 rounded-[var(--radius-lg)] border-2 cursor-pointer transition-all flex flex-col gap-2",
              formData.priceType === "per_person"
                ? "border-[var(--primary)] bg-[var(--primary)]/5"
                : "border-[var(--border)] bg-[var(--bg-main)] hover:border-[var(--primary)]/50"
            )}
          >
            <Bus
              size={24}
              className={
                formData.priceType === "per_person"
                  ? "text-[var(--primary)]"
                  : "text-[var(--text-secondary)]"
              }
            />
            <div>
              <p className="font-bold text-[var(--text-primary)]">Price per Person</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Minibus, Medium Bus, Long Bus
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            Package Name
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
            placeholder="e.g. Bali Explorer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all cursor-pointer"
          >
            <option value="">Select category...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
          placeholder="Enter package description..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
          Destination Tags
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && currentTag.trim()) {
                e.preventDefault();
                if (!formData.destinationTags.includes(currentTag.trim())) {
                  setFormData((prev) => ({
                    ...prev,
                    destinationTags: [...prev.destinationTags, currentTag.trim()],
                  }));
                }
                setCurrentTag("");
              }
            }}
            className="flex-1 bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
            placeholder="Add destination..."
          />
          <Button
            variant="secondary"
            className="bg-[var(--primary)]/10 text-[var(--primary)] border-transparent hover:bg-[var(--primary)]/20"
            onClick={() => {
              if (currentTag.trim() && !formData.destinationTags.includes(currentTag.trim())) {
                setFormData((prev) => ({
                  ...prev,
                  destinationTags: [...prev.destinationTags, currentTag.trim()],
                }));
                setCurrentTag("");
              }
            }}
          >
            Add
          </Button>
        </div>
        {formData.destinationTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.destinationTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[var(--border)] rounded-[var(--radius-full)] text-xs text-[var(--text-secondary)]"
              >
                {tag}
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      destinationTags: prev.destinationTags.filter((t) => t !== tag),
                    }))
                  }
                  className="text-[var(--text-muted)] hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-green-600 mb-2">
            <Check size={16} /> Included Costs
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
                className="flex-1 bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                placeholder="e.g. Fuel"
              />
              <button
                onClick={() => {
                  if (i === formData.includes.length - 1) {
                    setFormData({ ...formData, includes: [...formData.includes, ""] });
                  } else {
                    const newIncludes = formData.includes.filter((_, idx) => idx !== i);
                    setFormData({ ...formData, includes: newIncludes });
                  }
                }}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer shrink-0",
                  i === formData.includes.length - 1
                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                    : "bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600"
                )}
              >
                {i === formData.includes.length - 1 ? <Plus size={16} /> : <X size={14} />}
              </button>
            </div>
          ))}
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-red-500 mb-2">
            <X size={16} /> Not Included
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
                className="flex-1 bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                placeholder="e.g. Lunch"
              />
              <button
                onClick={() => {
                  if (i === formData.excludes.length - 1) {
                    setFormData({ ...formData, excludes: [...formData.excludes, ""] });
                  } else {
                    const newExcludes = formData.excludes.filter((_, idx) => idx !== i);
                    setFormData({ ...formData, excludes: newExcludes });
                  }
                }}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer shrink-0",
                  i === formData.excludes.length - 1
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600"
                )}
              >
                {i === formData.excludes.length - 1 ? <Plus size={16} /> : <X size={14} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
