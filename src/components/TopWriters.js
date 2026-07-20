"use client";

const writers = [
  {
    name: "Elena Martinez",
    handle: "@elenamartinez",
    books: 12,
    sales: "2.4K",
    followers: "8.9K",
    bio: "Award-winning fiction author with a passion for magical realism and stories that transcend the ordinary.",
    initials: "EM",
    gradient: "linear-gradient(135deg, #c9a96e, #e2c48a)",
    glowColor: "rgba(201,169,110,.2)",
    genres: ["Fiction", "Fantasy"],
    rating: 4.9,
  },
  {
    name: "James Chen",
    handle: "@jameschen",
    books: 8,
    sales: "1.8K",
    followers: "5.1K",
    bio: "Romance and contemporary fiction writer. Crafting stories about love, loss, and the unexpected connections we find.",
    initials: "JC",
    gradient: "linear-gradient(135deg, #f472b6, #db2777)",
    glowColor: "rgba(244,114,182,.2)",
    genres: ["Romance", "Drama"],
    rating: 4.7,
  },
  {
    name: "Sophie Williams",
    handle: "@sophiewrites",
    books: 15,
    sales: "3.1K",
    followers: "12.3K",
    bio: "Science fiction visionary exploring the edges of humanity through near-future worlds and complex characters.",
    initials: "SW",
    gradient: "linear-gradient(135deg, #38bdf8, #0369a1)",
    glowColor: "rgba(56,189,248,.2)",
    genres: ["Sci-Fi", "Mystery"],
    rating: 4.8,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill={star <= Math.floor(rating) ? "#c9a96e" : "transparent"} stroke="#c9a96e" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="ml-1 text-[0.72rem] font-semibold text-ink-muted">{rating}</span>
    </div>
  );
}

function WriterCard({ writer }) {
  const glowSoft = writer.glowColor.replace(".2)", ".1)");
  const glowBorder = writer.glowColor.replace(".2)", ".4)");
  const glowBg = writer.glowColor.replace(".2)", ".08)");
  const glowHover = writer.glowColor.replace(".2)", ".15)");

  return (
    <div
      style={{ "--glow": writer.glowColor, "--glow-soft": glowSoft, "--glow-border": glowBorder, "--glow-bg": glowBg }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-bg-card p-8 transition-all duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] hover:-translate-y-1.5 hover:border-[var(--glow-border)] hover:shadow-[0_24px_64px_var(--glow),0_0_0_1px_var(--glow-soft)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 h-[200px] w-[200px] rounded-full blur-[40px]"
        style={{ background: glowBg }}
      />

      <div className="relative mb-5 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] font-serif text-[1.3rem] font-bold text-ink"
            style={{
              background: writer.gradient,
              boxShadow: `0 8px 24px ${writer.glowColor}`,
            }}
          >
            {writer.initials}
          </div>
          <div>
            <h3 className="mb-0.5 font-serif text-[1.15rem] font-semibold text-ink">{writer.name}</h3>
            <div className="text-[0.75rem] text-ink-faint">{writer.handle}</div>
          </div>
        </div>

        <button
          className="cursor-pointer rounded-full border border-white/[0.12] bg-transparent px-[18px] py-[7px] text-[0.75rem] font-semibold text-ink-muted transition-all duration-250 group-hover:bg-[var(--glow-hover)] hover:text-ink"
          style={{ "--glow-hover": glowHover }}
        >
          Follow
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {writer.genres.map((g) => (
          <span
            key={g}
            className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-[3px] text-[0.65rem] font-bold tracking-[0.08em] text-ink-muted uppercase"
          >
            {g}
          </span>
        ))}
      </div>

      <p className="mb-6 flex-1 text-sm leading-[1.65] text-ink-faint">{writer.bio}</p>

      <div className="divider-gold mb-5" />

      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          {[
            { value: writer.books, label: "Books" },
            { value: writer.sales, label: "Sales" },
            { value: writer.followers, label: "Readers" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-[1.4rem] leading-none font-semibold text-ink">{stat.value}</div>
              <div className="mt-1 text-[0.65rem] tracking-[0.06em] text-ink-faint uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
        <StarRating rating={writer.rating} />
      </div>

      <a
        href="/browse"
        className="group/link mt-6 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold tracking-wide text-gold no-underline transition-all hover:gap-2.5"
      >
        View All Ebooks
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  );
}

export default function TopWriters() {
  return (
    <section className="relative overflow-hidden bg-bg-section py-[120px]">
      <div className="divider-gold" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(201,169,110,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="section-eyebrow mb-5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              The Literary Community
            </div>
            <h2 className="font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.05] font-normal tracking-[-0.02em] text-ink">
              Meet the{" "}
              <em className="font-serif font-light text-gold italic">Authors</em>
            </h2>
            <p className="mt-3.5 max-w-[380px] text-[0.95rem] leading-[1.7] text-ink-faint">
              The visionary writers shaping the future of independent digital literature.
            </p>
          </div>

          <a href="/browse" className="btn-ghost shrink-0 no-underline">
            All Authors
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {writers.map((writer, i) => (
            <div
              key={writer.name}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <WriterCard writer={writer} />
            </div>
          ))}
        </div>

        <div className="mt-[72px] flex flex-wrap items-center gap-6 rounded-[20px] border border-gold/12 bg-gradient-to-br from-gold/[0.06] to-gold/[0.02] px-6 py-9 md:px-10">
          <div className="text-[2rem] leading-none">💬</div>
          <blockquote className="min-w-[200px] flex-1 font-serif text-[1.15rem] leading-[1.6] font-normal text-ink italic">
            &ldquo;Fable gave my writing a home. Within three months of publishing, I had over 1,000 readers and a community that genuinely cares about the craft.&rdquo;
          </blockquote>
          <div className="shrink-0 text-right">
            <div className="text-sm font-semibold text-ink">Elena Martinez</div>
            <div className="mt-1 text-[0.75rem] text-ink-faint">Author, Fiction & Fantasy</div>
            <StarRating rating={5} />
          </div>
        </div>
      </div>
    </section>
  );
}
