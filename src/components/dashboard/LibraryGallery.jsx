import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaRegBookmark } from "react-icons/fa6";

export default function LibraryGallery({ title, subtitle, bookmarkBooks }) {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <Link
        href="/dashboard/user"
        className="inline-flex items-center gap-2 text-sm text-ink-muted no-underline hover:text-gold"
      >
        <FaArrowLeft className="h-3 w-3" /> Overview
      </Link>
      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-gold uppercase">
            Your collection
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>
        </div>
        <span className="hidden items-center gap-2 text-sm text-ink-muted sm:flex">
          <FaRegBookmark className="text-gold" /> {bookmarkBooks.length} books
        </span>
      </div>
      {bookmarkBooks.length == 0 ? (
        <section className="mt-8 flex flex-col items-center justify-center py-20 text-center">
          <FaRegBookmark className="text-gold h-12 w-12 mb-4 opacity-40" />
          <h2 className="font-serif text-xl font-semibold text-ink">
            No bookmarks yet
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Books you bookmark will appear here.
          </p>
          <Link
            href="/all-ebooks"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-gold no-underline"
          >
            Browse books <FaArrowRight className="h-2.5 w-2.5" />
          </Link>
        </section>
      ) : (
        <section className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {bookmarkBooks.map((book) => (
            <article key={book._id} className="group">
              <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-bg-card shadow-lg">
                <Image
                  src={book.coverImage}
                  alt={`Cover of ${book.title}`}
                  width={240}
                  height={340}
                  className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105"
                />
                {/* {bookmarked && (
                <span className="absolute top-3 right-3 rounded-full bg-bg-deep/85 p-2 text-gold">
                  <FaRegBookmark className="h-3 w-3" />
                </span>
              )} */}
              </div>
              <h2 className="mt-3 line-clamp-2 font-serif text-lg font-semibold leading-tight text-ink">
                {book.title}
              </h2>
              <p className="mt-1 text-xs text-ink-muted">{book.author}</p>
              <Link
                href={`/all-ebooks/${book._id}`}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold no-underline hover:text-gold-light"
              >
                View details <FaArrowRight className="h-2.5 w-2.5" />
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
