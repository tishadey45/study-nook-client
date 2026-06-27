/* eslint-disable react-hooks/incompatible-library */
"use client";

import { authClient } from "@/lib/auth-client";
import { myBookings } from "@/services/studyRoomApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaClock,
  FaCoins,
  FaRegStickyNote,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => {
  const hour = 8 + i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export default function BookRoomModal({ isOpen, onClose, room }) {
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: today,
      startTime: "",
      endTime: "",
      notes: "",
    },
  });

  const selectedStartTime = watch("startTime");
  const selectedEndTime = watch("endTime");

  const availableEndSlots = TIME_SLOTS.filter((time) => {
    if (!selectedStartTime) return true;
    return parseInt(time) > parseInt(selectedStartTime);
  });

  useEffect(() => {
    if (selectedStartTime && selectedEndTime) {
      const startHour = parseInt(selectedStartTime);
      const endHour = parseInt(selectedEndTime);
      const hours = endHour - startHour;
      if (hours > 0) {
        setTotalCost(hours * room.hourly_rate);
      } else {
        setTotalCost(0);
      }
    } else {
      setTotalCost(0);
    }
  }, [selectedStartTime, selectedEndTime, room.hourly_rate]);

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const router = useRouter();   

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const bookingPayload = {
        room_name: room.room_name,
        image: room.image,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        notes: data.notes || "",
        totalCost: totalCost,
        status : "confirmed",

        buyer : {
          email: user?.email,
        },
      };

      const response = await myBookings(bookingPayload);

      if (response && typeof response.json === "function") {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result.message || "Conflict detected or booking failed.",
          );
        }
      } else if (response && response.success === false) {
        throw new Error(
          response.message || "Conflict detected or booking failed.",
        );
      }
      toast.success("Room booked successfully!");
      reset();
      onClose();
      router.push("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.message || "This slot is already booked.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-cyan-500 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Book Room</h2>
            <p className="text-xs text-blue-100 mt-0.5">{room.room_name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Date Picker */}
          <div>
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <FaCalendarAlt className="text-blue-500" /> Date
            </label>
            <input
              type="date"
              min={today}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
              {...register("date", { required: "Date is required" })}
            />
          </div>

          {/* Time Slots Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <FaClock className="text-blue-500" /> Start Time
              </label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
                {...register("startTime", { required: "Required" })}
              >
                <option value="">Select</option>
                {TIME_SLOTS.slice(0, -1).map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <FaClock className="text-blue-500" /> End Time
              </label>
              <select
                disabled={!selectedStartTime}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white disabled:bg-slate-50"
                {...register("endTime", { required: "Required" })}
              >
                <option value="">Select</option>
                {availableEndSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <FaRegStickyNote className="text-blue-500" /> Special Note
              (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Any special setup or requests..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none"
              {...register("notes")}
            />
          </div>

          {/* Real-time Cost Display */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex justify-between items-center mt-2">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <FaCoins className="text-amber-500" /> Rate: ৳{room.hourly_rate}
              /hr
            </span>
            <div className="text-right">
              <span className="text-xs block text-slate-400">Total Cost</span>
              <span className="text-lg font-bold text-slate-800">
                ৳{totalCost}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg text-sm shadow-md hover:opacity-95 active:scale-[0.99] transition disabled:opacity-50 mt-2"
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
