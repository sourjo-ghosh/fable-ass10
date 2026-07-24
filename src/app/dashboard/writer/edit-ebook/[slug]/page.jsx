"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCloudArrowUp, FaImage, FaCheck, FaBookOpen, FaArrowLeft } from "react-icons/fa6";
import WriterPageHeader from "@/components/dashboard/WriterPageHeader";
import { getEbookById } from "@/lib/actions/getEbookById";
import { updateEbook } from "@/lib/actions/editActions/updateEbook";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const GENRES = ["Fiction", "Romance", "Fantasy", "Mystery", "Sci-Fi", "Non-fiction", "Horror", "Biography"];

const imgbbKey =
  process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API ||
  process.env.NEXT_PUBLIC_IMGBB_API_KEY;

async function uploadToImgBB(file) {
  if (!imgbbKey) return "";
  try {
    const form = new FormData();
    form.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) return "";
    const data = await res.json();
    return data?.data?.url || "";
  } catch (err) {
    console.error("ImgBB upload error:", err);
    return "";
  }
}

export default function EditEbookPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const slug = params?.slug; // This slug acts as the book ID

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  // Fetch book details directly using single ebook API endpoint
  useEffect(() => {
    async function fetchBookToEdit() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getEbookById(slug);
        if (res?.success && res?.data) {
          setBook(res.data);
          setPreview(res.data.coverImage || res.data.cover || "");
        } else {
          setError(res?.error || "Ebook not found in database.");
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

  const handleImageChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookId = book?._id || book?.id || slug;

    if (!bookId) {
      setStatus({ type: "error", message: "Cannot update: ebook ID is missing." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      let coverUrl = preview || book?.coverImage || book?.cover || "";

      if (file) {
        setStatus({ type: "info", message: "Uploading new cover image…" });
        const uploaded = await uploadToImgBB(file);
        if (!uploaded) {
          setStatus({ type: "error", message: "Failed to upload cover image. Please try again." });
          setSubmitting(false);
          return;
        }
        coverUrl = uploaded;
        setPreview(uploaded);
        setFile(null);
      }

      const formData = new FormData(e.currentTarget);
      const updatedData = {
        title: formData.get("title"),
        content: formData.get("content"),
        price: parseFloat(formData.get("price")),
        genre: formData.get("genre"),
        coverImage: coverUrl,
        authorName: book?.authorName || user?.name || "Anonymous",
        authorId: book?.authorId || user?.id || null,
        authorEmail: book?.authorEmail || user?.email || null,
        isPublished: book?.isPublished ?? false,
      };

      const result = await updateEbook(bookId, updatedData);

      if (result?.success) {
        toast.success("Ebook updated successfully!");
        setStatus({ type: "success", message: "Ebook updated successfully!" });
        setTimeout(() => router.push("/dashboard/writer/manage-ebooks"), 1200);
      } else {
        setStatus({ type: "error", message: result?.error || "Failed to update ebook." });
      }
    } catch (err) {
      console.error("Edit form submit error:", err);
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12 text-ink">
        <WriterPageHeader title="Edit ebook" subtitle="Loading your story details..." />
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
        <WriterPageHeader title="Edit ebook" subtitle="Ebook not found" />
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

  const statusColors = {
    error: "text-red-400",
    success: "text-emerald-400",
    info: "text-gold",
  };

  return (
    <main className="mx-auto max-w-6xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <WriterPageHeader
        title="Edit ebook"
        subtitle={`Updating "${book.title || "Untitled Ebook"}"`}
      />

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Left: Fields */}
        <div className="space-y-5 rounded-2xl border border-white/[0.07] bg-bg-card p-6">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">Title</span>
            <input
              name="title"
              required
              defaultValue={book.title || ""}
              placeholder="Your ebook title"
              className="mt-2 w-full rounded-xl border border-white/10 bg-bg-raised px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-gold/60 transition-colors"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">Full Content</span>
            <textarea
              name="content"
              required
              rows={13}
              defaultValue={book.content || ""}
              placeholder="Write or paste the full ebook content here…"
              className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-bg-raised px-4 py-3 text-sm leading-relaxed text-ink outline-none placeholder:text-ink-faint focus:border-gold/60 transition-colors"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">Price (USD)</span>
              <input
                name="price"
                required
                type="number"
                min="0"
                step="0.01"
                defaultValue={book.price ?? ""}
                placeholder="12.99"
                className="mt-2 w-full rounded-xl border border-white/10 bg-bg-raised px-4 py-3 text-sm text-ink outline-none focus:border-gold/60 transition-colors"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">Genre</span>
              <select
                name="genre"
                required
                defaultValue={book.genre || ""}
                className="mt-2 w-full rounded-xl border border-white/10 bg-bg-raised px-4 py-3 text-sm text-ink outline-none focus:border-gold/60 transition-colors"
              >
                <option value="" disabled>Select a genre</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="pt-3 border-t border-white/[0.07]">
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-xs font-semibold disabled:cursor-wait disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg-deep border-t-transparent" />
                  Saving changes…
                </>
              ) : (
                <>
                  <FaCloudArrowUp className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>

            {status.message && (
              <p className={`mt-3 flex items-center justify-center gap-1.5 text-xs text-center ${statusColors[status.type] || "text-ink-muted"}`}>
                {status.type === "success" && <FaCheck className="h-3 w-3" />}
                {status.message}
              </p>
            )}
          </div>
        </div>

        {/* Right: Cover Image */}
        <aside className="h-fit rounded-2xl border border-white/[0.07] bg-bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">Cover Image</p>

          <label className="mt-4 flex min-h-[280px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/[0.16] bg-bg-raised text-center transition-colors hover:border-gold/50">
            {preview ? (
              <img src={preview} alt="Cover preview" className="h-[280px] w-full object-cover" />
            ) : (
              <>
                <FaImage className="mb-3 h-7 w-7 text-gold" />
                <span className="text-sm font-medium text-ink">Upload cover image</span>
                <span className="mt-1 text-xs text-ink-muted">PNG, JPG, or WEBP</span>
              </>
            )}
            <input
              name="coverImage"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="sr-only"
            />
          </label>

          {file && (
            <p className="mt-2 text-xs text-gold text-center">
              New image selected — will upload on save.
            </p>
          )}

          <p className="mt-3 text-xs leading-relaxed text-ink-muted">
            Leave unchanged to keep the existing cover. Upload a new image to replace it.
          </p>
        </aside>
      </form>
    </main>
  );
}
