"use client";

import React, { useState, useMemo } from "react";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import Pagination from "@/components/molecules/Pagination";
import DetailModal from "@/components/organisms/DetailModal";
import ConfirmDialog from "@/components/organisms/ConfirmDialog";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { TourPackage } from "@/types";
import { formatCurrency } from "@/lib/data";

interface TourPackageTableProps {
  packages: TourPackage[];
  onDelete: (id: string) => void;
}

const statusOptions = [
  { value: "all", label: "Semua Status" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
];

const ITEMS_PER_PAGE = 5;

export default function TourPackageTable({ packages, onDelete }: TourPackageTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailPkg, setDetailPkg] = useState<TourPackage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TourPackage | null>(null);

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pkg.titleEn || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pkg.category || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || pkg.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [packages, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-t-[var(--radius-xl)] border border-b-0 border-[var(--border)] p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="w-full max-w-sm">
            <Input
              hasSearchIcon
              placeholder="Cari paket tour..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="w-48">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* Existing Packages Table */}
      <div className="bg-white rounded-b-[var(--radius-xl)] border border-[var(--border)] overflow-hidden">
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
              {paginatedPackages.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-[var(--text-muted)]"
                  >
                    No packages found.
                  </td>
                </tr>
              ) : (
                paginatedPackages.map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="border-b border-[var(--border-light)] last:border-0 hover:bg-[var(--bg-main)]/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-[var(--text-primary)] mb-0.5">
                          {pkg.title}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {pkg.duration && `${pkg.duration} • `}{pkg.vehicleOptions?.length || 0} Vehicle Options
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                      {pkg.category}
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-[var(--text-primary)]">
                      {formatCurrency(pkg.estimatedPrice)}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        status={pkg.status === "active" ? "available" : "service"}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDetailPkg(pkg)}
                          className="p-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(pkg)}
                          className="p-2 rounded-[var(--radius-md)] text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        className="mt-4 px-5"
        currentPage={currentPage}
        totalPages={totalPages || 1}
        totalItems={filteredPackages.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {/* Detail Modal */}
      <DetailModal
        isOpen={!!detailPkg}
        onClose={() => setDetailPkg(null)}
        title="Tour Package Detail"
        items={detailPkg ? [
          { label: "Package Name", value: detailPkg.title },
          { label: "Category", value: detailPkg.category || "-" },
          { label: "Duration", value: detailPkg.duration },
          { label: "Starting Price", value: formatCurrency(detailPkg.estimatedPrice) },
          { label: "Status", value: <Badge status={detailPkg.status === "active" ? "available" : "service"}/> },
          { label: "Description", value: detailPkg.description },
          { label: "Destinations", value: detailPkg.destinationTags?.join(", ") || "-" },
          { label: "Includes", value: detailPkg.includes?.join(", ") || "-" },
          { label: "Excludes", value: detailPkg.excludes?.join(", ") || "-" },
          { label: "Vehicle Options", value: `${detailPkg.vehicleOptions?.length || 0} options` },
        ] : []}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) onDelete(deleteTarget.id);
          setDeleteTarget(null);
        }}
        title="Hapus Tour Package"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.title}"? Tindakan ini tidak dapat dibatalkan.`}
      />
    </>
  );
}
