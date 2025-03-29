import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-white py-4 shadow-lg fixed bottom-0 left-0 w-full z-50">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="hidden md:flex space-x-8 text-lg font-semibold tracking-wide">
                    <Link href="https://latienditamckinney.org/contact" className="hover:text-gray-300 transition duration-300">Contact La Tiendita</Link>
                </div>
            </div>
        </nav>
    )
}