"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import logo3 from "../../public/logo3.jpeg";

export default function Navbar() {
  const router = useRouter();
  const userId = 1;
  return (
    <nav className="bg-primary text-white py-2 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-8 flex justify-between items-center">
        <button className="flex-shrink-0" onClick={() => router.push("/home")}>
          <Image
            src={logo3}
            className="h-14 w-auto rounded-full object-cover"
            alt="logo"
          />
        </button>
        <div className="hidden md:flex space-x-8 text-xl font-semibold tracking-wide">
          <Link
            href="/about"
            className="hover:text-gray-300 transition duration-300 py-1"
          >
            About
          </Link>
          <Link
            href="/assessments"
            className="hover:text-gray-300 transition duration-300 py-1"
          >
            Surveys
          </Link>
          <Link
            href={`/results/${userId}`}
            className="hover:text-gray-300 transition duration-300 py-1"
          >
            Results
          </Link>
          <Link
            href="/profile"
            className="hover:text-gray-300 transition duration-300 py-1"
          >
            Profile
          </Link>
          <button
            onClick={() => router.push("/login")}
            className="text-xl font-semibold bg-accent rounded-xl py-1 px-4"
          >
            Log in
          </button>
        </div>
      </div>
    </nav>
  );
}
