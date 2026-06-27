/* eslint-disable react-hooks/incompatible-library */
"use client";

import { authClient } from "@/lib/auth-client";
import { addStudyRoom } from "@/services/studyRoomApi";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCoins,FaLayerGroup,FaUsers,FaLaptopHouse,FaInfoCircle } from "react-icons/fa";
import { PiSubtitlesDuotone } from "react-icons/pi";
import { TbPhoto } from "react-icons/tb";

export default function AddStudyRoomForm() {
  const [loading, setLoading] = useState(false);
  const userData = authClient.useSession();
  const user = userData?.data?.user;
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    // setValue,
    formState: { errors },
  } = useForm();

  const imageFile = watch("image");

  const router = useRouter();

  const onSubmit = async (data) => {
    // console.log("data", data);
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("room_name", data.room_name);
      formData.append("description", data.description);
      formData.append("floor", data.floor);
      formData.append("capacity", data.capacity);
      formData.append("hourly_rate", data.hourly_rate);
      formData.append("image", data.image[0]);

      formData.append(
        "amenities",
        JSON.stringify(
          data.amenities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );

      formData.append(
        "organizer",
        JSON.stringify({
          name: user?.name,
          email: user?.email,
          photo: user?.image,
        }),
      );

      const response = await addStudyRoom(formData);
      console.log(response);

      toast.success("Study Room Added Successfully");
      reset();
      router.push("/all-rooms");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white border border-slate-100 shadow-xl rounded-2xl p-6 md:p-10 transition-all">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Add New Study Room
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            Create a premium space for students and professionals to collaborate.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Room Name */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <PiSubtitlesDuotone className="text-blue-500 text-lg" />
              Room Name
            </label>
            <input
              type="text"
              placeholder="e.g., Quantum Coding Lab, Quiet Zone A"
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                errors.room_name ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
              }`}
              {...register("room_name", { required: "Room name is required" })}
            />
            {errors.room_name && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                {errors.room_name.message}
              </p>
            )}
          </div>

          {/* Grid section for short inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Floor */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaLayerGroup  className="text-blue-500" />
                Floor
              </label>
              <input
                type="number"
                placeholder="e.g., 3"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.floor ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
                }`}
                {...register("floor", { required: "Floor is required" })}
              />
              {errors.floor && (
                <p className="text-red-500 text-xs mt-1.5">{errors.floor.message}</p>
              )}
            </div>

            {/* Capacity */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaUsers className="text-blue-500" />
                Capacity (Persons)
              </label>
              <input
                type="number"
                placeholder="e.g., 10"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.capacity ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
                }`}
                {...register("capacity", { required: "Capacity is required" })}
              />
              {errors.capacity && (
                <p className="text-red-500 text-xs mt-1.5">{errors.capacity.message}</p>
              )}
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaCoins className="text-blue-500" />
                Hourly Rate ($)
              </label>
              <input
                type="number"
                placeholder="e.g., 25"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.hourly_rate ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
                }`}
                {...register("hourly_rate", { required: "Hourly rate is required" })}
              />
              {errors.hourly_rate && (
                <p className="text-red-500 text-xs mt-1.5">{errors.hourly_rate.message}</p>
              )}
            </div>

            {/* Amenities */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaLaptopHouse className="text-blue-500" />
                Amenities
              </label>
              <input
                type="text"
                placeholder="WiFi, AC, Projector, Whiteboard"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.amenities ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
                }`}
                {...register("amenities", { required: "Amenities are required" })}
              />
              {errors.amenities && (
                <p className="text-red-500 text-xs mt-1.5">{errors.amenities.message}</p>
              )}
            </div>
          </div>

          {/* Room Description */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <FaInfoCircle className="text-blue-500" />
              Room Description
            </label>
            <textarea
              rows={4}
              placeholder="Provide a detailed description of the room's setup, environment, and availability..."
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none ${
                errors.description ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
              }`}
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1.5">{errors.description.message}</p>
            )}
          </div>

          {/* Room Photo Upload */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <TbPhoto className="text-blue-500 text-lg" />
              Room Photo
            </label>

            <div className="group relative flex flex-col items-center justify-center w-full min-h-35 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-all duration-200 p-4 text-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                {...register("image", { required: "Image is required" })}
              />
              
              {!imageFile?.[0] ? (
                <div className="space-y-1.5 pointer-events-none">
                  <p className="text-sm font-medium text-slate-700">Click to upload or drag & drop</p>
                  <p className="text-xs text-slate-400">PNG, JPG or WEBP up to 5MB</p>
                </div>
              ) : (
                <div className="relative z-20 flex flex-col items-center gap-2 pointer-events-auto">
                  <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                    <Image
                      src={URL.createObjectURL(imageFile[0])}
                      alt="preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setValue("image", null);
                    }}
                    className="text-xs font-medium text-red-500 hover:text-red-600 underline"
                  >
                    Remove photo
                  </button>
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-red-500 text-xs mt-1.5">{errors.image.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-blue-500/10 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all duration-150"
            >
              {loading ? "Adding Room..." : "Add Study Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}