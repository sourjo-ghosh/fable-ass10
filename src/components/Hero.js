"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "2K+", label: "Original Ebooks" },
  { value: "500+", label: "Published Authors" },
  { value: "10K+", label: "Active Readers" },
  { value: "4.9★", label: "Average Rating" },
];

const genres = ["Fiction", "Mystery", "Romance", "Sci-Fi", "Fantasy", "Horror", "Biography"];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGenre((prev) => (prev + 1) % genres.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden bg-bg-deep">
      <div className="absolute inset-0 z-0">
        <Image
          src="/library-hero.png"
          alt="Fable — A grand library filled with books"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,11,10,0.92)_0%,rgba(12,11,10,0.65)_55%,rgba(12,11,10,0.35)_100%),linear-gradient(to_top,rgba(12,11,10,0.98)_0%,rgba(12,11,10,0.3)_40%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_100%,rgba(12,11,10,0.8)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-6 pt-[100px] pb-10 md:px-12 md:pt-[120px] md:pb-20">
        <div className="max-w-[640px]">
          <div
            className={`animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold-dim py-[5px] pr-4 pl-2 transition-opacity ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            <div className="rounded-full bg-gradient-to-br from-gold to-gold-light px-3 py-[3px] text-[0.6rem] font-extrabold tracking-[0.12em] text-bg-deep uppercase">
              New
            </div>
            <span className="text-[0.78rem] font-medium tracking-wide text-gold">
              500+ authors are now publishing on Fable
            </span>
          </div>

          <h1 className="animate-fade-up [animation-delay:0.1s] mb-0 font-serif text-[clamp(3.2rem,6.5vw,6rem)] leading-none font-light tracking-[-0.03em] text-ink">
            Every great
            <br />
            <em className="mt-1 inline-block font-serif text-[clamp(3.2rem,6.5vw,6rem)] font-normal italic">
              story begins
            </em>
            <br />
            <span className="relative inline-block">
              <span className="text-shimmer font-semibold">with a book.</span>
            </span>
          </h1>

          <div className="animate-fade-up [animation-delay:0.2s] mt-7 mb-8 flex items-center gap-2.5">
            <span className="text-[0.85rem] tracking-wide text-ink-faint">Explore</span>
            <div className="relative h-7 min-w-[100px] overflow-hidden">
              {genres.map((g, i) => (
                <span
                  key={g}
                  className={`absolute top-0 left-0 inline-block rounded-full px-3.5 py-0.5 text-[0.8rem] font-semibold tracking-[0.06em] whitespace-nowrap transition-all duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] ${
                    i === activeGenre
                      ? "translate-y-0 border border-gold/35 bg-gold-dim text-gold opacity-100"
                      : "translate-y-2.5 border border-transparent bg-transparent text-ink-faint opacity-0"
                  }`}
                >
                  {g}
                </span>
              ))}
            </div>
            <span className="text-[0.85rem] text-ink-faint">and beyond</span>
          </div>

          <p className="animate-fade-up [animation-delay:0.2s] mb-11 max-w-[480px] text-[1.05rem] leading-[1.75] font-light text-ink-muted">
            A curated sanctuary of original ebooks. Discover your next obsession from 500+ independent authors — or share your own story with the world.
          </p>

          <div className="animate-fade-up [animation-delay:0.3s] mb-16 flex flex-wrap gap-3">
            <Link href="/browse" className="btn-gold no-underline">
              Browse Library
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/signup" className="btn-ghost no-underline">
              Start Writing
            </Link>
          </div>

          <div className="animate-fade-up [animation-delay:0.4s] flex flex-wrap gap-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`pr-7 ${i > 0 ? "border-l border-white/10 pl-7" : ""}`}
              >
                <div className="font-serif text-[1.9rem] leading-none font-semibold text-ink">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-[0.72rem] tracking-[0.08em] text-ink-faint uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-[1] w-full border-t border-white/[0.06] bg-[rgba(12,11,10,0.7)] backdrop-blur-md">
        <div className="mx-auto flex h-auto max-w-[1280px] flex-wrap items-center gap-5 px-6 py-3 md:h-[72px] md:flex-nowrap md:px-12 md:py-0">
          <div className="relative flex flex-1 items-center md:max-w-[440px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5a5548"
              strokeWidth="2"
              className="pointer-events-none absolute left-4 shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search titles, authors, genres…"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.05] py-2.5 pr-4 pl-[42px] font-[inherit] text-sm text-ink outline-none transition-all focus:border-gold/30 focus:bg-white/[0.08]"
            />
          </div>

          <div className="hidden h-8 w-px bg-white/[0.08] md:block" />

          <div className="hidden gap-2 overflow-hidden md:flex">
            {["Fiction", "Mystery", "Sci-Fi", "Romance", "Fantasy"].map((g) => (
              <Link
                key={g}
                href={`/browse?genre=${g.toLowerCase()}`}
                className="rounded-full border border-white/[0.08] bg-white/[0.05] px-4 py-1.5 text-[0.72rem] font-semibold tracking-[0.06em] whitespace-nowrap text-ink-muted no-underline transition-all hover:border-gold/25 hover:bg-gold-dim hover:text-gold"
              >
                {g}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
