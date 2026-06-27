"use client";

import { authClient } from "@/lib/auth-client";
import { getMyBookings } from "@/services/studyRoomApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCalendarTimes } from "react-icons/fa";
import CancelModal from "@/components/CancelModal";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  // console.log(bookings);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userEmail = user?.email || "";
  useEffect(() => {
    if (!userEmail) return;
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getMyBookings(userEmail);
        setBookings(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  const isCancelable = (dateStr, status) => {
    if (status !== "confirmed") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(dateStr);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  };

  const handleCancelSuccess = () => {
    setBookings();
    setSelectedBooking(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-xs">
            <FaCalendarTimes className="mx-auto text-4xl text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">
              You have no bookings yet.
            </p>
          </div>
        ) : (
          /* Bookings Table */
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Room</th>
                    <th className="py-4 px-6">Schedule</th>
                    <th className="py-4 px-6">Total Cost</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-slate-50/40 transition"
                    >
                      {/* Room info */}
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded-md overflow-hidden bg-slate-100 border border-slate-200/60">
                          <Image
                            src={booking.image || "/placeholder.jpg"}
                            alt="room"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-semibold text-slate-800">
                          {booking.room_name || "N/A"}
                        </span>
                      </td>
                      {/* Schedule */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">
                          {booking.date}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {booking.startTime} - {booking.endTime}
                        </div>
                      </td>
                      {/* Cost */}
                      <td className="py-4 px-6 font-medium text-slate-800">
                        ৳{booking.totalCost}
                      </td>
                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                            booking.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        {isCancelable(booking.date, booking.status) ? (
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="text-xs font-semibold text-rose-600 hover:text-rose-700 border border-rose-200 bg-rose-50/30 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition"
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <CancelModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onSuccess={handleCancelSuccess}
      />
    </div>
  );
}
