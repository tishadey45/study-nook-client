"use client";

import { getStudyRoomsById, updateRoom } from "@/services/studyRoomApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaDoorOpen,
  FaLayerGroup,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

export default function UpdateRoomPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) return;
      try {
        setFetching(true);
        const room = await getStudyRoomsById(id);

        if (room) {
          reset({
            room_name: room.room_name || "",
            floor: room.floor || "",
            capacity: room.capacity || "",
            hourly_rate: room.hourly_rate || "",
          });
        }
      } catch (error) {
        console.error("Error fetching room:", error);
        toast.error("Failed to load room data");
      } finally {
        setFetching(false);
      }
    };

    fetchRoom();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await updateRoom(id, data);

      if (result?.modifiedCount > 0 || result?.success) {
        toast.success("Room updated successfully");
        // router.refresh();
        router.push("/my-listings");
      } else {
        toast.error("No changes were made");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-12 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Update Study Room
          </h1>
          <p className="text-blue-100/90 mt-2 text-sm md:text-base">
            Modify the details below to update your study room configuration.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Room Name */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <FaDoorOpen className="text-blue-500 text-base" />
              Room Name
            </label>
            <input
              type="text"
              placeholder="e.g., Quantum Coding Lab"
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                errors.room_name
                  ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                  : "border-slate-200"
              }`}
              {...register("room_name", { required: "Room Name is required" })}
            />
            {errors.room_name && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.room_name.message}
              </p>
            )}
          </div>

          {/* Grid Layout for Other Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Floor */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaLayerGroup className="text-blue-500" />
                Floor
              </label>
              <input
                type="number"
                placeholder="e.g., 3"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.floor
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200"
                }`}
                {...register("floor", { required: "Floor is required" })}
              />
              {errors.floor && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.floor.message}
                </p>
              )}
            </div>

            {/* Capacity */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaUsers className="text-blue-500" />
                Capacity
              </label>
              <input
                type="number"
                placeholder="e.g., 8"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.capacity
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200"
                }`}
                {...register("capacity", { required: "Capacity is required" })}
              />
              {errors.capacity && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.capacity.message}
                </p>
              )}
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaMoneyBillWave className="text-blue-500" />
                Hourly Rate (৳)
              </label>
              <input
                type="number"
                placeholder="e.g., 500"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.hourly_rate
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200"
                }`}
                {...register("hourly_rate", {
                  required: "Hourly Rate is required",
                })}
              />
              {errors.hourly_rate && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.hourly_rate.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 active:scale-[0.98] transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-cyan-500 shadow-md hover:shadow-blue-500/10 active:scale-[0.98] disabled:opacity-50 transition-all"
            >
              {loading ? "Updating..." : "Update Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
