import React, { useState } from "react";
import { Car, Bus, Plus, ChevronRight } from "lucide-react";
import Button from "@/components/atoms/Button";
import { TourPackageFormData } from "@/types";
import { mockVehicles } from "@/lib/data";

interface Step2Props {
  formData: TourPackageFormData;
  setFormData: React.Dispatch<React.SetStateAction<TourPackageFormData>>;
}

export default function Step2Pricing({ formData, setFormData }: Step2Props) {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [personCapacity, setPersonCapacity] = useState("");
  const [personPrice, setPersonPrice] = useState("");

  const handleAddPricing = () => {
    if (formData.priceType === "per_car") {
      if (!selectedVehicle || !carPrice) return;
      const vehicle = mockVehicles.find((v) => v.id.toString() === selectedVehicle);
      if (!vehicle) return;

      setFormData((prev) => ({
        ...prev,
        pricingOptions: [
          ...prev.pricingOptions,
          {
            id: `price-${Date.now()}`,
            type: "per_car",
            vehicleName: vehicle.name,
            capacity: vehicle.category === "MPV" ? 6 : 4,
            price: parseInt(carPrice),
          },
        ],
      }));
      setSelectedVehicle("");
      setCarPrice("");
    } else {
      if (!personCapacity || !personPrice) return;
      setFormData((prev) => ({
        ...prev,
        pricingOptions: [
          ...prev.pricingOptions,
          {
            id: `price-${Date.now()}`,
            type: "per_person",
            capacity: parseInt(personCapacity),
            price: parseInt(personPrice),
          },
        ],
      }));
      setPersonCapacity("");
      setPersonPrice("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--primary)]/5 p-4 rounded-[var(--radius-lg)] border border-[var(--primary)]/20 flex items-center gap-4">
        <div className="text-[var(--primary)] shrink-0">
          {formData.priceType === "per_car" ? <Car size={24} /> : <Bus size={24} />}
        </div>
        <div>
          <h4 className="text-sm font-bold text-[var(--primary)]">
            {formData.priceType === "per_car" ? "Price per Car Mode" : "Price per Person Mode"}
          </h4>
          <p className="text-sm text-[var(--text-secondary)]">
            {formData.priceType === "per_car"
              ? "Select private cars and set price per car"
              : "Set capacity and price per person"}
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-[var(--text-primary)] mb-3">
          {formData.priceType === "per_car" ? "Add Vehicle — Private Cars" : "Add Capacity Pricing"}
        </h4>

        {formData.priceType === "per_car" ? (
          <div className="flex items-center gap-3">
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="flex-1 bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all cursor-pointer"
            >
              <option value="">Select vehicle...</option>
              {mockVehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.category})
                </option>
              ))}
            </select>
            <input
              type="number"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
              className="w-48 bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              placeholder="Price / car (Rp)"
            />
            <Button
              className="bg-[#003B73] hover:bg-[#002A54] text-white shrink-0"
              onClick={handleAddPricing}
              disabled={!selectedVehicle || !carPrice}
            >
              Add
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={personCapacity}
              onChange={(e) => setPersonCapacity(e.target.value)}
              className="flex-1 bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              placeholder="Capacity (Persons)"
            />
            <input
              type="number"
              value={personPrice}
              onChange={(e) => setPersonPrice(e.target.value)}
              className="w-48 bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              placeholder="Price / person (Rp)"
            />
            <Button
              className="bg-[#003B73] hover:bg-[#002A54] text-white shrink-0"
              onClick={handleAddPricing}
              disabled={!personCapacity || !personPrice}
            >
              Add
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button className="text-sm font-semibold text-[var(--primary)] flex items-center gap-1 hover:underline">
          <Plus size={16} /> Add Custom Vehicle Option <ChevronRight size={14} className="rotate-90 ml-1" />
        </button>
      </div>
    </div>
  );
}
