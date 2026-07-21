import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaBookOpen,
  FaPenNib,
  FaShieldHalved,
} from "react-icons/fa6";

const workspaces = [
  {
    href: "/dashboard/user",
    icon: FaBookOpen,
    label: "User",
    copy: "Continue your stories, manage your shelf, and keep track of saved reads.",
  },
  {
    href: "/dashboard/writer",
    icon: FaPenNib,
    label: "Writer",
    copy: "Manage manuscripts, publishing progress, and how readers are discovering your work.",
  },
  {
    href: "/dashboard/admin",
    icon: FaShieldHalved,
    label: "Admin",
    copy: "Oversee the marketplace, catalogue health, and the Fable community.",
  },
];

export default function DashboardOverview() {
  return (
    <main className="mx-auto max-w-7xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-card">
        <Image
          src="/library-hero.png"
          alt="A warmly lit library"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,10,.98),rgba(12,11,10,.72),rgba(12,11,10,.25))]" />
        <div className="relative max-w-2xl px-7 py-16 sm:px-12 sm:py-22">
          <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
            Welcome to Fable
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ink sm:text-6xl">
            Your next chapter starts here.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Whether you are here to read, create, or guide the community, choose
            a space designed for the work in front of you.
          </p>
        </div>
      </section>
      <section className="mt-10">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-gold uppercase">
            Choose your workspace
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">
            How are you using Fable today?
          </h2>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {workspaces.map(({ href, icon: Icon, label, copy }) => (
            <Link
              key={label}
              href={href}
              className="group rounded-2xl border border-white/[0.07] bg-bg-card p-6 no-underline transition-all hover:-translate-y-1 hover:border-gold/35 hover:bg-bg-raised"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-dim text-gold">
                <Icon />
              </span>
              <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">
                {label}
              </h3>
              <p className="mt-2 min-h-15 text-sm leading-relaxed text-ink-muted">
                {copy}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-gold">
                Open dashboard{" "}
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
