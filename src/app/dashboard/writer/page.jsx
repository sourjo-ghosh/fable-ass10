import { FaBookOpen, FaChartLine, FaPenNib } from "react-icons/fa6";

export default function WriterDashboard() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <p className="text-xs font-bold tracking-[0.18em] text-gold uppercase">
        Writer studio
      </p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">
        Welcome back, Writer.
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Shape the stories your readers will remember.
      </p>
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: FaPenNib, value: "3", label: "Active manuscripts" },
          { icon: FaBookOpen, value: "8", label: "Published ebooks" },
          { icon: FaChartLine, value: "2.4k", label: "Reads this month" },
        ].map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/[0.07] bg-bg-card p-5"
          >
            <Icon className="mb-4 text-gold" />
            <p className="font-serif text-3xl font-semibold text-ink">
              {value}
            </p>
            <p className="mt-1 text-xs text-ink-muted">{label}</p>
          </div>
        ))}
      </section>
      <section
        id="manuscripts"
        className="mt-8 rounded-2xl border border-white/[0.07] bg-bg-card p-6"
      >
        <p className="text-xs font-bold tracking-[.16em] text-gold uppercase">
          Manuscript in progress
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">
          A House of Glass
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Draft 4 · 42,805 words · Last edited today
        </p>
        <div className="mt-6 h-2 max-w-xl overflow-hidden rounded-full bg-white/[.1]">
          <div className="h-full w-[64%] rounded-full bg-gold" />
        </div>
      </section>
    </main>
  );
}
