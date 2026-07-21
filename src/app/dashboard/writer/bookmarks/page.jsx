import Image from "next/image";
import WriterPageHeader from "@/components/dashboard/WriterPageHeader";
import { FaRegBookmark } from "react-icons/fa6";

const books = [
  ["The Midnight Library", "Matt Haig", "/cover-2.jpg"],
  ["Circe", "Madeline Miller", "/cover-3.jpg"],
  ["Tomorrow, and Tomorrow, and Tomorrow", "Gabrielle Zevin", "/cover-5.jpg"],
];
export default function WriterBookmarksPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <WriterPageHeader
        title="Bookmarks"
        subtitle="Stories and ideas you saved for inspiration."
      />
      <section className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {books.map(([title, author, cover]) => (
          <article key={title}>
            <div className="relative overflow-hidden rounded-xl border border-white/[.08] bg-bg-card">
              <Image
                src={cover}
                alt={`Cover of ${title}`}
                width={240}
                height={340}
                className="aspect-[3/4] w-full object-cover"
              />
              <span className="absolute top-3 right-3 rounded-full bg-bg-deep/85 p-2 text-gold">
                <FaRegBookmark className="h-3 w-3" />
              </span>
            </div>
            <h2 className="mt-3 font-serif text-lg font-semibold leading-tight text-ink">
              {title}
            </h2>
            <p className="mt-1 text-xs text-ink-muted">{author}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
