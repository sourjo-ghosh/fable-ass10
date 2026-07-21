"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const authRoutes = ["/login", "/signup"];

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {!isAuthRoute && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAuthRoute && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0c0b0a",
            color: "#faf8f4",
            border: "1px solid rgba(201,169,110,0.12)",
            fontFamily: "var(--font-sans)",
          },
        }}
      />
    </>
  );
}
