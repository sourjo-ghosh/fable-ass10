"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FaBookOpen, FaRegBookmark, FaReceipt } from "react-icons/fa6";

export default function ReaderOverviewPage() {
  const { data: session } = authClient.useSession();
  const name = session?.user?.name || "Reader";

  return (
    <main className="mx-auto max-w-5xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <p className="text-xs font-bold tracking-[0.18em] text-gold uppercase">
        Reader dashboard
      </p>
      <div className="mt-2">
        <h1 className="font-serif text-4xl font-semibold text-ink">
          Welcome back, {name}.
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Your stories, bookmarks, and purchases—all in one place.
        </p>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            href: "/dashboard/user/purchased-ebooks",
            icon: FaBookOpen,
            label: "Purchased ebooks",
          },
          {
            href: "/dashboard/user/purchase-history",
            icon: FaReceipt,
            label: "Purchase history",
          },
          {
            href: "/dashboard/user/bookmarks",
            icon: FaRegBookmark,
            label: "Bookmarks",
          },
        ].map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-bg-card p-5 text-sm font-medium text-ink no-underline transition-colors hover:border-gold/30 hover:bg-bg-raised"
          >
            <span className="rounded-xl bg-gold-dim p-3 text-gold">
              <Icon />
            </span>
            {label}
          </Link>
        ))}
      </section>
    </main>
  );
}
