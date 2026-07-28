"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaMagnifyingGlass,
  FaBookOpen,
  FaRotateRight,
  FaStar,
} from "react-icons/fa6";
import { GetALlEbooks } from "@/lib/actions/Ebooks";

// Curated genre badge styling palette
const GENRE_PALETTES = {
  Fantasy: { from: "#34d399", to: "#059669", bg: "rgba(52, 211, 153, 0.12)", border: "rgba(52, 211, 153, 0.3)", text: "#34d399" },
  Fiction: { from: "#c9a96e", to: "#a07842", bg: "rgba(201, 169, 110, 0.12)", border: "rgba(201, 169, 110, 0.3)", text: "#c9a96e" },
  Romance: { from: "#f472b6", to: "#db2777", bg: "rgba(244, 114, 182, 0.12)", border: "rgba(244, 114, 182, 0.3)", text: "#f472b6" },
  "Sci-Fi": { from: "#38bdf8", to: "#0284c7", bg: "rgba(56, 189, 248, 0.12)", border: "rgba(56, 189, 248, 0.3)", text: "#38bdf8" },
  Mystery: { from: "#c084fc", to: "#7e22ce", bg: "rgba(192, 132, 252, 0.12)", border: "rgba(192, 132, 252, 0.3)", text: "#c084fc" },
  Horror: { from: "#f87171", to: "#dc2626", bg: "rgba(248, 113, 113, 0.12)", border: "rgba(248, 113, 113, 0.3)", text: "#f87171" },
  "Non-Fiction": { from: "#fbbf24", to: "#d97706", bg: "rgba(251, 191, 36, 0.12)", border: "rgba(251, 191, 36, 0.3)", text: "#fbbf24" },
  Biography: { from: "#fb923c", to: "#ea580c", bg: "rgba(251, 146, 60, 0.12)", border: "rgba(251, 146, 60, 0.3)", text: "#fb923c" },
  default: { from: "#c9a96e", to: "#a07842", bg: "rgba(201, 169, 110, 0.12)", border: "rgba(201, 169, 110, 0.3)", text: "#c9a96e" },
};

