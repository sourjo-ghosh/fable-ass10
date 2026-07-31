"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FiCopy,
  FiUser,
  FiMail,
  FiTag,
  FiArrowRight,
  FiHome,
  FiBookOpen
} from "react-icons/fi";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || searchParams.get("checkoutSessionId");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const getEbook = async () => {
      if (!sessionId) {
        setLoading(false);
        setError("No session ID found in URL parameters.");
        return;
      }

      try {
        setLoading(true);
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
        const res = await fetch(`${serverUrl}/api/payment-success/${sessionId}`);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const result = await res.json();
        console.log("Payment success API data:", result);
        setData(result);
      } catch (err) {
        console.error("Error fetching payment success data:", err);
        setError(err.message || "Failed to load payment details.");
      } finally {
        setLoading(false);
      }
    };

    getEbook();
  }, [sessionId]);

  const copyToClipboard = (text, label) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`, {
      style: {
        background: "#131210",
        color: "#faf8f4",
        border: "1px solid rgba(201, 169, 110, 0.2)",
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-bg-deep px-4 py-16">
        <div className="text-center space-y-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="text-sm text-ink-muted">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-bg-deep px-4 py-16">
        <div className="max-w-md w-full bg-bg-card border border-white/10 rounded-2xl p-8 text-center space-y-4 shadow-xl">
          <h2 className="text-xl font-serif font-bold text-ink">Payment Details</h2>
          <p className="text-xs text-ink-muted leading-relaxed">
            {error || "Could not retrieve transaction details for this session."}
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link href="/dashboard" className="btn-gold px-6 py-2 text-xs font-semibold">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Extract payment and ebook info from fetched API response
  const paymentInfo = Array.isArray(data)
    ? data[0] || {}
    : data.paymentInfo || data.payment || (data.paymentIntentId ? data : {});

  const ebookInfo = Array.isArray(data)
    ? data[1] || {}
    : data.ebook || data.book || data.ebookDetails || (data.title ? data : {});

  // Formatting amount
  const rawAmount = paymentInfo.amount || (ebookInfo.price ? ebookInfo.price * 100 : 0);
  const formattedAmount = rawAmount ? (rawAmount > 1000 ? rawAmount / 100 : rawAmount).toFixed(2) : "0.00";
  const currencySymbol = (paymentInfo.currency || "usd").toUpperCase();

  const formattedDate = paymentInfo.createdAt
    ? new Date(paymentInfo.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="min-h-screen bg-bg-deep text-ink py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Simple Page Header */}
        <div className="text-center space-y-1 mt-5">
          <h1 className="text-3xl font-serif font-bold text-ink">Payment Successful</h1>
          <p className="text-xs text-ink-muted">Transaction & Book Details</p>
        </div>

        {/* Main Details Card */}
        <div className="bg-bg-card border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Ebook Overview Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b border-white/10 pb-6">
            {ebookInfo.coverImage && !imgError ? (
              <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-bg-raised border border-white/10">
                <Image
                  src={ebookInfo.coverImage}
                  alt={ebookInfo.title || "eBook Cover"}
                  fill
                  onError={() => setImgError(true)}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-32 w-24 shrink-0 rounded-lg bg-bg-raised border border-white/10 flex items-center justify-center">
                <FiBookOpen className="h-8 w-8 text-gold-dim" />
              </div>
            )}

            <div className="space-y-2 flex-1">
              {ebookInfo.genre && (
                <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-gold bg-gold-dim/30 border border-gold-dim px-2.5 py-0.5 rounded-full">
                  <FiTag className="h-3 w-3" />
                  {ebookInfo.genre}
                </span>
              )}
              <h2 className="text-2xl font-serif font-bold text-ink">{ebookInfo.title || "Untitled Book"}</h2>

              <div className="text-xs text-ink-muted space-y-1">
                {ebookInfo.authorName && (
                  <div className="flex items-center gap-1.5">
                    <FiUser className="h-3.5 w-3.5 text-gold shrink-0" />
                    <span>Author: <strong className="text-ink">{ebookInfo.authorName}</strong></span>
                  </div>
                )}
                {ebookInfo.authorEmail && (
                  <div className="flex items-center gap-1.5 text-ink-faint">
                    <FiMail className="h-3.5 w-3.5 shrink-0" />
                    <span>{ebookInfo.authorEmail}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-ink-faint uppercase tracking-wider block">Price Paid</span>
              <span className="text-2xl font-serif font-bold text-gold">
                ${formattedAmount} <span className="text-xs font-sans text-ink-muted">{currencySymbol}</span>
              </span>
            </div>
          </div>

          {/* Book Content / Description */}
          {ebookInfo.content && (
            <div className="space-y-2 border-b border-white/10 pb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-faint">Book Content</h3>
              <p className="text-sm text-ink-muted leading-relaxed bg-bg-raised p-4 rounded-xl border border-white/5 whitespace-pre-wrap">
                {ebookInfo.content}
              </p>
            </div>
          )}

          {/* Payment Metadata */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-faint">Payment Info</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-bg-raised p-4 rounded-xl border border-white/5">
              {/* Payment Status */}
              <div>
                <span className="text-ink-faint block text-[0.7rem] uppercase tracking-wider">Status</span>
                <span className="font-semibold text-emerald-400 uppercase tracking-wider">
                  {paymentInfo.status || "paid"}
                </span>
              </div>

              {/* Created At */}
              {formattedDate && (
                <div>
                  <span className="text-ink-faint block text-[0.7rem] uppercase tracking-wider">Date</span>
                  <span className="font-medium text-ink">{formattedDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            <Link
              href="/dashboard"
              className="btn-gold flex-1 py-3 text-center flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold"
            >
              <FiHome className="h-4 w-4" />
              <span>Go to Dashboard</span>
            </Link>
            <Link
              href="/all-ebooks"
              className="btn-ghost flex-1 py-3 text-center flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold"
            >
              <span>Browse Ebooks</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center bg-bg-deep px-4 py-16">
          <p className="text-sm text-gold animate-pulse">Loading payment details...</p>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}