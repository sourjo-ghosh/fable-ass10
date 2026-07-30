"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EbookCard from "./EbookCard";
import { GetALlEbooks } from "@/lib/actions/get/getAllEbooks";

export default function FeaturedEbooks() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedEbooks() {
      setLoading(true);
      try {
        const res = await GetALlEbooks();
        if (res?.data && Array.isArray(res.data)) {
          // Display only the first 6 ebooks
          setEbooks(res.data.slice(0, 6));
        }
      } catch (err) {
        console.error("Failed to load featured ebooks:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFeaturedEbooks();
  }, []);

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
              Handpicked selections from our collection of original ebooks across every genre.
            </p>
          </div>

          <Link href="/all-ebooks" className="btn-ghost shrink-0 no-underline">
            View All Titles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {loading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col overflow-hidden rounded-[20px] border border-white/[0.06] bg-bg-card p-3.5 animate-pulse"
              >
                <div className="aspect-[3/4] w-full rounded-xl bg-white/[0.05] mb-3.5" />
                <div className="h-4 w-20 rounded-full bg-white/[0.06] mb-3" />
                <div className="h-5 w-3/4 rounded-md bg-white/[0.08] mb-2" />
                <div className="h-3.5 w-1/2 rounded-md bg-white/[0.05]" />
              </div>
            ))}
          </div>
        ) : ebooks.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.07] bg-bg-card p-8 text-center text-ink-muted">
            No ebooks available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
            {ebooks.map((ebook, i) => {
              const bookId = ebook._id || ebook.id || i;
              const formattedEbook = {
                id: bookId,
                title: ebook.title || "Untitled Ebook",
                writerName: ebook.authorName || ebook.writerName || "Fable Author",
                price: typeof ebook.price === "number" ? ebook.price : parseFloat(ebook.price) || 0,
                genre: ebook.genre || "General",
                status: ebook.status || "available",
                coverImage: ebook.coverImage || null,
              };

              return (
                <Link
                  key={bookId}
                  href={`/all-ebooks/${bookId}`}
                  className="no-underline block animate-scale-in"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <EbookCard ebook={formattedEbook} />
                </Link>
              );
            })}
          </div>
        )}

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
              Join authors publishing their work on Fable. Share your ebooks, set your own prices.
            </p>
          </div>
          <div className="relative">
            <Link href="/signup" className="btn-gold no-underline">
              Start Publishing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
