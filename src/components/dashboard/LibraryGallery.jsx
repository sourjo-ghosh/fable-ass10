import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaRegBookmark } from "react-icons/fa6";

const books = [
  { title: "The Silent Patient", author: "Alex Michaelides", cover: "/cover-1.jpg" },
  { title: "The Midnight Library", author: "Matt Haig", cover: "/cover-2.jpg" },
  { title: "Circe", author: "Madeline Miller", cover: "/cover-3.jpg" },
  { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", cover: "/cover-4.jpg" },
  { title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", cover: "/cover-5.jpg" },
];

export default function LibraryGallery({ title, subtitle, bookmarked = false }) {
  const displayedBooks = bookmarked ? books.slice(1, 5) : books;
  return <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12"><Link href="/dashboard/user" className="inline-flex items-center gap-2 text-sm text-ink-muted no-underline hover:text-gold"><FaArrowLeft className="h-3 w-3" /> Profile</Link><div className="mt-8 flex items-end justify-between gap-4"><div><p className="text-xs font-bold tracking-[0.18em] text-gold uppercase">Your collection</p><h1 className="mt-2 font-serif text-4xl font-semibold text-ink">{title}</h1><p className="mt-2 text-sm text-ink-muted">{subtitle}</p></div><span className="hidden items-center gap-2 text-sm text-ink-muted sm:flex"><FaRegBookmark className="text-gold" /> {displayedBooks.length} books</span></div><section className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">{displayedBooks.map((book) => <article key={book.title} className="group"><div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-bg-card shadow-lg"><Image src={book.cover} alt={`Cover of ${book.title}`} width={240} height={340} className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105" />{bookmarked && <span className="absolute top-3 right-3 rounded-full bg-bg-deep/85 p-2 text-gold"><FaRegBookmark className="h-3 w-3" /></span>}</div><h2 className="mt-3 line-clamp-2 font-serif text-lg font-semibold leading-tight text-ink">{book.title}</h2><p className="mt-1 text-xs text-ink-muted">{book.author}</p><Link href="/browse" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold no-underline hover:text-gold-light">View details <FaArrowRight className="h-2.5 w-2.5" /></Link></article>)}</section></main>;
}
