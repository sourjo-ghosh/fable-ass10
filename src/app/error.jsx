"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaRotateRight, FaHouse } from "react-icons/fa6";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-[70vh] place-items-center px-5 py-20 text-center">
      <section className="max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-400">
          Something went wrong
        </p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-ink sm:text-6xl">
          An unexpected error occurred.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">
          {error?.message || "We encountered an error while loading this page."}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-gold inline-flex items-center gap-2 px-6 py-3"
          >
            <FaRotateRight /> Reset
          </button>
          <Link
            href="/"
            className="btn-ghost inline-flex items-center gap-2 px-6 py-3 no-underline"
          >
            <FaHouse /> Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
