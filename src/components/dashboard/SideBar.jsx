"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FaBookOpen,
  FaChartLine,
  FaChartPie,
  FaGear,
  FaPenNib,
  FaRegBookmark,
  FaRegUser,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";
import { GoSidebarExpand } from "react-icons/go";

const menus = {
  reader: {
    title: "Reader space",
    items: [
      { href: "/dashboard/user", icon: FaChartPie, label: "Overview" },
      {
        href: "/dashboard/user/purchased-ebooks",
        icon: FaBookOpen,
        label: "Purchased ebooks",
      },
      {
        href: "/dashboard/user/purchase-history",
        icon: FaChartLine,
        label: "Purchase history",
      },
      {
        href: "/dashboard/user/bookmarks",
        icon: FaRegBookmark,
        label: "Bookmarks",
      },
      { href: "/dashboard/user", icon: FaRegUser, label: "Profile" },
    ],
  },
  writer: {
    title: "Writer studio",
    items: [
      { href: "/dashboard/writer", icon: FaChartPie, label: "Overview" },
      {
        href: "/dashboard/writer/manage-ebooks",
        icon: FaBookOpen,
        label: "Manage ebooks",
      },
      {
        href: "/dashboard/writer/add-ebook",
        icon: FaPenNib,
        label: "Add ebook",
      },
      {
        href: "/dashboard/writer/bookmarks",
        icon: FaRegBookmark,
        label: "Bookmarks",
      },
      {
        href: "/dashboard/writer/sales-history",
        icon: FaChartLine,
        label: "Sales history",
      },
    ],
  },
  admin: {
    title: "Administration",
    items: [
      { href: "/dashboard/admin", icon: FaChartPie, label: "Overview" },
      {
        href: "/dashboard/admin/manage-users",
        icon: FaUsers,
        label: "Manage users",
      },
      {
        href: "/dashboard/admin/manage-ebooks",
        icon: FaBookOpen,
        label: "Manage ebooks",
      },
      {
        href: "/dashboard/admin/transactions",
        icon: FaChartLine,
        label: "Transactions",
      },
    ],
  },
};

function ProfileSummary({ onNavigate }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const name = user?.name || "Reader";
  const email = user?.email || "reader@fable.com";
  return (
    <Link
      href="/dashboard/user"
      onClick={onNavigate}
      className="flex items-center gap-3 rounded-xl px-3 py-3 no-underline transition-colors hover:bg-white/[0.045]"
    >
      {user?.image ? (
        <img
          src={user.image}
          alt=""
          className="h-9 w-9 rounded-full object-cover"
        />
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold text-sm font-bold text-bg-deep">
          {name[0].toUpperCase()}
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-ink">
          {name}
        </span>
        <span className="block truncate text-xs text-ink-muted">{email}</span>
      </span>
    </Link>
  );
}

function Navigation({ onNavigate, role }) {
  const menu = menus[role] || menus.reader;
  return (
    <nav className="mt-8 space-y-1" aria-label="Dashboard navigation">
      <p className="px-3 pb-2 text-[0.65rem] font-bold tracking-[0.18em] text-ink-faint uppercase">
        {menu.title}
      </p>
      {menu.items.map(({ href, icon: Icon, label }) => {
        return (
          <Link
            key={label}
            href={href}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink-muted no-underline transition-colors hover:bg-white/[0.045] hover:text-ink"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar({ role }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-white/[0.07] bg-bg-section px-4 py-6 lg:block">
        <Link href="/" className="flex items-center gap-2.5 px-3 no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-light to-gold text-bg-deep">
            <FaBookOpen className="h-4 w-4" />
          </span>
          <span className="font-serif text-2xl font-semibold text-ink">
            Fable
          </span>
        </Link>
        <Navigation role={role} />
        <div className="absolute right-4 bottom-6 left-4 border-t border-white/[0.07] pt-4">
          <ProfileSummary />
          {/* <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-ink-muted no-underline hover:bg-white/[0.045] hover:text-ink"
          >
            <FaGear className="h-4 w-4" /> Settings
          </Link> */}
        </div>
      </aside>
      <div className="fixed top-4 left-4 z-[120] lg:hidden">
        <button
          type="button"
          aria-label="Open dashboard menu"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-bg-card px-3 py-2.5 text-sm font-medium text-ink shadow-lg"
        >
          <GoSidebarExpand className="h-5 w-5 text-gold" /> Menu
        </button>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-[130] lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute inset-0 h-full w-full bg-black/70"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-72 border-r border-white/[0.08] bg-bg-section px-5 py-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-serif text-2xl font-semibold text-ink no-underline"
              >
                Fable
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close dashboard menu"
                className="p-2 text-ink-muted"
              >
                <FaXmark />
              </button>
            </div>
            <Navigation role={role} onNavigate={() => setOpen(false)} />
            <div className="absolute right-5 bottom-6 left-5 border-t border-white/[0.07] pt-4">
              <ProfileSummary onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
