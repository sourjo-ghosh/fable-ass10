"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const highlights = [
  { value: "2K+", label: "Original Ebooks" },
  { value: "500+", label: "Published Authors" },
  { value: "4.9★", label: "Average Rating" },
];

export default function AuthShell({ title, subtitle, children, footer }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex min-h-dvh bg-bg-deep">
      <div className="relative hidden w-[44%] overflow-hidden lg:flex lg:flex-col">
        <Image
          src="/library-hero.png"
          alt="Fable library"
          fill
          priority
          sizes="44vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,11,10,0.15)_0%,rgba(12,11,10,0.88)_100%),linear-gradient(to_top,rgba(12,11,10,0.95)_0%,transparent_50%)]" />

        <div className="relative z-[1] flex flex-1 flex-col justify-between p-12 xl:p-14">
          <Link href="/" className="inline-flex items-center gap-2.5 no-underline">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-gold to-gold-light shadow-[0_4px_16px_rgba(201,169,110,0.35)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c0b0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-semibold tracking-tight text-ink">Fable</span>
          </Link>

          <div className={`transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="section-eyebrow mb-6">Premium Digital Bookstore</div>
            <h2 className="mb-5 font-serif text-[clamp(2.4rem,3.5vw,3.2rem)] leading-[1.05] font-light tracking-[-0.02em] text-ink">
              Discover &amp; read
              <br />
              <em className="font-serif font-normal italic text-gold">original ebooks</em>
            </h2>
            <p className="max-w-[360px] text-[0.95rem] leading-[1.75] font-light text-ink-muted">
              Join a curated sanctuary of stories from independent authors — read, collect, or publish your own work.
            </p>

            <div className="mt-10 flex flex-wrap gap-0">
              {highlights.map((item, i) => (
                <div
                  key={item.label}
                  className={`pr-6 ${i > 0 ? "border-l border-white/10 pl-6" : ""}`}
                >
                  <div className="font-serif text-[1.5rem] leading-none font-semibold text-ink">
                    {item.value}
                  </div>
                  <div className="mt-1 text-[0.65rem] tracking-[0.08em] text-ink-faint uppercase">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[0.75rem] tracking-wide text-ink-faint">
            © {new Date().getFullYear()} Fable. Crafted for book lovers.
          </p>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,169,110,0.06)_0%,transparent_60%)]" />

        <div className="relative z-[1] flex flex-1 flex-col px-6 py-10 md:px-10 lg:px-14 lg:py-12">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2 no-underline">
              <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-gradient-to-br from-gold to-gold-light">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c0b0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <span className="font-serif text-xl font-semibold text-ink">Fable</span>
            </Link>
            <Link href="/" className="text-sm text-ink-muted no-underline transition-colors hover:text-gold">
              ← Home
            </Link>
          </div>

          <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center">
            <div
              className={`animate-fade-up rounded-[24px] border border-white/[0.08] bg-bg-card/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10 ${mounted ? "opacity-100" : "opacity-0"}`}
            >
              <div className="mb-8">
                <h1 className="font-serif text-[clamp(1.75rem,4vw,2.25rem)] font-normal tracking-[-0.02em] text-ink">
                  {title}
                </h1>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-muted">{subtitle}</p>
              </div>

              {children}
            </div>

            {footer && (
              <p className="animate-fade-up [animation-delay:0.15s] mt-8 text-center text-sm text-ink-faint">
                {footer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
