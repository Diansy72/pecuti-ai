import React from "react";
import { Plus, Clock, X } from "lucide-react";
import { TourPackageFormData } from "@/types";

interface Step4Props {
  formData: TourPackageFormData;
  setFormData: React.Dispatch<React.SetStateAction<TourPackageFormData>>;
}

export default function Step4Itinerary({ formData, setFormData }: Step4Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[var(--text-primary)]">
          Travel Itinerary / Rundown
        </h3>
        <button
          onClick={() => {
            const newDay = {
              day: formData.itineraryDays.length + 1,
              activities: [{ time: "08:00", description: "", type: "Covered" }],
            };
            setFormData({ ...formData, itineraryDays: [...formData.itineraryDays, newDay] });
          }}
          className="text-sm font-semibold text-[var(--primary)] flex items-center gap-1 hover:underline"
        >
          <Plus size={16} /> Add Day
        </button>
      </div>

      <div className="space-y-4">
        {formData.itineraryDays.map((dayObj, dayIndex) => (
          <div
            key={dayIndex}
            className="bg-[var(--bg-main)] rounded-[var(--radius-lg)] border border-[var(--border)] p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-[var(--text-primary)]">Day {dayObj.day}</h4>
              <button
                onClick={() => {
                  const newDays = [...formData.itineraryDays];
                  newDays[dayIndex].activities.push({
                    time: "12:00",
                    description: "",
                    type: "Covered",
                  });
                  setFormData({ ...formData, itineraryDays: newDays });
                }}
                className="text-sm font-semibold text-[var(--primary)] flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Activity
              </button>
            </div>

            <div className="space-y-3">
              {dayObj.activities.map((activity, actIndex) => (
                <div key={actIndex} className="flex items-center gap-3">
                  <div className="relative w-28">
                    <Clock
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                      type="time"
                      value={activity.time}
                      onChange={(e) => {
                        const newDays = [...formData.itineraryDays];
                        newDays[dayIndex].activities[actIndex].time = e.target.value;
                        setFormData({ ...formData, itineraryDays: newDays });
                      }}
                      className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-md)] pl-8 pr-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                    />
                  </div>
                  <input
                    type="text"
                    value={activity.description}
                    onChange={(e) => {
                      const newDays = [...formData.itineraryDays];
                      newDays[dayIndex].activities[actIndex].description = e.target.value;
                      setFormData({ ...formData, itineraryDays: newDays });
                    }}
                    className="flex-1 bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                    placeholder="Activity..."
                  />
                  <select
                    value={activity.type}
                    onChange={(e) => {
                      const newDays = [...formData.itineraryDays];
                      newDays[dayIndex].activities[actIndex].type = e.target.value;
                      setFormData({ ...formData, itineraryDays: newDays });
                    }}
                    className="w-32 bg-white border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all cursor-pointer"
                  >
                    <option value="Covered">Covered</option>
                    <option value="Personal Expense">Personal</option>
                  </select>
                  <button
                    onClick={() => {
                      const newDays = [...formData.itineraryDays];
                      newDays[dayIndex].activities = newDays[dayIndex].activities.filter(
                        (_, idx) => idx !== actIndex
                      );
                      setFormData({ ...formData, itineraryDays: newDays });
                    }}
                    className="p-2 text-red-400 hover:text-red-600 cursor-pointer shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
