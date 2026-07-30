"use client";
import AdminTableHeader from "@/components/dashboard/AdminTableHeader";
import { DeleteEbookAdmin } from "@/lib/actions/admin/deleteEbook";
import { PublishUnpublishAdmin } from "@/lib/actions/admin/togglePublish";
import { AllEbooksAdmin } from "@/lib/actions/admin/getAllEbooks";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaRotateRight,
  FaTrash,
  FaTriangleExclamation,
  FaXmark,
} from "react-icons/fa6";

export default function ManageEbooksPage() {
  const [loading, setLoading] = useState(true);
  const [ebooks, setEbooks] = useState([]);
  const { data: session } = authClient.useSession();
  const adminId = session?.user?.id;
  const [confirmDelete, setConfirmDelete] = useState(null); // { id, title }
  const [deleting, setDeleting] = useState(false);
  const fetchAllEbooks = async () => {
    if (!adminId) return;
    setLoading(true);
    try {
      const res = await AllEbooksAdmin({ adminId });
      setEbooks(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllEbooks();
  }, [adminId]);
  const handlePublishUnPublish = async (ebookId) => {
    try {
      const result = await PublishUnpublishAdmin(ebookId, adminId);
      if (result?.success) {
        setEbooks((prev) =>
          prev.map((book) =>
            (book._id || book.id) === ebookId
              ? { ...book, isPublished: !book.isPublished }
              : book,
          ),
        );
        toast.success(result?.data?.message || "Status updated!");
      } else {
        toast.error(result?.error || "Failed to update.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  const handleDeleteClick = (id, tittle) => {
    setConfirmDelete({ id, tittle });
  };
  const handleDeleteConfirm = async () => {
    if (!confirmDelete?.id) return;
    setDeleting(true);
    try {
      const result = await DeleteEbookAdmin(confirmDelete.id, adminId);
      if (result?.success) {
        // Optimistically remove from list
        setEbooks((prev) =>
          prev.filter((b) => (b._id || b.id) !== confirmDelete.id),
        );
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
        <div className="flex flex-row justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <AdminTableHeader
              title="Manage Ebooks"
              subtitle="Update account roles and manage access across Fable."
            />
          </div>
          <div>
            <button
              onClick={fetchAllEbooks}
              disabled={loading}
              title="Refresh"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-bg-card px-3 py-2.5 text-xs font-medium text-ink-muted transition hover:text-gold hover:border-gold/30 disabled:opacity-50"
            >
              <FaRotateRight
                className={`h-3.5 w-3.5 ${loading ? "animate-spin text-gold" : ""}`}
              />
            </button>
          </div>
        </div>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/[0.07] bg-bg-card">
          <table className="w-full min-w-210 text-left">
            <thead className="border-b border-white/[0.07] text-[.65rem] tracking-[.15em] text-ink-faint uppercase">
              <tr>
                {["Title", "Writer", "Price", "Status", "Actions"].map((x) => (
                  <th key={x} className="px-6 py-4">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            {ebooks.length == 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-ink-muted"
                  >
                    No ebooks found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {ebooks.map((ebook) => (
                  <tr
                    key={ebook._id}
                    className="border-b border-white/[0.05] last:border-0"
                  >
                    <td className="px-6 py-5 font-serif text-lg font-semibold text-ink">
                      {ebook.title}
                    </td>
                    <td className="px-6 py-5 text-sm text-ink-muted">
                      {ebook.authorName}
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-gold">
                      {ebook.price}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${ebook.status === "Available" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-200"}`}
                      >
                        {ebook.status}
                      </span>
                    </td>
                    <td className="flex gap-2 px-6 py-5">
                      <button
                        onClick={() => {
                          handlePublishUnPublish(ebook._id);
                        }}
                        className="rounded-lg border border-gold/25 bg-gold-dim px-3 py-2 text-xs font-medium text-gold hover:bg-gold/20"
                      >
                        {ebook.isPublished ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteClick(ebook._id, ebook.title)
                        }
                        className="rounded-lg border border-red-400/20 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20"
                        aria-label={`Delete ${ebook.title}`}
                      >
                        <FaTrash className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </main>
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
              <strong className="text-ink">
                &quot;{confirmDelete.title}&quot;
              </strong>
              ? This action{" "}
              <span className="text-red-400 font-semibold">
                cannot be undone
              </span>
              .
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
