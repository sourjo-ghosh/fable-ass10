"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "2,000+", label: "Original Ebooks" },
  { value: "500+", label: "Acclaimed Authors" },
  { value: "50K+", label: "Avid Readers" },
  { value: "4.9★", label: "Average Rating" },
];

const genreTags = ["Fiction", "Literary", "Mystery", "Sci-Fi", "Romance", "Philosophy"];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Fiction");

  return (
    <section className="relative flex min-h-dvh flex-col justify-between overflow-hidden bg-bg-deep pt-[84px]">
      {/* Background Library Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/library-hero.png"
          alt="Fable Sanctuary"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] opacity-25 mix-blend-luminosity filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_0%,rgba(12,11,10,0.5)_0%,rgba(12,11,10,0.96)_70%,#0c0b0a_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(12,11,10,0.9)_70%,#0c0b0a_100%)]" />
        <div className="absolute top-0 right-1/3 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.08)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Hero Body Content */}
      <div className="relative z-[1] mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-6 py-12 md:px-10 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Editorial Copy */}
          <div className="flex flex-col items-start lg:col-span-7">
            
            {/* Eyebrow Tag */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold-dim px-4 py-1.5 backdrop-blur-md shadow-[0_2px_16px_rgba(201,169,110,0.12)]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[0.68rem] font-bold tracking-[0.2em] text-gold uppercase">
                A Reader's Sanctuary
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[0.72rem] font-medium text-ink-muted">
                Original Works Only
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-6 font-serif text-[clamp(2.9rem,5.8vw,5.6rem)] leading-[1.03] font-light tracking-[-0.03em] text-ink">
              Where extraordinary <br />
              <em className="font-serif font-normal italic text-gold">stories meet</em> <br />
              <span className="text-shimmer font-semibold">discerning readers.</span>
            </h1>

            {/* Subtitle */}
            <p className="mb-8 max-w-[500px] text-[1.05rem] leading-[1.75] font-light text-ink-muted">
              Immerse yourself in a curated digital bookstore of original ebooks from 500+ independent authors — crafted for book lovers who appreciate elegance.
            </p>

            {/* Interactive Genre Selector */}
            {/* <div className="mb-9 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[0.75rem] font-bold tracking-[0.12em] text-ink-faint uppercase">
                Explore Genres:
              </span>
              {genreTags.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGenre(g)}
                  className={`cursor-pointer rounded-full border px-3.5 py-1 text-[0.78rem] font-medium tracking-wide transition-all duration-300 ${
                    selectedGenre === g
                      ? "border-gold/50 bg-gold-dim text-gold shadow-[0_2px_12px_rgba(201,169,110,0.2)]"
                      : "border-white/10 bg-white/[0.03] text-ink-muted hover:border-white/20 hover:text-ink"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div> */}

            {/* CTAs */}
            <div className="mb-14 flex flex-wrap items-center gap-4">
              <Link href="/browse" className="btn-gold no-underline">
                <span>Explore Collection</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/signup" className="btn-ghost no-underline">
                Publish Your Story
              </Link>
            </div>

            {/* Metrics */}
            <div className="grid w-full max-w-[560px] grid-cols-2 gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <div className="font-serif text-[1.9rem] leading-none font-semibold text-ink">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[0.68rem] font-bold tracking-[0.12em] text-ink-faint uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Editorial Photography Visual Showcase */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <div className="relative w-full max-w-[440px] lg:max-w-[480px]">
              
              {/* Soft Golden Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.14)_0%,transparent_70%)] blur-3xl pointer-events-none" />

              {/* Editorial Frame Card */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/12 bg-[#131210] p-3 shadow-[0_32px_90px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-700 hover:border-gold/40 hover:shadow-[0_40px_100px_rgba(201,169,110,0.15)]">
                
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/hero-luxury.png"
                    alt="Luxury Digital Bookstore Experience"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle Lighting Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-transparent to-[#0c0b0a]/30" />

                  {/* Top Floating Pill */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-gold/40 bg-bg-deep/85 px-4 py-1.5 backdrop-blur-md shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    <span className="text-[0.68rem] font-bold tracking-[0.15em] text-gold uppercase">
                      Curated Selection
                    </span>
                  </div>
                </div>

                {/* Overlaid Editorial Book Feature Banner */}
                <div className="relative -mt-16 z-10 mx-2 rounded-2xl border border-white/10 bg-[rgba(19,18,16,0.94)] p-4 shadow-xl backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gold">
                        Featured Selection
                      </div>
                      <h4 className="mt-0.5 font-serif text-lg font-medium text-ink">
                        The Midnight Library
                      </h4>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        by Elena Martinez • <span className="text-gold">4.9★</span> (2.4K Reads)
                      </p>
                    </div>

                    <Link
                      href="/browse"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-bg-deep shadow-md transition-transform hover:scale-105 no-underline"
                      aria-label="View featured ebook"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

              </div>

              {/* Floating Glass Rating Badge (Top Right) */}
              <div className="absolute -top-4 -right-4 z-20 flex items-center gap-3 rounded-2xl border border-white/12 bg-[#1a1815]/95 p-3.5 shadow-2xl backdrop-blur-xl hidden sm:flex">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-light text-bg-deep font-bold text-xs shadow-md">
                  4.9★
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-wider text-gold">
                    Reader Favorite
                  </div>
                  <div className="text-xs font-medium text-ink">
                    10,000+ Verified Ratings
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Integrated Search Bar */}
      <div className="relative z-[1] w-full border-t border-white/[0.08] bg-[rgba(12,11,10,0.88)] py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-10">
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/browse?q=${encodeURIComponent(searchQuery)}`;
              }
            }}
            className="relative flex w-full items-center md:max-w-[480px]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a09880"
              strokeWidth="2"
              className="pointer-events-none absolute left-4 shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or keyword…"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pr-24 pl-12 font-[inherit] text-sm text-ink outline-none transition-all placeholder:text-ink-faint focus:border-gold/40 focus:bg-white/[0.08]"
            />
            <button
              type="submit"
              className="absolute right-2.5 cursor-pointer rounded-lg bg-gradient-to-br from-gold to-gold-light px-4 py-1.5 text-xs font-bold text-bg-deep transition-transform active:scale-95"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-2 overflow-x-auto text-xs text-ink-muted">
            <span className="shrink-0 font-bold tracking-wider text-gold uppercase text-[0.68rem]">
              Trending Topics:
            </span>
            {["Dark Romance", "AI Sci-Fi", "High Fantasy", "Psychological Thriller"].map((topic) => (
              <Link
                key={topic}
                href={`/browse?q=${encodeURIComponent(topic)}`}
                className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-ink-muted no-underline transition-all hover:border-gold/30 hover:bg-gold-dim hover:text-gold"
              >
                {topic}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
