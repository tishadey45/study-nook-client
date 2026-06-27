import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
        </div>
        <Link href="/">
          <Image src={logo} alt="logo" width={120} height={100}></Image>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/" className="text-blue-600 font-bold">
              Home
            </Link>
          </li>
          <li>
            <Link href="/all-rooms" className="text-blue-600 font-bold">
              Rooms
            </Link>
          </li>
           <li>
            <Link href="/add-room`" className="text-blue-600 font-bold">
              Add Room
            </Link>
          </li>
           <li>
            <Link href="/my-listings" className="text-blue-600 font-bold">
              My Listings
            </Link>
          </li>
           <li>
            <Link href="/my-bookings" className="text-blue-600 font-bold">
              My Booking
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-4 ">
        <Link href="/login">
          <button
            className="btn btn-gradient bg-linear-to-r from-blue-400 to-emerald-700 text-white rounded-full 
                 transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            Login
          </button>
        </Link>
        <Link href="/register">
          <button
            className="btn btn-gradient bg-linear-to-r from-blue-400 to-emerald-300 text-white rounded-full 
                 transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            Register
          </button>
        </Link>
         <Link href="/logout">
          <button
            className="btn btn-gradient bg-linear-to-r from-blue-400 to-emerald-300 text-white rounded-full 
                 transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}
