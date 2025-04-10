import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png"

export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-white py-4 shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Image src={logo} className="h-14 w-auto" alt="logo" />
                <div className="hidden md:flex space-x-8 text-lg font-semibold tracking-wide">
                    <Link href="/about" className="hover:text-gray-300 transition duration-300">About</Link>
                    <Link href="/assessments" className="hover:text-gray-300 transition duration-300">Assessments</Link>
                    <Link href="/results" className="hover:text-gray-300 transition duration-300">Results</Link>
                    <Link href="/profile" className="hover:text-gray-300 transition duration-300">Profile</Link>
                </div>
            </div>
        </nav>
    )
}