"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FaBookOpen, FaPen, FaRegBookmark, FaReceipt } from "react-icons/fa6";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const name = user?.name || "Reader";
  const email = user?.email || "reader@fable.com";

  return (
    <main className="mx-auto max-w-5xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <p className="text-xs font-bold tracking-[0.18em] text-gold uppercase">Reader dashboard</p>
      <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="font-serif text-4xl font-semibold text-ink">Welcome back, {name}.</h1><p className="mt-2 text-sm text-ink-muted">Your stories, bookmarks, and profile—all in one place.</p></div><button className="btn-ghost px-5 py-3 text-xs"><FaPen /> Edit profile</button></div>

      <section className="mt-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-card">
        <div className="h-28 bg-[linear-gradient(125deg,rgba(201,169,110,0.35),rgba(19,18,16,0.1),rgba(201,169,110,0.08))]" />
        <div className="px-6 pb-7 sm:px-8">
          <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-bg-card bg-gradient-to-br from-gold-light to-gold font-serif text-4xl font-semibold text-bg-deep shadow-lg">{name.slice(0, 1).toUpperCase()}</div>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-ink">{name}</h2><p className="mt-1 text-sm text-ink-muted">{email}</p>
          <div className="mt-7 grid gap-4 border-t border-white/[0.07] pt-6 sm:grid-cols-2"><div><p className="text-xs font-bold tracking-[0.14em] text-ink-faint uppercase">Email address</p><p className="mt-2 text-sm text-ink">{email}</p></div><div><p className="text-xs font-bold tracking-[0.14em] text-ink-faint uppercase">Member since</p><p className="mt-2 text-sm text-ink">July 2026</p></div></div>
        </div>
      </section>
      <section className="mt-7 grid gap-4 sm:grid-cols-3">
        {[{ href: "/dashboard/user/purchased-ebooks", icon: FaBookOpen, label: "Purchased ebooks" }, { href: "/dashboard/user/purchase-history", icon: FaReceipt, label: "Purchase history" }, { href: "/dashboard/user/bookmarks", icon: FaRegBookmark, label: "Bookmarks" }].map(({ href, icon: Icon, label }) => <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-bg-card p-5 text-sm font-medium text-ink no-underline transition-colors hover:border-gold/30 hover:bg-bg-raised"><span className="rounded-xl bg-gold-dim p-3 text-gold"><Icon /></span>{label}</Link>)}
      </section>
    </main>
  );
}
