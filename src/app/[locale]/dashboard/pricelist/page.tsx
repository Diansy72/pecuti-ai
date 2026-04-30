"use client";

import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import TabGroup from "@/components/molecules/TabGroup";
import Pagination from "@/components/molecules/Pagination";
import VehicleTable from "@/components/organisms/VehicleTable";
import VehicleTypeModal from "@/components/organisms/VehicleTypeModal";
import DetailModal from "@/components/organisms/DetailModal";
import ConfirmDialog from "@/components/organisms/ConfirmDialog";
import CreateBookingModal from "@/components/organisms/CreateBookingModal";
import { Plus } from "lucide-react";
import { mockVehicles, formatCurrency } from "@/lib/data";
import { Vehicle } from "@/types";
import Badge from "@/components/atoms/Badge";

const tabs = [
  { id: "vehicles", label: "Vehicles" },
  { id: "booking-history", label: "Booking History" },
];

const statusOptions = [
  { value: "all", label: "Semua Status" },
  { value: "available", label: "Available" },
  { value: "rented", label: "Booked" },
  { value: "service", label: "Service" },
];

const ITEMS_PER_PAGE = 5;

export default function PricelistPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [activeTab, setActiveTab] = useState("vehicles");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Detail modal
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);

  // Booking modal
  const [bookingTarget, setBookingTarget] = useState<Vehicle | null>(null);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || vehicle.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [vehicles, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (vehicle: Vehicle) => {
    setDeleteTarget(vehicle);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setVehicles((prev) => prev.filter((v) => v.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const handleBooking = (vehicleId: number) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId ? { ...v, status: "rented" as const } : v
      )
    );
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pricelist" },
      ]}
    >
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Pricelist Management
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {vehicles.length} vehicles in fleet
          </p>
        </div>
        <Button
          icon={<Plus size={18} />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Vehicle
        </Button>
      </div>

      {/* Tabs */}
      <TabGroup
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6 w-fit"
      />

      {activeTab === "vehicles" && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-t-[var(--radius-xl)] border border-b-0 border-[var(--border)] p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="w-full max-w-sm">
                <Input
                  hasSearchIcon
                  placeholder="Cari Nama..."
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

          {/* Table */}
          <VehicleTable
            vehicles={paginatedVehicles}
            onView={(v) => setDetailVehicle(v)}
            onDelete={(v) => handleDelete(v)}
            onBooking={(v) => setBookingTarget(v)}
          />

          <Pagination
            className="mt-4 px-5"
            currentPage={currentPage}
            totalPages={totalPages || 1}
            totalItems={filteredVehicles.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {activeTab === "booking-history" && (
        <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--border)] p-12 text-center">
          <p className="text-[var(--text-secondary)] text-sm">
            Booking history akan ditampilkan di sini.
          </p>
        </div>
      )}

      {/* Vehicle Type Modal */}
      <VehicleTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(type) => {
          console.log("Selected vehicle type:", type);
          setIsModalOpen(false);
        }}
      />

      {/* Vehicle Detail Modal */}
      <DetailModal
        isOpen={!!detailVehicle}
        onClose={() => setDetailVehicle(null)}
        title="Vehicle Detail"
        items={detailVehicle ? [
          { label: "ID", value: String(detailVehicle.id) },
          { label: "Name", value: detailVehicle.name },
          { label: "Type", value: detailVehicle.type === "car" ? "Car" : "Motorcycle" },
          { label: "Plate Number", value: detailVehicle.licensePlate },
          { label: "Category", value: detailVehicle.category },
          { label: "Price / Day", value: formatCurrency(detailVehicle.pricePerDay) },
          { label: "Status", value: <Badge status={detailVehicle.status === "rented" ? "booked" : detailVehicle.status} /> },
          { label: "Created At", value: detailVehicle.createdAt },
        ] : []}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Hapus Kendaraan"
        message={`Apakah Anda yakin ingin menghapus ${deleteTarget?.name} (${deleteTarget?.licensePlate})? Tindakan ini tidak dapat dibatalkan.`}
      />

      {/* Create Booking Modal */}
      <CreateBookingModal
        isOpen={!!bookingTarget}
        onClose={() => setBookingTarget(null)}
        vehicle={bookingTarget}
        onSubmit={(vehicleId) => {
          handleBooking(vehicleId);
          setBookingTarget(null);
        }}
      />
    </DashboardLayout>
  );
}
