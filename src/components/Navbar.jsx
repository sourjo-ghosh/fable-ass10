"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-ebooks", label: "All Ebook" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user); // --- IGNORE ---

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside & escape key for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setUserDropdownOpen(false);
    setMobileOpen(false);
  }

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    setUserDropdownOpen(false);
    setMobileOpen(false);
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-[100] transition-all duration-300 ease-in-out ${
        scrolled
          ? "border-b border-white/[0.07] bg-[rgba(12,11,10,0.88)] backdrop-blur-2xl backdrop-saturate-180 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 no-underline transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-gold to-gold-light shadow-[0_4px_16px_rgba(201,169,110,0.35)]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0c0b0a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="font-serif text-2xl font-semibold tracking-tight text-ink">
            Fable
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4.5 py-2 text-sm font-medium tracking-wide no-underline transition-all duration-250 ${
                isActive(link.href)
                  ? "bg-gold-dim text-gold"
                  : "bg-transparent text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Action Area (Desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
                aria-label="User menu"
                className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pr-4 pl-2 text-sm font-medium text-ink transition-all duration-300 hover:border-gold/35 hover:bg-gold-dim focus:outline-none"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-[0.75rem] font-bold text-bg-deep shadow-[0_2px_8px_rgba(201,169,110,0.3)]">
                  {user.name
                    ? user.name[0].toUpperCase()
                    : user.email
                    ? user.email[0].toUpperCase()
                    : "U"}
                </div>
                <span className="max-w-[130px] truncate text-xs font-medium tracking-wide text-ink">
                  {user.name || user.email?.split("@")[0] || "Account"}
                </span>
                <svg
                  className={`h-3.5 w-3.5 text-ink-muted transition-transform duration-200 ${
                    userDropdownOpen ? "rotate-180 text-gold" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown Popover */}
              {userDropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2.5 w-56 origin-top-right overflow-hidden rounded-2xl border border-white/12 bg-[#131210] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-200 z-[110]"
                >
                  {/* User summary inside popover */}
                  <div className="mb-1 border-b border-white/[0.08] px-3.5 py-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gold">
                      Signed in as
                    </p>
                    <p className="mt-0.5 truncate text-sm font-medium text-ink">
                      {user.name || "Reader"}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-[0.75rem] text-ink-muted">
                      {user.email}
                    </p>
                  </div>

                  {/* 1. My Profile */}
                  <Link
                    href="/profile"
                    role="menuitem"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-ink-muted no-underline transition-colors hover:bg-gold-dim hover:text-gold"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>My Profile</span>
                  </Link>

                  {/* 2. Dashboard */}
                  <Link
                    href="/dashboard"
                    role="menuitem"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-ink-muted no-underline transition-colors hover:bg-gold-dim hover:text-gold"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="7" height="9" x="3" y="3" rx="1" />
                      <rect width="7" height="5" x="14" y="3" rx="1" />
                      <rect width="7" height="9" x="14" y="12" rx="1" />
                      <rect width="7" height="5" x="3" y="16" rx="1" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>

                  <div className="my-1 h-px bg-white/[0.06]" />

                  {/* 3. Sign Out */}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-medium tracking-wide text-ink-muted no-underline transition-colors hover:text-ink"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="btn-gold px-6 py-2.5 text-[0.8rem] no-underline"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="flex cursor-pointer rounded-[10px] border border-white/10 bg-white/6 p-2 text-ink md:hidden"
        >
          {mobileOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/[0.07] bg-[rgba(12,11,10,0.97)] px-6 py-5 backdrop-blur-2xl md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`mb-1 block rounded-xl px-4 py-3 text-[0.9rem] font-medium no-underline ${
                isActive(link.href)
                  ? "bg-gold-dim text-gold"
                  : "bg-transparent text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.08] pt-4">
              <div className="mb-1 flex items-center gap-3 px-4 py-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-sm font-bold text-bg-deep">
                  {user.name
                    ? user.name[0].toUpperCase()
                    : user.email
                    ? user.email[0].toUpperCase()
                    : "U"}
                </div>
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-medium text-ink">
                    {user.name || "Reader"}
                  </p>
                  <p className="truncate font-mono text-xs text-ink-muted">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-ink-muted no-underline transition-colors hover:border-gold/30 hover:bg-gold-dim hover:text-gold"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>My Profile</span>
              </Link>

              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-ink-muted no-underline transition-colors hover:border-gold/30 hover:bg-gold-dim hover:text-gold"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                <span>Dashboard</span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="mt-1 flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl border border-white/10 py-2.75 text-center text-sm text-ink-muted no-underline hover:text-ink"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="btn-gold justify-center text-center no-underline"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
