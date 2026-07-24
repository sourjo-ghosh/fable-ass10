"use client";

import { useState } from "react";
import { FaCloudArrowUp, FaImage } from "react-icons/fa6";
import { AddEbook } from "@/lib/actions/postActions/addEbook";
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

export default function EbookForm() {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" }); // type: "error" | "success" | "info"
  const [submitting, setSubmitting] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user)

  const handleImageChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      let coverUrl = preview;

      if (file) {
        setStatus({ type: "info", message: "Uploading cover image…" });
        const uploaded = await uploadToImgBB(file);
        if (!uploaded) {
          setStatus({ type: "error", message: "Failed to upload cover image. Please try again." });
          setSubmitting(false);
          return;
        }
        coverUrl = uploaded;
        setPreview(uploaded);
      }

      const formData = new FormData(formEl);
      const bookData = {
        title: formData.get("title"),
        content: formData.get("content"),
        price: parseFloat(formData.get("price")),
        genre: formData.get("genre"),
        coverImage: coverUrl,
        authorName: user?.name || "Anonymous",
        authorId: user?.id || null,
        authorEmail: user?.email || null,
        isPublished: false,
      };

      const result = await AddEbook(bookData);

      if (result?.success) {
        toast.success("Ebook created successfully!");
        setStatus({ type: "success", message: "Ebook created successfully!" });
        formEl.reset();
        setPreview("");
        setFile(null);
      } else {
        setStatus({ type: "error", message: result?.error || "Failed to create ebook." });
      }
    } catch (err) {
      console.error("EbookForm submit error:", err);
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const statusColors = {
    error: "text-red-400",
    success: "text-emerald-400",
    info: "text-gold",
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">

      {/* ── Left: Fields ── */}
      <div className="space-y-5 rounded-2xl border border-white/[0.07] bg-bg-card p-6">

        {/* Title */}
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">Title</span>
          <input
            name="title"
            required
            placeholder="Your ebook title"
            className="mt-2 w-full rounded-xl border border-white/10 bg-bg-raised px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-gold/60 transition-colors"
          />
        </label>

        {/* Content */}
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">Full Content</span>
          <textarea
            name="content"
            required
            rows={13}
            placeholder="Write or paste the full ebook content here…"
            className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-bg-raised px-4 py-3 text-sm leading-relaxed text-ink outline-none placeholder:text-ink-faint focus:border-gold/60 transition-colors"
          />
        </label>

        {/* Price + Genre */}
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">Price (USD)</span>
            <input
              name="price"
              required
              type="number"
              min="0"
              step="0.01"
              placeholder="12.99"
              className="mt-2 w-full rounded-xl border border-white/10 bg-bg-raised px-4 py-3 text-sm text-ink outline-none focus:border-gold/60 transition-colors"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">Genre</span>
            <select
              name="genre"
              required
              defaultValue=""
              className="mt-2 w-full rounded-xl border border-white/10 bg-bg-raised px-4 py-3 text-sm text-ink outline-none focus:border-gold/60 transition-colors"
            >
              <option value="" disabled>Select a genre</option>
              {GENRES.map((g) => <option key={g}>{g}</option>)}
            </select>
          </label>
        </div>

        {/* Submit */}
        <div className="pt-3 border-t border-white/[0.07]">
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-xs font-semibold disabled:cursor-wait disabled:opacity-60"
          >
            <FaCloudArrowUp className="h-4 w-4" />
            {submitting ? "Saving…" : "Create Ebook"}
          </button>

          {status.message && (
            <p className={`mt-3 text-xs text-center ${statusColors[status.type] || "text-ink-muted"}`}>
              {status.message}
            </p>
          )}
        </div>
      </div>

      {/* ── Right: Cover Image ── */}
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

        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          Select a cover image to display on your ebook listing.
        </p>
      </aside>

    </form>
  );
}
