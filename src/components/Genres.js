"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaLightbulb } from "react-icons/fa";
import { IoBookSharp, IoHeart, IoMoon, IoRocket, IoStar, IoTrophy } from "react-icons/io5";
import { SlMagnifierAdd } from "react-icons/sl";
import { GetALlEbooks } from "@/lib/actions/get/getAllEbooks";

const DEFAULT_GENRES = [
  { name: "Fiction", icon: <IoBookSharp />, color: "#c9a96e", glow: "rgba(201,169,110,.15)" },
  { name: "Mystery", icon: <SlMagnifierAdd />, color: "#a78bfa", glow: "rgba(167,139,250,.15)" },
  { name: "Romance", icon: <IoHeart />, color: "#f472b6", glow: "rgba(244,114,182,.15)" },
  { name: "Sci-Fi", icon: <IoRocket />, color: "#38bdf8", glow: "rgba(56,189,248,.15)" },
  { name: "Fantasy", icon: <IoStar />, color: "#34d399", glow: "rgba(52,211,153,.15)" },
  { name: "Horror", icon: <IoMoon />, color: "#f87171", glow: "rgba(248,113,113,.15)" },
  { name: "Non-Fiction", icon: <FaLightbulb />, color: "#fbbf24", glow: "rgba(251,191,36,.15)" },
  { name: "Biography", icon: <IoTrophy />, color: "#fb923c", glow: "rgba(251,146,60,.15)" },
];

function GridGenreCard({ genre, count }) {
  return (
    <Link
      href={`/all-ebooks?genre=${encodeURIComponent(genre.name)}`}
      style={{ "--genre-color": genre.color, "--genre-glow": genre.glow }}
      className="group relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-[20px] border border-white/[0.07] bg-bg-card p-7 no-underline transition-all duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--genre-color)_25%,transparent)] hover:bg-[var(--genre-glow)] hover:shadow-[0_16px_48px_var(--genre-glow),0_0_0_1px_color-mix(in_srgb,var(--genre-color)_8%,transparent)]"
    >
      <div className="pointer-events-none absolute right-[-4px] -bottom-2 select-none text-[5rem] leading-none opacity-[0.08]">
        {genre.icon}
      </div>

      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] text-[1.4rem]"
        style={{
          background: `linear-gradient(135deg, ${genre.color}25, ${genre.color}10)`,
          border: `1px solid ${genre.color}30`,
        }}
      >
        {genre.icon}
      </div>

      <div>
        <h3 className="mb-1 font-serif text-xl font-semibold text-ink">{genre.name}</h3>
        <p className="text-[0.8rem] text-ink-faint">{count} {count === 1 ? "book" : "books"}</p>
      </div>

      <div
        className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: `${genre.color}15` }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={genre.color} strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
        </svg>
      </div>
    </Link>
  );
}

export default function Genres() {
  const [genreCounts, setGenreCounts] = useState({});

  useEffect(() => {
    async function loadGenreData() {
      try {
        const res = await GetALlEbooks();
        if (res?.data && Array.isArray(res.data)) {
          const counts = {};
          res.data.forEach((book) => {
            if (book.genre) {
              counts[book.genre] = (counts[book.genre] || 0) + 1;
            }
          });
          setGenreCounts(counts);
        }
      } catch (err) {
        console.error("Failed to load genre counts:", err);
      }
    }
    loadGenreData();
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg-deep pt-[120px] pb-[120px]">
      <div className="divider-gold mb-[120px]" />

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-16 text-center">
          <div className="section-eyebrow mx-auto mb-5 justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            Browse by Genre
          </div>
          <h2 className="font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.05] font-normal tracking-[-0.02em] text-ink">
            Explore Every{" "}
            <em className="font-serif font-light text-gold italic">World</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[440px] text-[0.95rem] leading-[1.7] text-ink-faint">
            From sweeping epics to intimate dramas — discover stories across every genre imaginable.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {DEFAULT_GENRES.map((genre, i) => (
            <div
              key={genre.name}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <GridGenreCard genre={genre} count={genreCounts[genre.name] || 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
