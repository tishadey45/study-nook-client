"use client";

import { useState } from "react";
import BookRoomModal from "@/components/BookRoomModal"; 

export default function BookingSection({ room }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mt-10">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary w-full rounded-xl text-lg shadow-md hover:scale-[1.01] transition-transform"
      >
        Book Now
      </button>
      <BookRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={room}
      />
    </div>
  );
}