export default function AllEbooksPage() {
  const router = useRouter();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Fetch ebooks using actual GetALlEbooks server action from @/lib/actions/Ebooks
  const fetchEbooksData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await GetALlEbooks();
      if (res?.data && Array.isArray(res.data)) {
        setEbooks(res.data);
      } else if (res?.error) {
        setError(res.error);
        setEbooks([]);
      } else {
        setEbooks([]);
      }
    } catch (err) {
      console.error("Failed to fetch ebooks:", err);
      setError(err.message || "Failed to load ebooks from the API.");
      setEbooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEbooksData();
  }, []);

  // Compute genres list dynamically
  const availableGenres = useMemo(() => {
    const genresSet = new Set(["All"]);
    ebooks.forEach((item) => {
      if (item.genre) genresSet.add(item.genre);
    });
    return Array.from(genresSet);
  }, [ebooks]);

  // Filtered and sorted ebooks
  const filteredEbooks = useMemo(() => {
    return ebooks
      .filter((book) => {
        const titleMatch = book.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const authorMatch = (book.authorName || book.writerName || "").toLowerCase().includes(searchQuery.toLowerCase());
        const genreMatch = (book.genre || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSearch = titleMatch || authorMatch || genreMatch;

        const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;

        return matchesSearch && matchesGenre;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
        if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
        if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
        return 0;
      });
  }, [ebooks, searchQuery, selectedGenre, sortBy]);

  return (
    <main className="min-h-screen bg-bg-deep text-ink pt-28 pb-20 px-4 sm:px-6 lg:px-12">
      {/* Background Decorative Glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-[radial-gradient(ellipse,rgba(201,169,110,0.06)_0%,transparent_70%)] z-0"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.07] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gold uppercase mb-3 bg-gold-dim px-3.5 py-1.5 rounded-full border border-gold/20">
              <FaBookOpen className="text-gold" /> Explore Catalogue
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink">
              All <em className="font-serif text-gold italic font-light">Ebooks</em>
            </h1>
            <p className="mt-2.5 max-w-2xl text-sm sm:text-base text-ink-faint">
              Browse through our live collection of digital books directly from the server.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-3 text-xs font-medium text-ink-muted">
            <span className="rounded-xl border border-white/[0.08] bg-bg-card px-4 py-2.5 shadow-sm">
              Total Books: <strong className="text-gold font-semibold">{ebooks.length}</strong>
            </span>
          </div>
        </div>

        {/* Controls Bar: Search & Filters */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint text-sm" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or genre..."
              className="w-full rounded-2xl border border-white/10 bg-bg-card py-3 pl-11 pr-4 text-sm text-ink placeholder-ink-faint transition-all focus:border-gold/40 focus:bg-bg-raised focus:outline-none focus:ring-1 focus:ring-gold/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted hover:text-ink bg-white/10 rounded-full px-2 py-0.5"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Genre Filter Select */}
            <div className="relative flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-ink-muted font-medium">Genre:</span>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="cursor-pointer rounded-xl border border-white/10 bg-bg-card py-2.5 px-4 text-xs font-medium text-ink transition hover:border-gold/30 focus:border-gold/50 focus:outline-none"
              >
                {availableGenres.map((genre) => (
                  <option key={genre} value={genre} className="bg-bg-deep text-ink">
                    {genre === "All" ? "All Genres" : genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div className="relative flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-ink-muted font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer rounded-xl border border-white/10 bg-bg-card py-2.5 px-4 text-xs font-medium text-ink transition hover:border-gold/30 focus:border-gold/50 focus:outline-none"
              >
                <option value="default" className="bg-bg-deep text-ink">Featured / Default</option>
                <option value="price-low" className="bg-bg-deep text-ink">Price: Low to High</option>
                <option value="price-high" className="bg-bg-deep text-ink">Price: High to Low</option>
                <option value="title" className="bg-bg-deep text-ink">Title: A - Z</option>
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchEbooksData}
              disabled={loading}
              title="Refresh catalogue"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-bg-card px-3.5 py-2.5 text-xs font-medium text-ink-muted transition hover:bg-gold-dim hover:text-gold disabled:opacity-50"
            >
              <FaRotateRight className={`h-3.5 w-3.5 ${loading ? "animate-spin text-gold" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Genre Quick Tabs */}
        {availableGenres.length > 1 && (
          <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {availableGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                  selectedGenre === genre
                    ? "bg-gradient-to-r from-gold to-gold-light text-bg-deep shadow-[0_4px_12px_rgba(201,169,110,0.3)]"
                    : "border border-white/[0.08] bg-bg-card text-ink-muted hover:border-white/20 hover:text-ink"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        )}

        {/* Error Alert Banner */}
        {error && (
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-200">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 font-bold">
                !
              </span>
              <p className="text-xs sm:text-sm font-medium">{error}</p>
            </div>
            <button
              onClick={fetchEbooksData}
              className="shrink-0 rounded-lg bg-amber-500/20 px-3.5 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        {loading ? (
          /* Loading Skeleton State */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col overflow-hidden rounded-[20px] border border-white/[0.06] bg-bg-card p-3.5 animate-pulse"
              >
                <div className="aspect-[3/4] w-full rounded-xl bg-white/[0.05] mb-3.5" />
                <div className="h-4 w-20 rounded-full bg-white/[0.06] mb-3" />
                <div className="h-5 w-3/4 rounded-md bg-white/[0.08] mb-2" />
                <div className="h-3.5 w-1/2 rounded-md bg-white/[0.05] mb-4" />
                <div className="mt-auto flex items-center justify-between pt-2 border-t border-white/[0.05]">
                  <div className="h-6 w-16 rounded-md bg-white/[0.08]" />
                  <div className="h-4 w-10 rounded-md bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredEbooks.length === 0 ? (
          /* Empty State */
          <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-white/[0.07] bg-bg-card p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-dim text-gold mb-4">
              <FaBookOpen className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-ink">No Ebooks Found</h3>
            <p className="mt-2 max-w-md text-sm text-ink-muted">
              {searchQuery || selectedGenre !== "All"
                ? `We couldn't find any ebooks matching "${searchQuery || selectedGenre}". Try adjusting your filters.`
                : "No ebooks are currently available in the database."}
            </p>
            {(searchQuery || selectedGenre !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("All");
                  setSortBy("default");
                }}
                className="btn-gold mt-6 px-6 py-2.5 text-xs no-underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          /* Responsive Ebook Grid: 2 columns mobile, 3 columns tablet, 4 columns desktop */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
            {filteredEbooks.map((ebook, index) => {
              const id = ebook._id || ebook.id || index;
              const genreStyle = GENRE_PALETTES[ebook.genre] || GENRE_PALETTES.default;
              const isPurchased = ebook.isPurchased || ebook.purchased || ebook.status === "sold";
              const author = ebook.authorName || ebook.writerName || "Fable Author";
              const priceDisplay =
                typeof ebook.price === "number"
                  ? `$${ebook.price.toFixed(2)}`
                  : ebook.price
                  ? `$${ebook.price}`
                  : "Free";

              return (
                <div
                  key={id}
                  onClick={() => router.push(`/all-ebooks/${id}`)}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-bg-card transition-all duration-300 ease-out hover:-translate-y-2 hover:border-gold/30 hover:bg-bg-raised hover:shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_24px_rgba(201,169,110,0.12)]"
                >
                  {/* Cover Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-bg-deep">
                    {ebook.coverImage ? (
                      <Image
                        src={ebook.coverImage}
                        alt={ebook.title || "Ebook Cover"}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center p-4 text-center"
                        style={{ background: `linear-gradient(135deg, ${genreStyle.from}15, ${genreStyle.to}10)` }}
                      >
                        <FaBookOpen className="h-10 w-10 text-gold/40 mb-2" />
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-bg-deep/90 via-bg-deep/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full bg-gradient-to-r from-gold to-gold-light px-4 py-2 text-xs font-bold text-bg-deep shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                      </span>
                    </div>

                    {/* Badges (Sold / Draft) */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                      {isPurchased ? (
                        <span className="rounded-full border border-red-500/30 bg-red-950/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-red-400 shadow-md backdrop-blur-md">
                          Sold
                        </span>
                      ) : (
                        <span />
                      )}

                      {ebook.isPublished === false && (
                        <span className="rounded-full border border-amber-500/30 bg-amber-950/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-amber-300 shadow-md backdrop-blur-md">
                          Draft
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Metadata */}
                  <div className="flex flex-1 flex-col p-4">
                    {/* Genre Tag */}
                    <div className="mb-2">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: genreStyle.bg,
                          border: `1px solid ${genreStyle.border}`,
                          color: genreStyle.text,
                        }}
                      >
                        {ebook.genre || "General"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-1 line-clamp-2 font-serif text-base sm:text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-gold">
                      {ebook.title || "Untitled Ebook"}
                    </h3>

                    {/* Author */}
                    <p className="mb-4 text-xs text-ink-faint line-clamp-1">
                      By <span className="text-ink-muted">{author}</span>
                    </p>

                    {/* Price and Rating */}
                    <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-3">
                      <span className="font-serif text-base sm:text-lg font-bold text-gold">
                        {priceDisplay}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-ink-muted">
                        <FaStar className="text-gold text-[0.7rem]" />
                        <span className="font-semibold text-ink">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
