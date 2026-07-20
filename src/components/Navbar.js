"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Catalogue" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-[100] transition-all duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] ${
        scrolled
          ? "border-b border-white/[0.07] bg-[rgba(12,11,10,0.85)] backdrop-blur-2xl backdrop-saturate-180"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 no-underline transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-gold to-gold-light shadow-[0_4px_16px_rgba(201,169,110,0.35)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c0b0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="font-serif text-2xl font-semibold tracking-tight text-ink">
            Fable
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-[18px] py-2 text-sm font-medium tracking-wide no-underline transition-all duration-250 ${
                isActive(link.href)
                  ? "bg-gold-dim text-gold"
                  : "bg-transparent text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            href="/login"
            className="rounded-full px-5 py-2.5 text-sm font-medium tracking-wide text-ink-muted no-underline transition-colors hover:text-ink"
          >
            Sign In
          </Link>
          <Link href="/signup" className="btn-gold px-6 py-2.5 text-[0.8rem] no-underline">
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="flex cursor-pointer rounded-[10px] border border-white/10 bg-white/[0.06] p-2 text-ink md:hidden"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.07] bg-[rgba(12,11,10,0.97)] px-6 py-5 backdrop-blur-2xl md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`mb-1 block rounded-xl px-4 py-3 text-[0.9rem] font-medium no-underline ${
                isActive(link.href)
                  ? "bg-gold-dim text-gold"
                  : "bg-transparent text-ink-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl border border-white/10 py-[11px] text-center text-sm text-ink-muted no-underline"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="btn-gold justify-center text-center no-underline"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
