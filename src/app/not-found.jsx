import Link from "next/link";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa6";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 py-20 text-center">
      <section className="max-w-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-dim text-2xl text-gold">
          <FaBookOpen />
        </div>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-gold">
          Error 404
        </p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-ink sm:text-6xl">
          This page is not in the story.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">
          The chapter you are looking for may have moved, been removed, or never
          existed.
        </p>
        <Link
          href="/"
          className="btn-gold mt-8 inline-flex items-center gap-2 px-6 py-3 no-underline"
        >
          <FaArrowLeft /> Return home
        </Link>
      </section>
    </main>
  );
}
