"use client";

import React, { useState } from "react";
import { X, ChevronLeft, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import Button from "@/components/atoms/Button";
import { TourPackage, TourPackageFormData } from "@/types";

// Import step components
import Step1BasicInfo from "./TourPackageSteps/Step1BasicInfo";
import Step2Pricing from "./TourPackageSteps/Step2Pricing";
import Step3Summary from "./TourPackageSteps/Step3Summary";
import Step4Itinerary from "./TourPackageSteps/Step4Itinerary";

interface TourPackageFormProps {
  onClose: () => void;
  onSave: (pkg: TourPackage) => void;
}

export default function TourPackageForm({ onClose, onSave }: TourPackageFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [currentTag, setCurrentTag] = useState("");

  const [formData, setFormData] = useState<TourPackageFormData>({
    title: "",
    category: "",
    description: "",
    destinationTags: [],
    includes: [""],
    excludes: [""],
    priceType: "per_car",
    pricingOptions: [],
    itineraryDays: [
      {
        day: 1,
        activities: [{ time: "08:00", description: "", type: "Covered" }],
      },
    ],
  });

  const handleSave = () => {
    // Serialize itinerary logic
    const itineraryString = JSON.stringify(formData.itineraryDays);

    const newPkg: TourPackage = {
      id: `pkg-${Date.now()}`,
      title: formData.title,
      description: formData.description, // Can also embed itinerary string here if backend requires text
      imageUrl: "",
      estimatedPrice: formData.pricingOptions.length > 0 ? formData.pricingOptions[0].price : 0,
      duration: `${formData.itineraryDays.length} Days`, // dynamically calculate duration
      minPax: 0, // deprecated
      maxPax: 0, // deprecated
      startTime: "", // deprecated
      endTime: "", // deprecated
      includes: formData.includes.filter(Boolean),
      excludes: formData.excludes.filter(Boolean),
      vehicleOptions: formData.pricingOptions.map((po) => ({
        id: po.id,
        name: po.vehicleName || "Custom Package",
        capacity: po.capacity || 0,
        pricePerDay: po.price,
      })),
      category: formData.category,
      destinationTags: formData.destinationTags,
      status: "draft",
    };
    onSave(newPkg);
    onClose();
  };

  return (
    <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-6 mb-8">
      {/* Form Header & Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            New Tour Package — Step {currentStep}/{totalSteps}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-main)] transition-colors cursor-pointer"
          >
            <X size={20} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        <div className="flex items-center w-full gap-2 mb-3">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-colors",
                step <= currentStep ? "bg-[var(--primary)]" : "bg-[var(--border)]"
              )}
            />
          ))}
        </div>
        <div className="flex items-center justify-between px-2">
          <span
            className={cn(
              "text-xs font-semibold w-1/4 text-center",
              currentStep === 1 ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
            )}
          >
            Basic Info
          </span>
          <span
            className={cn(
              "text-xs font-semibold w-1/4 text-center",
              currentStep === 2 ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
            )}
          >
            Vehicles & Pricing
          </span>
          <span
            className={cn(
              "text-xs font-semibold w-1/4 text-center",
              currentStep === 3 ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
            )}
          >
            Vehicle Summary
          </span>
          <span
            className={cn(
              "text-xs font-semibold w-1/4 text-center",
              currentStep === 4 ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
            )}
          >
            Itinerary
          </span>
        </div>
      </div>

      {/* Steps Content */}
      {currentStep === 1 && (
        <Step1BasicInfo
          formData={formData}
          setFormData={setFormData}
          currentTag={currentTag}
          setCurrentTag={setCurrentTag}
        />
      )}
      {currentStep === 2 && <Step2Pricing formData={formData} setFormData={setFormData} />}
      {currentStep === 3 && <Step3Summary formData={formData} setFormData={setFormData} />}
      {currentStep === 4 && <Step4Itinerary formData={formData} setFormData={setFormData} />}

      {/* Step Navigation */}
      <div className="flex items-center gap-3 mt-8 pt-5">
        <Button
          variant="secondary"
          onClick={() => (currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose())}
          className="bg-[var(--bg-main)] text-[var(--text-secondary)] border-transparent hover:bg-[var(--border)]"
        >
          Back
        </Button>
        {currentStep < totalSteps ? (
          <Button
            className="bg-[#003B73] hover:bg-[#002A54] text-white"
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={
              (currentStep === 1 &&
                (!formData.title || !formData.category || !formData.description)) ||
              (currentStep === 3 && formData.pricingOptions.length === 0)
            }
          >
            Next Step
          </Button>
        ) : (
          <Button
            className="bg-[#003B73] hover:bg-[#002A54] text-white"
            icon={<Check size={16} />}
            onClick={handleSave}
          >
            Save Package
          </Button>
        )}
      </div>
    </div>
  );
}
