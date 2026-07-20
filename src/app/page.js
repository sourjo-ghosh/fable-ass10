import Hero from "@/components/Hero";
import FeaturedEbooks from "@/components/FeaturedEbooks";
import TopWriters from "@/components/TopWriters";
import Genres from "@/components/Genres";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedEbooks />
      <TrustSection />
      <TopWriters />
      <Genres />
    </>
  );
}
