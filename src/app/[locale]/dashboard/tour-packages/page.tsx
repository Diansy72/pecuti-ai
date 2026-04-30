"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import Button from "@/components/atoms/Button";
import { Plus } from "lucide-react";
import { mockPackages } from "@/lib/data";
import { TourPackage } from "@/types";
import TourPackageTable from "@/components/organisms/TourPackageTable";
import TourPackageForm from "@/components/organisms/TourPackageForm";

export default function TourPackagesManagement() {
  const [packages, setPackages] = useState<TourPackage[]>(mockPackages);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (newPkg: TourPackage) => {
    setPackages((prev) => [...prev, newPkg]);
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
            Manage your available tour packages
          </p>
        </div>
        {!isFormOpen && (
          <Button icon={<Plus size={18} />} onClick={() => setIsFormOpen(true)}>
            Add Tour Package
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <TourPackageForm onClose={() => setIsFormOpen(false)} onSave={handleSave} />
      ) : (
        <TourPackageTable packages={packages} onDelete={handleDelete} />
      )}
    </DashboardLayout>
  );
}
