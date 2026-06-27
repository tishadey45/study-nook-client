import Link from "next/link";

export default function Banner() {
  return (
    <div className="text-center">
       <h1 className="text-4xl font-bold text-center mb-6">
        Find Your Perfect Study Room
      </h1>
      <p>
        Browse and book quiet, private study rooms in your library. List your
        own room and earn.
      </p>

     <div className="flex justify-center mt-8">
       <Link href="/rooms" className="btn btn-primary">
        Explore Rooms
      </Link>
     </div>
    </div>
  );
}