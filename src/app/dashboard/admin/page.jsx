import Link from "next/link";
import {
  FaArrowRight,
  FaBookOpen,
  FaChartLine,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa6";

const sales = [42, 58, 46, 74, 64, 92, 81, 108, 86, 124, 118, 146];
const genres = [
  ["Fiction", "#c9a96e"],
  ["Romance", "#e879a0"],
  ["Fantasy", "#34d399"],
  ["Mystery", "#a78bfa"],
];

export default function AdminDashboard() {
  return (
    <main className="mx-auto max-w-7xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <p className="text-xs font-bold tracking-[0.18em] text-gold uppercase">
        Administration
      </p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">
        Fable at a glance.
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        A live overview of the platform&apos;s people, stories, and sales.
      </p>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: FaUsers, value: "1,284", label: "Total users" },
          { icon: FaBookOpen, value: "86", label: "Total writers" },
          { icon: FaChartLine, value: "3,842", label: "Ebooks sold" },
          { icon: FaDollarSign, value: "$48,920", label: "Total revenue" },
        ].map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/[0.07] bg-bg-card p-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-dim text-gold">
              <Icon className="h-4 w-4" />
            </span>
            <p className="mt-4 font-serif text-3xl font-semibold text-ink">
              {value}
            </p>
            <p className="mt-1 text-xs text-ink-muted">{label}</p>
          </div>
        ))}
      </section>
      <section className="mt-7 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-white/[0.07] bg-bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">
                Monthly sales
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                Revenue performance over the last 12 months.
              </p>
            </div>
            <span className="text-sm font-semibold text-emerald-300">
              +18.4%
            </span>
          </div>
          <div className="mt-8 flex h-52 items-end gap-2">
            {sales.map((value, i) => (
              <div key={i} className="group flex flex-1 flex-col justify-end">
                <span className="mb-2 hidden text-center text-[10px] text-gold group-hover:block">
                  ${value}k
                </span>
                <div
                  className="rounded-t-md bg-gradient-to-t from-gold to-gold-light transition-opacity group-hover:opacity-80"
                  style={{ height: `${(value / 146) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-ink-faint">
            <span>Aug</span>
            <span>Nov</span>
            <span>Feb</span>
            <span>Jul</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-bg-card p-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Ebooks by genre
          </h2>
          <p className="mt-1 text-sm text-ink-muted">Current catalogue mix.</p>
          <div
            className="mx-auto mt-7 h-36 w-36 rounded-full"
            style={{
              background:
                "conic-gradient(#c9a96e 0 43%, #e879a0 43% 67%, #34d399 67% 84%, #a78bfa 84% 100%)",
            }}
          />
          <div className="mt-6 grid grid-cols-2 gap-3">
            {genres.map(([genre, color]) => (
              <span
                key={genre}
                className="flex items-center gap-2 text-xs text-ink-muted"
              >
                <i
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {genre}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-7 grid gap-4 sm:grid-cols-3">
        {[
          {
            href: "/dashboard/admin/manage-users",
            label: "Manage users",
            copy: "Roles, accounts, and access.",
          },
          {
            href: "/dashboard/admin/manage-ebooks",
            label: "Manage ebooks",
            copy: "Publishing and catalogue control.",
          },
          {
            href: "/dashboard/admin/transactions",
            label: "View transactions",
            copy: "Purchases and publishing fees.",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-white/[0.07] bg-bg-card p-5 no-underline hover:border-gold/30"
          >
            <h3 className="font-serif text-xl font-semibold text-ink">
              {item.label}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">{item.copy}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-gold">
              Open{" "}
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
