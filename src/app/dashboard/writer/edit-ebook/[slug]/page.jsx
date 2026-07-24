"use client";

import { useState, useEffect, use } from "react";
import EditForm from "@/components/dashboard/EditForm";
import WriterPageHeader from "@/components/dashboard/WriterPageHeader";
import { GetEbookById, GetALlEbooks } from "@/lib/actions/Ebooks";
import { FaBookOpen, FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

export default function EditEbookPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const slug = params?.slug;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookToEdit() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        // Fetch single ebook by ID
        const res = await GetEbookById({ id: slug });
        if (res?.data && typeof res.data === "object" && !Array.isArray(res.data)) {
          setBook(res.data);
        } else {
          // Check in all ebooks list if needed
          const allRes = await GetALlEbooks();
          if (allRes?.data && Array.isArray(allRes.data)) {
            const found = allRes.data.find(
              (b) => (b._id || b.id || "").toString() === slug.toString()
            );
            if (found) {
              setBook(found);
            } else {
              setError("Ebook not found in database.");
            }
          } else {
            setError(res?.error || "Ebook not found.");
          }
        }
      } catch (err) {
        console.error("Error fetching ebook for edit:", err);
        setError("Failed to load ebook data.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookToEdit();
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12 text-ink">
        <WriterPageHeader
          title="Edit ebook"
          subtitle="Loading your story details..."
        />
        <div className="mt-12 flex flex-col items-center justify-center p-12 rounded-2xl border border-white/10 bg-bg-card text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent mb-4" />
          <p className="text-sm text-ink-muted">Fetching ebook data from server...</p>
        </div>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12 text-ink">
        <WriterPageHeader
          title="Edit ebook"
          subtitle="Ebook not found"
        />
        <div className="mt-8 rounded-2xl border border-white/10 bg-bg-card p-8 text-center">
          <FaBookOpen className="mx-auto h-12 w-12 text-gold/40 mb-3" />
          <h2 className="font-serif text-xl font-semibold text-ink">Could not load ebook</h2>
          <p className="mt-2 text-sm text-ink-muted">{error || "The requested ebook does not exist."}</p>
          <Link
            href="/dashboard/writer/manage-ebooks"
            className="btn-gold mt-6 inline-flex items-center gap-2 px-6 py-2.5 text-xs no-underline"
          >
            <FaArrowLeft /> Back to Manage Ebooks
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <WriterPageHeader
        title="Edit ebook"
        subtitle={`Updating "${book.title || 'Untitled Ebook'}"`}
      />
      <EditForm book={book} />
    </main>
  );
}
