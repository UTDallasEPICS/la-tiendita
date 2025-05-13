import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/footer";
import { UserProvider } from "./context/UserContext";
import { getCurrentUser } from "./auth/nextjs/currentUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Tiendita",
  description: "La Tiendita Job Aptitude Survey",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider user={user}>
          <Navbar />
          <main className="pt-10 pb-20">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
