"use client";

import { useState } from "react";
import Image from "next/image";

const genreColors = {
  Fiction: { from: "#c9a96e", to: "#a07842" },
  Romance: { from: "#e879a0", to: "#be185d" },
  "Sci-Fi": { from: "#38bdf8", to: "#0369a1" },
  Mystery: { from: "#a78bfa", to: "#6d28d9" },
  Fantasy: { from: "#34d399", to: "#059669" },
  Horror: { from: "#f87171", to: "#b91c1c" },
  "Non-Fiction": { from: "#fbbf24", to: "#b45309" },
  Biography: { from: "#fb923c", to: "#c2410c" },
  default: { from: "#c9a96e", to: "#a07842" },
};

export default function EbookCard({ ebook }) {
  const [hovered, setHovered] = useState(false);
  const colors = genreColors[ebook.genre] || genreColors.default;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-[20px] transition-all duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] ${
        hovered
          ? "scale-[1.02] -translate-y-2 border-gold/18 bg-bg-raised shadow-[0_0_0_1px_rgba(201,169,110,0.12),0_8px_16px_rgba(0,0,0,0.4),0_24px_64px_rgba(0,0,0,0.5),0_0_40px_rgba(201,169,110,0.05)]"
          : "translate-y-0 scale-100 border-white/[0.07] bg-bg-card shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
      }`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-deep">
        {ebook.coverImage ? (
          <Image
            src={ebook.coverImage}
            alt={ebook.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
            className={`object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.4,0,.2,1)] ${hovered ? "scale-[1.08]" : "scale-100"}`}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${colors.from}18, ${colors.to}10)` }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a09880" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A9 9 0 006 18c1.052 0 2.062-.18 3-.512m0-13.042A8.967 8.967 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25A9 9 0 0118 18c-1.052 0-2.062-.18-3-.512" />
            </svg>
          </div>
        )}

        <div
          className={`absolute inset-0 flex items-end justify-center bg-gradient-to-t from-bg-deep/80 to-transparent p-4 transition-opacity duration-[400ms] ${hovered ? "opacity-100" : "opacity-0"}`}
        >
          <button
            className={`cursor-pointer rounded-full border-none bg-gradient-to-br from-gold to-gold-light px-5 py-2 text-[0.75rem] font-bold tracking-[0.05em] text-bg-deep transition-transform duration-300 delay-100 ${hovered ? "translate-y-0" : "translate-y-2.5"}`}
          >
            Preview
          </button>
        </div>

        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {ebook.status === "sold" && (
            <span className="rounded-full border border-white/10 bg-bg-deep/90 px-2.5 py-[3px] text-[0.62rem] font-bold tracking-[0.08em] text-red-400 uppercase backdrop-blur-sm">
              Sold
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="mb-2">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold tracking-[0.1em] uppercase"
            style={{
              background: `linear-gradient(135deg, ${colors.from}22, ${colors.to}14)`,
              border: `1px solid ${colors.from}30`,
              color: colors.from,
            }}
          >
            {ebook.genre}
          </span>
        </div>

        <h3 className="mb-1 line-clamp-2 font-serif text-[0.95rem] leading-snug font-semibold text-ink">
          {ebook.title}
        </h3>

        <p className="mb-3 text-[0.72rem] text-ink-faint">{ebook.writerName}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-serif text-[1.1rem] font-semibold text-gold">
            ${ebook.price}
          </span>
          <div className="flex items-center gap-[3px]">
            <span className="text-[0.75rem] text-gold">★</span>
            <span className="text-[0.72rem] font-semibold text-ink-muted">4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
}
