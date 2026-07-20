"use client";

const testimonials = [
  {
    quote: "Fable has completely transformed how I discover new books. The curation is impeccable — every recommendation feels personal.",
    name: "Sarah K.",
    role: "Avid Reader",
    rating: 5,
    initials: "SK",
    color: "#c9a96e",
  },
  {
    quote: "As a first-time author, I was nervous. Fable made publishing feel effortless and the reader community is incredibly supportive.",
    name: "David R.",
    role: "Published Author",
    rating: 5,
    initials: "DR",
    color: "#a78bfa",
  },
  {
    quote: "The reading experience on Fable is unmatched. Clean, beautiful, and it never gets in the way of the story.",
    name: "Mia T.",
    role: "Book Enthusiast",
    rating: 5,
    initials: "MT",
    color: "#34d399",
  },
  {
    quote: "I've discovered 3 of my all-time favourite books through Fable in the past year. The algorithm just *gets* me.",
    name: "James O.",
    role: "Literature Student",
    rating: 5,
    initials: "JO",
    color: "#f472b6",
  },
];

const features = [
  {
    icon: "✦",
    title: "Immersive Reading",
    description: "A distraction-free reader with customizable fonts, themes, and layouts designed for deep focus.",
    color: "#c9a96e",
  },
  {
    icon: "◈",
    title: "Intelligent Discovery",
    description: "Our curation engine learns your taste and surfaces the stories you didn't know you were looking for.",
    color: "#a78bfa",
  },
  {
    icon: "⬡",
    title: "Author Direct",
    description: "Buy directly from independent authors. They keep 85% of every sale — your purchase matters.",
    color: "#34d399",
  },
  {
    icon: "◉",
    title: "Offline Reading",
    description: "Download any ebook to your device. Read anywhere, anytime — no internet required.",
    color: "#38bdf8",
  },
];

function TestimonialCard({ t }) {
  return (
    <div
      style={{ "--accent": t.color }}
      className="group flex flex-col gap-5 rounded-[20px] border border-white/[0.07] bg-bg-card p-7 transition-all duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_19%,transparent)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.3),0_0_24px_color-mix(in_srgb,var(--accent)_6%,transparent)]"
    >
      <div className="flex gap-[3px]">
        {Array(t.rating).fill(0).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#c9a96e">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      <blockquote className="flex-1 font-serif text-[1.05rem] leading-[1.65] font-normal text-ink-muted italic">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl font-serif text-[0.85rem] font-bold"
          style={{
            background: `linear-gradient(135deg, ${t.color}50, ${t.color}20)`,
            border: `1px solid ${t.color}30`,
            color: t.color,
          }}
        >
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">{t.name}</div>
          <div className="text-[0.72rem] text-ink-faint">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feature }) {
  const r = parseInt(feature.color.slice(1, 3), 16);
  const g = parseInt(feature.color.slice(3, 5), 16);
  const b = parseInt(feature.color.slice(5, 7), 16);

  return (
    <div
      style={{ "--accent": feature.color, "--accent-bg": `rgba(${r}, ${g}, ${b}, 0.04)` }}
      className="group rounded-[20px] border border-white/[0.06] bg-bg-card p-7 transition-all duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_19%,transparent)] hover:bg-[var(--accent-bg)]"
    >
      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] text-[1.4rem] font-light"
        style={{
          background: `${feature.color}14`,
          border: `1px solid ${feature.color}25`,
          color: feature.color,
        }}
      >
        {feature.icon}
      </div>
      <h3 className="mb-2.5 font-serif text-[1.15rem] font-semibold text-ink">{feature.title}</h3>
      <p className="text-sm leading-[1.65] text-ink-faint">{feature.description}</p>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-bg-section py-[120px]">
      <div className="divider-gold" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(201,169,110,0.03)_1.5px,transparent_1.5px)] bg-size-[30px_30px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-16 text-center">
          <div className="section-eyebrow mx-auto mb-5 justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Why Fable
          </div>
          <h2 className="font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.05] font-normal tracking-[-0.02em] text-ink">
            A Reading Experience{" "}
            <em className="font-serif font-light text-gold italic">Reimagined</em>
          </h2>
        </div>

        <div className="mb-[100px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div key={feature.title} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>

        <div className="mb-14 text-center">
          <div className="section-eyebrow mx-auto mb-5 justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Reader Stories
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,3.5vw,3.2rem)] leading-[1.05] font-normal tracking-[-0.02em] text-ink">
            Loved by{" "}
            <em className="font-serif font-light text-gold italic">10,000+ readers</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <div key={t.name} className="animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
