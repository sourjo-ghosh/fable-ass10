"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaBookOpen,
  FaStar,
  FaCartShopping,
  FaUserPen,
  FaTag,
  FaShareNodes,
  FaBookmark,
} from "react-icons/fa6";
import { getEbookById } from "@/lib/actions/get/getEbookById";
import toast from "react-hot-toast";
import { BsCalendarDate } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { authClient } from "@/lib/auth-client";

export default function EbookDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const id = params.id;

  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const role = session?.user?.role;
  const [status, setStatus] = useState("Found");
  const IsWriter = useEffect(() => {
    async function loadEbook() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getEbookById(id, userId);
        if (res?.success && res?.data) {
          if (!res.data.isPublished) {
            setStatus("unpublished");
          } else {
            setEbook(res.data);
            setStatus("found");
          }
        } else {
          setStatus("deleted");
        }
      } catch (err) {
        console.error("Failed to load ebook detail:", err);
        setError(err.message || "Could not connect to server.");
      } finally {
        setLoading(false);
      }
    }
    loadEbook();
  }, [id]);
  useEffect(() => {
    if (!id) return;

    const interval = setInterval(async () => {
      const res = await getEbookById(id, userId);

      if (!res?.success) {
        setStatus("deleted");
        return;
      }

      if (!res.data.isPublished) {
        setStatus("unpublished");
        return;
      }

      setEbook(res.data);
      setStatus("found");
    }, 10000);

    return () => clearInterval(interval);
  }, [id]);
  useEffect(() => {
    if (!userId || !ebook?._id) return;
    const checkIsBookmarked = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/check/${userId}/${ebook._id}`,
      );
      const results = await res.json();
      setBookmarked(results.bookmarked);
    };
    checkIsBookmarked();
  }, [userId, ebook?._id]);
  if (loading) {
    return (
      <main className="min-h-screen bg-bg-deep text-ink pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="text-sm text-ink-muted">
            Fetching ebook from server...
          </p>
        </div>
      </main>
    );
  }
  if (status === "deleted")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h2 className="text-2xl font-semibold text-ink">Ebook Not Found</h2>
        <p className="text-ink-muted">This ebook has been removed.</p>
        <Link href="/all-ebooks">Browse other ebooks</Link>
      </div>
    );
  if (status === "unpublished")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h2 className="text-2xl font-semibold text-ink">No Longer Available</h2>
        <p className="text-ink-muted">This ebook has been unpublished.</p>
        <Link href="/all-ebooks">Browse other ebooks</Link>
      </div>
    );
  const UploadedTime = new Date(ebook.UploadedDate).toDateString();
  const handleBookMark = async (ebookId) => {
    try {
      if (!userId && ebookId) {
        toast.error("Login first");
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/toggle-bookmark/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: ebookId }),
        },
      );
      const results = await res.json();
      if (results.bookmarked) {
        toast.success(results.message);
        setBookmarked(true);
      } else {
        toast.error(results.message);
        setBookmarked(false);
      }
    } catch (err) {
      console.error("Failed to toggle bookmark:", err);
      toast.error("Failed to toggle bookmark");
    }
  };
  const handleBuyBook = async (ebookId) => {
    // Safe guard: check if id exists before making the request
    if (!ebookId) {
      console.error("Ebook ID is missing");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ebookId,
            userId, // Logged in user only
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Network error during payment processing:", error);
      toast.error(
        "Something went wrong with the connection. Please try again.",
      );
    }
  };

  if (error || !ebook) {
    return (
      <main className="min-h-screen bg-bg-deep text-ink pt-32 pb-20 px-6 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-bg-card p-10">
          <FaBookOpen className="mx-auto h-12 w-12 text-gold/40 mb-4" />
          <h1 className="font-serif text-2xl font-semibold text-ink">
            Ebook Not Found
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            {error || "The requested ebook could not be found."}
          </p>
          <Link
            href="/all-ebooks"
            className="btn-gold mt-6 inline-flex no-underline text-xs px-6 py-2.5"
          >
            Back to Catalogue
          </Link>
        </div>
      </main>
    );
  }

  const author = ebook.authorName || ebook.writerName || "Fable Author";
  const isPurchased =
    ebook.isPurchased || ebook.purchased || ebook.status === "sold";
  const priceDisplay =
    typeof ebook.price === "number"
      ? `$${ebook.price.toFixed(2)}`
      : ebook.price
        ? `$${ebook.price}`
        : "Free";

  return (
    <main className="min-h-screen bg-bg-deep text-ink pt-28 pb-20 px-4 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/all-ebooks"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted hover:text-gold no-underline transition mb-8"
        >
          <FaArrowLeft /> Back to All Ebooks
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 bg-bg-card border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Cover Column */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-bg-deep shadow-2xl">
              {ebook.coverImage ? (
                <Image
                  src={ebook.coverImage}
                  alt={ebook.title || "Ebook Cover"}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold/20 to-gold-light/10">
                  <FaBookOpen className="h-16 w-16 text-gold/50" />
                </div>
              )}

              {isPurchased && (
                <span className="absolute top-4 left-4 rounded-full bg-red-950/90 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400 uppercase tracking-wider shadow-lg">
                  Sold
                </span>
              )}
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold-dim px-3 py-1 text-xs font-bold text-gold uppercase tracking-wider">
                  <FaTag className="text-[0.65rem]" />{" "}
                  {ebook.genre || "General"}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-gold">
                  <BsCalendarDate /> {UploadedTime}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink leading-tight mb-3">
                {ebook.title || "Untitled Ebook"}
              </h1>

              <div className="flex items-center gap-2 text-sm text-ink-muted mb-6 pb-6 border-b border-white/[0.07]">
                <FaUserPen className="text-gold" />
                <span>
                  Written by{" "}
                  <strong className="text-ink hover:underline">{author}</strong>
                </span>
                {ebook.authorEmail && (
                  <span className="text-xs text-ink-faint">
                    ({ebook.authorEmail})
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                  Book Status
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-ink-muted bg-bg-deep/60 p-4 rounded-2xl border border-white/[0.05]">
                  {ebook.status}
                </p>
              </div>
              <br />
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                  Book Content / Preview
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-ink-muted bg-bg-deep/60 p-4 rounded-2xl border border-white/[0.05]">
                  {ebook.content || "No content preview available."}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-ink-faint block">Price</span>
                <span className="font-serif text-3xl font-bold text-gold">
                  {priceDisplay}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {userId ? ( 
                  // 1. Check if the user is an admin or writer
                  role === "admin" || userId === ebook?.authorId ? (
                    <button
                      disabled
                      className="btn-disabled flex-1 sm:flex-initial justify-center gap-2 px-6 py-3 text-xs no-underline opacity-50 cursor-not-allowed border border-white/10"
                    >
                      {" "}
                      Creators Cannot Buy{" "}
                    </button> // 2. If valid user, check if product is available or sold
                  ) : ebook?.status === "Available" ? (
                    <button
                      onClick={() => handleBuyBook(ebook._id)}
                      className="btn-gold flex-1 sm:flex-initial justify-center gap-2 px-6 py-3 text-xs no-underline"
                    >
                      {" "}
                      <FaCartShopping /> Buy Now{" "}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-red-600/20 text-red-400 border border-red-500/30 flex-1 sm:flex-initial justify-center gap-2 px-6 py-3 text-xs no-underline cursor-not-allowed"
                    >
                      {" "}
                      Sold Out{" "}
                    </button>
                  ) // 3. Fallback if no userId exists (unauthenticated)
                ) : (
                  <button
                    onClick={() => toast.error("Login First")}
                    className="btn-gold flex-1 sm:flex-initial justify-center gap-2 px-6 py-3 text-xs no-underline"
                  >
                    {" "}
                    <FaCartShopping /> Buy Now{" "}
                  </button>
                )}

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    toast.success("Link copied!");
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-ink-muted hover:text-gold hover:border-gold/30 transition"
                  title="Share"
                >
                  <FaShareNodes />
                </button>
                <button
                  onClick={() => {
                    handleBookMark(ebook._id);
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-ink-muted hover:text-gold hover:border-gold/30 transition"
                  title="Bookmark"
                >
                  {bookmarked ? <FaBookmark /> : <CiBookmark />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
