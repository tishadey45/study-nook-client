import Image from "next/image";
import Link from "next/link";

export default function StudyRoomCard({ studyRoom }) {
  const {
    _id,
    room_name,
    image,
    description,
    floor,
    capacity,
    hourly_rate,
    amenities,
  } = studyRoom;

  return (
    <div className="max-w-sm bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image src={image} alt={room_name} fill className="object-cover" />

        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          Floor {floor}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">{room_name}</h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{description}</p>

        {/* Room Info */}
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Capacity</span>
            <span className="font-semibold">
              {capacity} Person{capacity > 1 && "s"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Hourly Rate</span>
            <span className="font-semibold text-green-600">
              ৳{hourly_rate}/hr
            </span>
          </div>

          <div>
            <p className="text-gray-500 mb-2">Amenities</p>

            <div className="flex flex-wrap gap-2">
              {amenities?.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <Link href={`/all-rooms/${_id}`}>
            <button className="btn btn-primary w-full rounded-xl">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
