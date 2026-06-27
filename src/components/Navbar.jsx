"use client";

import logo from "@/assets/logo.png";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const navLinks = (
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

      {user && (
        <>
          <li>
            <Link href="/add-room" className="text-blue-600 font-bold">
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
              My Bookings
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* Mobile Menu */}

        <div className="navbar-start">

          <div className="dropdown lg:hidden">

            <label tabIndex={0} className="btn btn-ghost">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>

            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-3 shadow bg-base-100 rounded-box w-56"
            >
              {navLinks}
            </ul>

          </div>

          <Link href="/">
            <Image
              src={logo}
              alt="StudyNook"
              width={120}
              priority
            />
          </Link>

        </div>

        {/* Desktop Menu */}

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 font-medium">
            {navLinks}
          </ul>
        </div>

        {/* Right */}

        <div className="navbar-end gap-3">

          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">

              <label tabIndex={0} className="cursor-pointer avatar">

                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                  <Image
                    src={
                      user.image ||
                      "https://ui-avatars.com/api/?name=" + user.name
                    }
                    alt={user.name}
                    width={100}
                    height={100}
                  />

                </div>

              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-60 bg-base-100 rounded-box shadow-lg"
              >
                <li className="px-4 py-2 pointer-events-none">
                  <p className="font-bold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </li>

                <div className="divider my-1"></div>


                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </ul>

            </div>
          ) : (
            <>
              <Link href="/login">
                <button className="btn btn-gradient bg-linear-to-r from-blue-400 to-emerald-700 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="btn btn-gradient bg-linear-to-r from-blue-400 to-emerald-700 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  Register
                </button>
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
}