"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const authRoutes = ["/login", "/signup"];

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {!isAuthRoute && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAuthRoute && <Footer />}
    </>
  );
}
