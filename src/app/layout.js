import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layout-client";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Fable — Premium Digital Bookstore",
  description:
    "Discover and immerse yourself in a curated world of original ebooks from acclaimed authors. A premium digital reading experience crafted for book lovers.",
  keywords: ["ebooks", "digital books", "reading", "literature", "premium bookstore"],
  openGraph: {
    title: "Fable — Premium Digital Bookstore",
    description: "Discover original ebooks from acclaimed authors.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
