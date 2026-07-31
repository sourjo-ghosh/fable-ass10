"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiBookOpen, FiUser, FiTag, FiArrowLeft, FiXCircle } from "react-icons/fi";
import { getEbookById } from "@/lib/actions/get/getEbookById";

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const ebookId = searchParams.get("ebookId") || searchParams.get("ebook_id") || searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [ebookInfo, setEbookInfo] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchEbookDetails = async () => {
      if (!ebookId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getEbookById(ebookId);
        // Handle whether res is { success: true, data: ... } or the raw book object directly
        const book = res?.data ? res.data : res?.success ? res : res;
        if (book && (book.title || book._id)) {
          setEbookInfo(book);
        }
      } catch (err) {
        console.error("Error fetching eBook details on cancel page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEbookDetails();
  }, [ebookId]);

  const targetEbookId = ebookId || ebookInfo?._id;
  const returnUrl = targetEbookId ? `/all-ebooks/${targetEbookId}` : "/all-ebooks";

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-bg-deep px-4 py-16">
        <div className="text-center space-y-3">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="text-sm text-ink-muted">Loading eBook details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-deep text-ink py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-bg-card border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Cancel Icon & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mx-auto">
            <FiXCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-ink">Payment Canceled</h1>
          <p className="text-xs text-ink-muted leading-relaxed max-w-sm mx-auto">
            Your payment was canceled and no charge was processed. You can return to the eBook page to try again or browse other titles.
          </p>
        </div>

        {/* Ebook Details Card */}
        {ebookInfo && (
          <div className="bg-bg-raised border border-white/5 rounded-xl p-4 flex items-center gap-4">
            {ebookInfo.coverImage && !imgError ? (
              <div className="relative h-24 w-18 shrink-0 overflow-hidden rounded-lg bg-bg-deep border border-white/10">
                <Image
                  src={ebookInfo.coverImage}
                  alt={ebookInfo.title || "eBook Cover"}
                  fill
                  unoptimized
                  onError={() => setImgError(true)}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-24 w-18 shrink-0 rounded-lg bg-bg-deep border border-white/10 flex items-center justify-center">
                <FiBookOpen className="h-6 w-6 text-gold-dim" />
              </div>
            )}

            <div className="space-y-1 flex-1 min-w-0">
              {ebookInfo.genre && (
                <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-wider text-gold bg-gold-dim/20 px-2 py-0.5 rounded-full border border-gold-dim/30">
                  <FiTag className="h-2.5 w-2.5" />
                  {ebookInfo.genre}
                </span>
              )}
              <h3 className="text-base font-serif font-bold text-ink truncate">
                {ebookInfo.title || "Untitled Book"}
              </h3>
              {(ebookInfo.authorName || ebookInfo.writerName) && (
                <p className="text-xs text-ink-muted flex items-center gap-1">
                  <FiUser className="h-3 w-3 text-gold shrink-0" />
                  <span>By {ebookInfo.authorName || ebookInfo.writerName}</span>
                </p>
              )}
              {ebookInfo.price !== undefined && (
                <p className="text-xs font-semibold text-gold font-serif pt-1">
                  ${typeof ebookInfo.price === "number" ? ebookInfo.price.toFixed(2) : ebookInfo.price} USD
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href={returnUrl}
            className="btn-gold flex-1 py-3.5 text-center flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold shadow-lg"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span>Return to eBook</span>
          </Link>
          <Link
            href="/all-ebooks"
            className="btn-ghost flex-1 py-3.5 text-center flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold"
          >
            <span>Browse All Ebooks</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancel() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center bg-bg-deep px-4 py-16">
          <p className="text-sm text-gold animate-pulse">Loading...</p>
        </div>
      }
    >
      <PaymentCancelContent />
    </Suspense>
  );
}
