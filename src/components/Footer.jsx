import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link href="/">
            <Image src={logo} alt="logo" width={120} height={100}></Image>
          </Link>
          <p className="text-sm leading-6 text-gray-400">
            A modern platform for booking quiet and comfortable study rooms
            easily anytime, anywhere.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Useful Links
          </h3>

          <ul className="space-y-3">
            <li>
              <a href="/" className="hover:text-cyan-400 duration-300">
                Home
              </a>
            </li>

            <li>
              <a href="/rooms" className="hover:text-cyan-400 duration-300">
                Rooms
              </a>
            </li>

            <li>
              <a href="/about" className="hover:text-cyan-400 duration-300">
                About
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Contact Info
          </h3>

          <p className="mb-2 text-gray-400">Email: support@studynook.com</p>

          <p className="mb-5 text-gray-400">Phone: +880 1234-567890</p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 duration-300"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-black duration-300"
            >
              <FaXTwitter />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-blue-700 hover:border-blue-700 duration-300"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © 2026 StudyNook. All rights reserved.
      </div>
    </footer>
  );
}
