"use client";
import StudyRoomCard from "@/components/StudyRoomCard";
import { getStudyRooms } from "@/services/studyRoomApi";
import { useEffect, useState } from "react";

export default function AllRoomsPage() {
  const [studyRooms, setStudyRooms] = useState([]);

  useEffect(() => {
    const fetchStudyRooms = async () => {
      try {
        const data = await getStudyRooms();
        setStudyRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchStudyRooms();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        All Study Rooms
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {studyRooms.map((studyRoom) => (
          <StudyRoomCard
            key={studyRoom._id}
            studyRoom={studyRoom}
          />
        ))}
      </div>
    </div>
  );
}