"use client";

import { FaLightbulb } from "react-icons/fa";
import { IoBookSharp, IoHeart, IoMoon, IoRocket, IoStar, IoTrophy } from "react-icons/io5";
import { SlMagnifierAdd } from "react-icons/sl";

const genres = [
  { name: "Fiction", count: 124, icon: <IoBookSharp />, color: "#c9a96e", glow: "rgba(201,169,110,.15)" },
  { name: "Mystery", count: 89, icon: <SlMagnifierAdd />, color: "#a78bfa", glow: "rgba(167,139,250,.15)" },
  { name: "Romance", count: 156, icon: <IoHeart />, color: "#f472b6", glow: "rgba(244,114,182,.15)" },
  { name: "Sci-Fi", count: 67, icon: <IoRocket />, color: "#38bdf8", glow: "rgba(56,189,248,.15)" },
  { name: "Fantasy", count: 112, icon: <IoStar />, color: "#34d399", glow: "rgba(52,211,153,.15)" },
  { name: "Horror", count: 45, icon: <IoMoon />, color: "#f87171", glow: "rgba(248,113,113,.15)" },
  { name: "Non-Fiction", count: 98, icon: <FaLightbulb />, color: "#fbbf24", glow: "rgba(251,191,36,.15)" },
  { name: "Biography", count: 34, icon: <IoTrophy />, color: "#fb923c", glow: "rgba(251,146,60,.15)" },
];

function GenreChip({ genre }) {
  return (
    <a
      href={`/browse?genre=${genre.name.toLowerCase()}`}
      style={{ "--genre-color": genre.color, "--genre-glow": genre.glow }}
      className="group inline-flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-[color-mix(in_srgb,var(--genre-color)_15%,transparent)] bg-bg-card px-7 py-3.5 whitespace-nowrap no-underline transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] hover:scale-[1.04] hover:border-[color-mix(in_srgb,var(--genre-color)_38%,transparent)] hover:bg-[var(--genre-glow)] hover:shadow-[0_8px_32px_var(--genre-glow)]"
    >
      <span className="text-[1.1rem] leading-none">{genre.icon}</span>
      <span className="text-sm font-semibold text-ink">{genre.name}</span>
      <span
        className="rounded-full px-2 py-0.5 text-[0.65rem] font-bold tracking-wide"
        style={{
          background: `${genre.color}18`,
          color: genre.color,
        }}
      >
        {genre.count}
      </span>
    </a>
  );
}

function GridGenreCard({ genre }) {
  return (
    <a
      href={`/browse?genre=${genre.name.toLowerCase()}`}
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
        <p className="text-[0.8rem] text-ink-faint">{genre.count} books</p>
      </div>

      <div
        className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: `${genre.color}15` }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={genre.color} strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
        </svg>
      </div>
    </a>
  );
}

export default function Genres() {
  const doubled = [...genres, ...genres];

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
          {genres.map((genre, i) => (
            <div
              key={genre.name}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <GridGenreCard genre={genre} />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="relative mt-20 overflow-hidden pt-6 pb-2">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-[2] w-[120px] bg-gradient-to-r from-bg-deep to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-[2] w-[120px] bg-gradient-to-l from-bg-deep to-transparent" />

        <div className="marquee-track animate-marquee gap-3 pl-3">
          {doubled.map((genre, i) => (
            <GenreChip key={`${genre.name}-${i}`} genre={genre} />
          ))}
        </div>
      </div> */}
    </section>
  );
}
