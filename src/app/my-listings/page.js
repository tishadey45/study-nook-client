"use client";

import { authClient } from "@/lib/auth-client";
import { deleteRoom, getMyListings } from "@/services/studyRoomApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


export default function MyListingsPage() {
  const session = authClient.useSession();
  const user = session?.data?.user;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRooms = async () => {
      try {
        const data = await getMyListings(user.email);
        setRooms(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [user]);

 const handleUpdate = (id) => {
    // Navigate to the update page with the room ID
    window.location.href = `/update-room/${id}`;
  } 

 const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to recover this room!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const response = await deleteRoom(id);

    if (response.deletedCount > 0) {
      Swal.fire({
        title: "Deleted!",
        text: "Study room has been deleted successfully.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });

      setRooms((prev) => prev.filter((room) => room._id !== id));
    }
  } catch (error) {
    console.log(error);

    Swal.fire({
      title: "Error!",
      text: "Failed to delete room.",
      icon: "error",
    });
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Study Room Listings
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-lg border bg-white">
        <table className="table">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Room Name</th>
              <th>Floor</th>
              <th>Capacity</th>
              <th>Rate</th>
              <th>Amenities</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-12">
                  No Study Room Found
                </td>
              </tr>
            ) : (
              rooms.map((room, index) => {
                const amenities =
                  typeof room.amenities === "string"
                    ? JSON.parse(room.amenities)
                    : room.amenities;

                return (
                  <tr key={room._id}>
                    <td>{index + 1}</td>

                    <td>
                      <Image
                        src={room.image}
                        alt={room.room_name}
                        width={80}
                        height={80}
                        className="rounded-xl object-cover"
                      />
                    </td>

                    <td>
                      <div>
                        <h2 className="font-bold text-lg">
                          {room.room_name}
                        </h2>

                        <p className="text-sm text-gray-500 line-clamp-2">
                          {room.description}
                        </p>
                      </div>
                    </td>

                    <td>{room.floor}</td>

                    <td>{room.capacity}</td>

                    <td>৳ {room.hourly_rate}/hr</td>

                    <td>
                      <div className="flex flex-wrap gap-2">
                        {amenities?.map((item, i) => (
                          <span
                            key={i}
                            className="badge badge-outline badge-primary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <Link href={`/update-room/${room._id}`}>
                          <button className="btn btn-sm btn-info text-white">
                            <FaEdit />
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDelete(room._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}