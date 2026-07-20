"use client";

import { useState } from "react";
import EbookCard from "./EbookCard";

const featuredEbooks = [
  { id: 1, title: "The Midnight Library", writerName: "Elena Martinez", price: 9.99, genre: "Fiction", status: "available", isFeatured: true, coverImage: "/cover-1.jpg" },
  { id: 2, title: "Stolen Hearts", writerName: "James Chen", price: 5.99, genre: "Romance", status: "available", isFeatured: true, coverImage: "/cover-2.jpg" },
  { id: 3, title: "Digital Dreams", writerName: "Sophie Williams", price: 7.99, genre: "Sci-Fi", status: "sold", isFeatured: true, coverImage: "/cover-3.jpg" },
  { id: 4, title: "Whispers in the Dark", writerName: "Marcus Johnson", price: 4.99, genre: "Mystery", status: "available", isFeatured: true, coverImage: "/cover-4.jpg" },
  { id: 5, title: "Realm of Shadows", writerName: "Aisha Patel", price: 12.99, genre: "Fantasy", status: "available", isFeatured: true, coverImage: "/cover-5.jpg" },
  { id: 6, title: "The Last Echo", writerName: "David Kim", price: 6.99, genre: "Horror", status: "sold", isFeatured: true, coverImage: "/cover-1.jpg" },
];

const tabs = ["All", "Fiction", "Romance", "Sci-Fi", "Mystery", "Fantasy"];

export default function FeaturedEbooks() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? featuredEbooks
    : featuredEbooks.filter((b) => b.genre === activeTab);

  return (
    <section className="relative overflow-hidden bg-bg-deep py-[120px]">
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div
        aria-hidden
        className="pointer-events-none absolute top-[30%] left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,169,110,0.04)_0%,transparent_70%)]"
      />

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="section-eyebrow mb-5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Curated Picks
            </div>
            <h2 className="font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.05] font-normal tracking-[-0.02em] text-ink">
              Featured{" "}
              <em className="font-serif font-light text-gold italic">Ebooks</em>
            </h2>
            <p className="mt-3.5 max-w-[380px] text-[0.95rem] leading-[1.7] text-ink-faint">
              Handpicked selections from our curated collection of original ebooks across every genre.
            </p>
          </div>

          <a href="/browse" className="btn-ghost shrink-0 no-underline">
            View All Titles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="mb-11 flex w-fit flex-wrap gap-1.5 rounded-2xl border border-white/[0.06] bg-bg-card p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded-[10px] border-none px-5 py-2 text-[0.8rem] font-semibold tracking-wide transition-all duration-250 ease-[cubic-bezier(.4,0,.2,1)] ${
                activeTab === tab
                  ? "bg-gradient-to-br from-gold to-gold-light text-bg-deep shadow-[0_4px_12px_rgba(201,169,110,0.3)]"
                  : "bg-transparent text-ink-faint hover:text-ink-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
          {filtered.map((ebook, i) => (
            <div
              key={ebook.id}
              className="animate-scale-in"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <EbookCard ebook={ebook} />
            </div>
          ))}
        </div>

        <div className="relative mt-20 flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-bg-card to-bg-raised p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 right-[10%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.08),transparent)]"
          />
          <div className="relative">
            <div className="mb-3 text-[0.7rem] tracking-[0.15em] text-gold uppercase">For Writers</div>
            <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] font-normal text-ink">
              Share your story with{" "}
              <em className="text-gold italic">the world.</em>
            </h3>
            <p className="mt-3 max-w-[420px] text-[0.9rem] text-ink-faint">
              Join 500+ authors publishing their work on Fable. Set your own prices, keep 85% of revenue.
            </p>
          </div>
          <div className="relative">
            <a href="/signup" className="btn-gold no-underline">
              Start Publishing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
