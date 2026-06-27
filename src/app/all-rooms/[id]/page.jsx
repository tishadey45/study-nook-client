import { getStudyRoomsById } from "@/services/studyRoomApi";
import Image from "next/image";
import BookingSection from "@/components/BookingSection";

export default async function StudyRoomDetails({ params }) {
  const { id } = await params;
  const room = await getStudyRoomsById(id);

  if (!room) {
    return <div className="text-center py-20 text-red-500">Room not found!</div>;
  }

  const {
    room_name,
    image,
    description,
    floor,
    capacity,
    hourly_rate,
    amenities,
  } = room;

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl overflow-hidden border">
        {/* Left Side */}
        <div className="relative min-h-100">
          <Image
            src={image || "/placeholder.jpg"}
            alt={room_name}
            fill
            className="object-cover"
            priority
          />

          <span className="absolute top-5 left-5 bg-primary text-white px-5 py-2 rounded-full font-semibold shadow z-10">
            Floor {floor}
          </span>
        </div>

        {/* Right Side */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{room_name}</h1>
            <p className="text-gray-500 leading-8 mb-8">{description}</p>

            {/* Room Info */}
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-3">
                <span className="font-medium text-gray-500">Floor</span>
                <span className="font-bold">{floor}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium text-gray-500">Capacity</span>
                <span className="font-bold">{capacity} Persons</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium text-gray-500">Hourly Rate</span>
                <span className="font-bold text-primary">
                  ৳ {hourly_rate} / hour
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-3">
                {amenities?.map((item, index) => (
                  <span key={index} className="badge badge-outline badge-lg">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Button & Modal Section (Client Component) */}
          <BookingSection room={room} />
        </div>
      </div>
    </div>
  );
}