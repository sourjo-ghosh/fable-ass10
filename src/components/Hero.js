"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBookOpen, FaFeatherPointed, FaQuoteLeft, FaArrowRight } from "react-icons/fa6";

const stats = [
  { value: "2,000+", label: "Original Ebooks" },
  { value: "500+", label: "Acclaimed Authors" },
  { value: "50K+", label: "Avid Readers" },
  { value: "4.9★", label: "Average Rating" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-between overflow-hidden bg-bg-deep pt-[84px]">
      {/* Ambient Lighting Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.1)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-10 left-10 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.05)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_0%,rgba(12,11,10,0.4)_0%,rgba(12,11,10,0.96)_70%,#0c0b0a_100%)]" />
      </div>

      {/* Hero Body Content */}
      <div className="relative z-[1] mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-6 py-12 md:px-10 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Editorial Copy & Literary Tone */}
          <div className="flex flex-col items-start lg:col-span-7">
            
            {/* Eyebrow Badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold-dim px-4 py-1.5 backdrop-blur-md shadow-[0_2px_16px_rgba(201,169,110,0.12)]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[0.68rem] font-bold tracking-[0.2em] text-gold uppercase">
                A Reader&apos;s Haven
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[0.72rem] font-medium text-ink-muted">
                Sanctuary of Stories
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-6 font-serif text-[clamp(2.9rem,5.8vw,5.4rem)] leading-[1.04] font-light tracking-[-0.03em] text-ink">
              Where extraordinary <br />
              <em className="font-serif font-normal italic text-gold">stories meet</em> <br />
              <span className="font-semibold text-gradient-gold">discerning readers.</span>
            </h1>

            {/* Philosophical Literary Quote Card */}
            <div className="mb-8 max-w-[540px] rounded-2xl border border-white/[0.08] bg-bg-card/70 p-5 backdrop-blur-sm shadow-lg">
              <div className="flex items-start gap-3">
                <FaQuoteLeft className="text-gold/60 text-lg shrink-0 mt-1" />
                <div>
                  <p className="font-serif text-sm sm:text-base italic text-ink/90 leading-relaxed">
                    &ldquo;I have always imagined that Paradise will be a kind of library.&rdquo;
                  </p>
                  <span className="mt-2 block text-xs font-semibold tracking-wider text-gold uppercase">
                    — Jorge Luis Borges
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mb-14 flex flex-wrap items-center gap-4">
              <Link href="/all-ebooks" className="btn-gold no-underline inline-flex items-center gap-2.5 px-7 py-3.5 text-sm">
                <FaBookOpen />
                <span>Explore the Library</span>
                <FaArrowRight className="text-xs" />
              </Link>
              <Link href="/signup" className="btn-ghost no-underline inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                <FaFeatherPointed />
                <span>Share Your Writing</span>
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

          {/* Right Column: Serene Library & Reading Photography Showcase */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <div className="relative w-full max-w-[440px] lg:max-w-[480px]">
              
              {/* Golden Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />

              {/* Photo Frame Card */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/12 bg-[#131210] p-3 shadow-[0_32px_90px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-700 hover:border-gold/40">
                
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/luxury-library-hero.jpg"
                    alt="Majestic Luxury Library Sanctuary"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle Lighting Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-transparent to-[#0c0b0a]/30" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-gold/40 bg-bg-deep/85 px-4 py-1.5 backdrop-blur-md shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    <span className="text-[0.68rem] font-bold tracking-[0.15em] text-gold uppercase">
                      Reading Sanctuary
                    </span>
                  </div>
                </div>

                {/* Overlaid Literary Quote Card */}
                <div className="relative -mt-16 z-10 mx-2 rounded-2xl border border-white/10 bg-[rgba(19,18,16,0.94)] p-4 shadow-xl backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gold">
                        Literary Quote
                      </div>
                      <p className="mt-1 font-serif text-xs sm:text-sm text-ink-muted italic">
                        &ldquo;A room without books is like a body without a soul.&rdquo;
                      </p>
                      <span className="mt-1 block text-[0.65rem] text-gold/80 font-semibold">
                        — Marcus Tullius Cicero
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Glass Rating Badge (Top Right) */}
              <div className="absolute -top-4 -right-4 z-20 hidden sm:flex items-center gap-3 rounded-2xl border border-white/12 bg-[#1a1815]/95 p-3.5 shadow-2xl backdrop-blur-xl">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-light text-bg-deep font-bold text-xs shadow-md">
                  4.9★
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-wider text-gold">
                    Reader Favorite
                  </div>
                  <div className="text-xs font-medium text-ink">
                    Loved by 50,000+ Readers
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
