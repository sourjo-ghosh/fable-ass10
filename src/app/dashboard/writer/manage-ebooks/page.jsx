"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WriterPageHeader from "@/components/dashboard/WriterPageHeader";
import { FaPen, FaPlus, FaTrash, FaRotateRight, FaTriangleExclamation, FaXmark } from "react-icons/fa6";
import { GetALlEbooks } from "@/lib/actions/Ebooks";
import { DeleteEbook } from "@/lib/actions/deleteActions/deleteEbook";
import toast from "react-hot-toast";

export default function WriterEbooksPage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Confirmation modal state
  const [confirmDelete, setConfirmDelete] = useState(null); // { id, title }
  const [deleting, setDeleting] = useState(false);

  const fetchEbooks = async () => {
    setLoading(true);
    try {
      const res = await GetALlEbooks();
      setEbooks(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch ebooks:", err);
      toast.error("Failed to load ebooks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEbooks();
  }, []);

  const handleDeleteClick = (id, title) => {
    setConfirmDelete({ id, title });
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete?.id) return;
    setDeleting(true);
    try {
      const result = await DeleteEbook(confirmDelete.id);
      if (result?.success) {
        // Optimistically remove from list
        setEbooks((prev) => prev.filter((b) => (b._id || b.id) !== confirmDelete.id));
        toast.success(`"${confirmDelete.title}" deleted successfully.`);
      } else {
        toast.error(result?.error || "Failed to delete ebook.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
      setConfirmDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    if (!deleting) setConfirmDelete(null);
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <WriterPageHeader
            title="Manage ebooks"
            subtitle="Create, edit, and delete your catalogue."
            back={false}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={fetchEbooks}
              disabled={loading}
              title="Refresh"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-bg-card px-3 py-2.5 text-xs font-medium text-ink-muted transition hover:text-gold hover:border-gold/30 disabled:opacity-50"
            >
              <FaRotateRight className={`h-3.5 w-3.5 ${loading ? "animate-spin text-gold" : ""}`} />
            </button>
            <Link
              href="/dashboard/writer/add-ebook"
              className="btn-gold shrink-0 px-5 py-3 text-xs no-underline"
            >
              <FaPlus /> Add ebook
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/[0.07] bg-bg-card">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-white/[0.07] text-[0.65rem] tracking-[0.15em] text-ink-faint uppercase">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {loading ? (
                // Skeleton rows
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-5">
                      <div className="h-4 w-40 rounded-md bg-white/[0.06]" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-16 rounded-md bg-white/[0.06]" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-5 w-20 rounded-full bg-white/[0.06]" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <div className="h-7 w-14 rounded-lg bg-white/[0.06]" />
                        <div className="h-7 w-20 rounded-lg bg-white/[0.06]" />
                        <div className="h-7 w-7 rounded-lg bg-white/[0.06]" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : ebooks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-sm text-ink-muted">
                    No ebooks found. Click &quot;Add ebook&quot; to create your first one.
                  </td>
                </tr>
              ) : (
                ebooks.map((book, index) => {
                  const id = book._id || book.id || index;
                  const title = book.title || "Untitled Ebook";
                  const price =
                    typeof book.price === "number"
                      ? `$${book.price.toFixed(2)}`
                      : book.price || "$0.00";
                  const isPublished = book.isPublished;

                  return (
                    <tr
                      key={id}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-5 font-serif text-lg font-semibold text-ink">
                        {title}
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold text-gold">
                        {price}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
                            isPublished
                              ? "border-emerald-500/20 bg-emerald-400/10 text-emerald-300"
                              : "border-amber-500/20 bg-amber-400/10 text-amber-200"
                          }`}
                        >
                          {isPublished ? "Published" : "Unpublished"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {/* Edit */}
                          <Link
                            href={`/dashboard/writer/edit-ebook/${id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] px-3 py-2 text-xs font-medium text-ink no-underline transition-colors hover:border-gold/40 hover:text-gold"
                          >
                            <FaPen className="h-3 w-3" /> Edit
                          </Link>

                          {/* Publish toggle (placeholder — wire to your publish API) */}
                          <button
                            type="button"
                            className="rounded-lg border border-gold/25 bg-gold-dim px-3 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/20"
                          >
                            {isPublished ? "Unpublish" : "Publish"}
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(id, title)}
                            aria-label={`Delete ${title}`}
                            className="rounded-lg border border-red-400/20 bg-red-500/10 p-2 text-red-300 transition-colors hover:bg-red-500/20 hover:text-red-200"
                          >
                            <FaTrash className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ── Delete Confirmation Modal ── */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={handleDeleteCancel}
        >
          <div
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-bg-card p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleDeleteCancel}
              disabled={deleting}
              className="absolute top-4 right-4 rounded-full p-1.5 text-ink-muted hover:text-ink transition disabled:opacity-40"
            >
              <FaXmark className="h-4 w-4" />
            </button>

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 mx-auto mb-5">
              <FaTriangleExclamation className="h-6 w-6 text-red-400" />
            </div>

            {/* Text */}
            <h2 className="font-serif text-xl font-semibold text-ink text-center">
              Delete Ebook?
            </h2>
            <p className="mt-2 text-sm text-ink-muted text-center leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="text-ink">&quot;{confirmDelete.title}&quot;</strong>?{" "}
              This action <span className="text-red-400 font-semibold">cannot be undone</span>.
            </p>

            {/* Actions */}
            <div className="mt-7 flex gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={deleting}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-white/10 hover:text-ink disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/15 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/25 hover:text-red-200 disabled:cursor-wait disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-transparent" />
                    Deleting…
                  </>
                ) : (
                  <>
                    <FaTrash className="h-3.5 w-3.5" />
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
