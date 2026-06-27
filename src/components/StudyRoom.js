"use client";
import { getStudyRooms } from "@/services/studyRoomApi";
import StudyRoomCard from "./StudyRoomCard";
import { useEffect, useState } from "react";

export default function AvailableStudyRoom() {
  const [studyRooms, setStudyRooms] = useState([]);
  console.log(studyRooms)
  useEffect(() => {
    const fetchStudyRooms = async () => {
      try {
        const data = await getStudyRooms();
        setStudyRooms(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchStudyRooms();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        Available StudyRoom
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-10 ">
        {studyRooms.slice(0,6).map((studyRoom) => (
          <StudyRoomCard
            key={studyRoom._id}
            studyRoom={studyRoom}
          />
        ))}
      </div>
    </div>
  );
}
