"use client";

import { cancelBooking } from "@/services/studyRoomApi";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CancelModal({ booking, onClose, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);

  if (!booking) return null;

  const handleCancelConfirm = async () => {
    try {
      setSubmitting(true);
      const res = await cancelBooking(booking._id);
      console.log("API Response in Modal:", res)
      if (!res.ok) throw new Error("Cancellation failed");

      toast.success("Booking cancelled");
      onSuccess();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6 animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-base font-bold text-slate-800">Cancel Booking?</h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Are you sure you want to cancel your booking for{" "}
          <strong className="text-slate-700">{booking.room_name}</strong> on{" "}
          <span className="underline">{booking.date}</span>? This action cannot
          be undone.
        </p>

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition disabled:opacity-50"
          >
            No, Keep it
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={handleCancelConfirm}
            className="px-4 py-2 rounded-lg text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition disabled:opacity-50"
          >
            {submitting ? "Cancelling..." : "Yes, Cancel Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
