import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white py-2 shadow-lg w-full z-50 fixed top-0 left-0 right-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src={logo} className="h-14 w-auto cursor-pointer" alt="logo" />
        </Link>
        <div className="hidden md:flex space-x-8 text-lg font-semibold tracking-wide">
          <Link
            href="./about"
            className="hover:text-blue-300 transition duration-300"
          >
            About
          </Link>
          <Link
            href="./assessments"
            className="hover:text-blue-300 transition duration-300"
          >
            Assessments
          </Link>
          <Link
            href="./results"
            className="hover:text-blue-300 transition duration-300"
          >
            Results
          </Link>
          <Link
            href="./profile"
            className="hover:text-blue-300 transition duration-300"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
