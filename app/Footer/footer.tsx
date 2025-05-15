import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FaYelp } from "react-icons/fa";

export default function Footer() {
  const size = 32;
  return (
    <footer className="w-full py-4 border-t mt-auto bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <Link
              href="https://latienditamckinney.org/contact"
              className="text-lg font-medium hover:underline hover:text-secondary"
            >
              Contact La Tiendita
            </Link>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium mr-2">Connect with us</span>
              <Link
                href="https://www.facebook.com/p/La-Tiendita-100088374031317/"
                target="_blank"
                className="p-2 rounded-full hover:bg-secondary hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={size} />
              </Link>
              <Link
                href="https://www.instagram.com/la_tiendita_mckinneytx/"
                target="_blank"
                className="p-2 rounded-full hover:bg-secondary hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={size} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/jason-hernandez-9b8981120/"
                target="_blank"
                className="p-2 rounded-full hover:bg-secondary hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={size} />
              </Link>
              <Link
                href="https://www.yelp.com/biz/la-tiendita-mckinney"
                target="_blank"
                className="p-2 rounded-full hover:bg-secondary hover:text-white"
                aria-label="Yelp"
              >
                <FaYelp size={size} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
