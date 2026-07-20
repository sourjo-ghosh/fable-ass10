"use client";

import Link from "next/link";

const footerLinks = {
  Discover: [
    { label: "Browse Catalogue", href: "/browse" },
    { label: "New Releases", href: "/browse?sort=new" },
    { label: "Featured", href: "/browse?featured=true" },
    { label: "Top Rated", href: "/browse?sort=rating" },
  ],
  Writers: [
    { label: "Publish a Book", href: "/signup" },
    { label: "Author Dashboard", href: "/dashboard" },
    { label: "Pricing", href: "/pricing" },
    { label: "Writing Tips", href: "/blog" },
  ],
  Company: [
    { label: "About Fable", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  {
    name: "X / Twitter",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-bg-footer">
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-10 px-6 py-[72px] md:px-10">
          <div className="max-w-[520px]">
            <div className="section-eyebrow mb-5">Newsletter</div>
            <h3 className="mb-3 font-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] font-normal tracking-[-0.02em] text-ink">
              Stay in the{" "}
              <em className="text-gold italic">story.</em>
            </h3>
            <p className="text-[0.9rem] leading-[1.7] text-ink-faint">
              New releases, featured authors, and curated reading lists — delivered to your inbox monthly.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-[420px] gap-2.5"
          >
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-full border border-white/10 bg-bg-card px-5 py-3.5 font-[inherit] text-sm text-ink outline-none transition-colors focus:border-gold/40"
              />
            </div>
            <button type="submit" className="btn-gold shrink-0 px-6 py-3.5">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 py-16 pb-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Link href="/" className="mb-5 inline-flex items-center gap-2.5 no-underline">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-gradient-to-br from-gold to-gold-light">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c0b0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="font-serif text-[1.4rem] font-semibold text-ink">Fable</span>
          </Link>

          <p className="mb-7 max-w-[280px] text-sm leading-[1.75] text-ink-faint">
            A premium digital bookstore connecting readers with exceptional writers from around the world.
          </p>

          <div className="flex gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.05] text-ink-faint no-underline transition-all hover:border-gold/20 hover:bg-gold/10 hover:text-gold"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h4 className="mb-5 text-[0.65rem] font-bold tracking-[0.15em] text-gold uppercase">
              {category}
            </h4>
            <ul className="flex list-none flex-col gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-faint no-underline transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 border-t border-white/[0.05] px-6 py-6 md:px-10">
        <p className="text-[0.78rem] text-ink-dim">
          © {new Date().getFullYear()} Fable. All rights reserved. Crafted with care for readers everywhere.
        </p>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Cookies"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[0.75rem] text-ink-dim no-underline transition-colors hover:text-ink-muted"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
