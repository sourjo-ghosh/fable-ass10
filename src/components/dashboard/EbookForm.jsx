"use client";

import { useState } from "react";
import { FaCloudArrowUp, FaImage } from "react-icons/fa6";
import { AddEbook } from "@/lib/actions/postActions/addEbook";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function EbookForm({
  initialBook = {},
  submitLabel = "Create ebook",
}) {
  const [preview, setPreview] = useState(
    initialBook.cover || initialBook.coverImage || "",
  );
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const imgbbKey =
    process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API ||
    process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const chooseImage = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setMessage("");
  };

  const uploadImageToImgBB = async (fileToUpload) => {
    if (!imgbbKey) return "";
    try {
      const upload = new FormData();
      upload.append("image", fileToUpload);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        { method: "POST", body: upload },
      );
      if (!response.ok) return "";
      const data = await response.json();
      return data?.data?.url || "";
    } catch (error) {
      console.error("ImgBB Upload error:", error);
      return "";
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    setSubmitting(true);
    setMessage("");

    try {
      let coverUrl =
        preview || initialBook.cover || initialBook.coverImage || "";

      if (file) {
        setMessage("Uploading cover image...");
        const uploadedUrl = await uploadImageToImgBB(file);
        if (uploadedUrl) {
          coverUrl = uploadedUrl;
          setPreview(uploadedUrl);
        } else {
          setMessage("Unable to upload cover image. Please try again.");
          setSubmitting(false);
          return;
        }
      }

      const formData = new FormData(formElement);
      const bookData = {
        title: formData.get("title"),
        content: formData.get("content"),
        price: parseFloat(formData.get("price")),
        genre: formData.get("genre"),
        coverImage: coverUrl,
        authorName: user?.name || "Anonymous",
        authorId: user?.id || null,
        authorEmail: user?.email || null,
        isPublished: false
      };

      const result = await AddEbook(bookData);

      if (result?.success) {
        setMessage("Ebook saved successfully!");
        e.target.reset();
        setPreview("")
        toast.success("Ebook created successfully")
      } else {
        setMessage(result?.error || "Failed to save ebook.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]"
    >
      {/* Main Form Section */}
      <div className="space-y-5 rounded-2xl border border-white/[0.07] bg-bg-card p-6">
        <label className="block">
          <span className="text-xs font-bold tracking-[.14em] text-ink-faint uppercase">
            Title
          </span>
          <input
            name="title"
            required
            defaultValue={initialBook.title || ""}
            placeholder="Your ebook title"
            className="mt-2 w-full rounded-xl border border-white/[.1] bg-bg-raised px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-gold/60"
          />
        </label>

        <label className="block">
          <span className="text-xs font-bold tracking-[.14em] text-ink-faint uppercase">
            Full content
          </span>
          <textarea
            name="content"
            required
            defaultValue={initialBook.content || ""}
            placeholder="Write or paste the full ebook content here…"
            rows="13"
            className="mt-2 w-full resize-y rounded-xl border border-white/[.1] bg-bg-raised px-4 py-3 text-sm leading-relaxed text-ink outline-none placeholder:text-ink-faint focus:border-gold/60"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-bold tracking-[.14em] text-ink-faint uppercase">
              Price (USD)
            </span>
            <input
              name="price"
              required
              min="0"
              step="0.01"
              type="number"
              defaultValue={initialBook.price || ""}
              placeholder="12.99"
              className="mt-2 w-full rounded-xl border border-white/[.1] bg-bg-raised px-4 py-3 text-sm text-ink outline-none focus:border-gold/60"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold tracking-[.14em] text-ink-faint uppercase">
              Genre
            </span>
            <select
              name="genre"
              required
              defaultValue={initialBook.genre || ""}
              className="mt-2 w-full rounded-xl border border-white/[.1] bg-bg-raised px-4 py-3 text-sm text-ink outline-none focus:border-gold/60"
            >
              <option value="" disabled>
                Select a genre
              </option>
              <option>Fiction</option>
              <option>Romance</option>
              <option>Fantasy</option>
              <option>Mystery</option>
              <option>Sci-Fi</option>
              <option>Non-fiction</option>
            </select>
          </label>
        </div>

        {/* Submit Action */}
      </div>

      {/* Cover Image Sidebar */}
      <aside className="h-fit rounded-2xl border border-white/[0.07] bg-bg-card p-5">
        <p className="text-xs font-bold tracking-[.14em] text-ink-faint uppercase">
          Cover image
        </p>
        <label className="mt-4 flex min-h-70 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/[.16] bg-bg-raised text-center transition-colors hover:border-gold/50">
          {preview ? (
            <img
              src={preview}
              alt="Ebook cover preview"
              className="h-70 w-full object-cover"
            />
          ) : (
            <>
              <FaImage className="mb-3 h-7 w-7 text-gold" />
              <span className="text-sm font-medium text-ink">
                Upload cover image
              </span>
              <span className="mt-1 text-xs text-ink-muted">
                PNG, JPG, or WEBP
              </span>
            </>
          )}
          <input
            name="coverImage"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={chooseImage}
            className="sr-only"
          />
        </label>
        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          Select a cover image to display on your ebook listing.
        </p>
      </aside>
      <div className="pt-3 border-t border-white/[0.07]">
        <button
          type="submit"
          disabled={submitting}
          className="btn-gold flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-xs font-semibold disabled:cursor-wait disabled:opacity-60"
        >
          <FaCloudArrowUp className="h-4 w-4" />
          {submitting ? "Saving..." : submitLabel}
        </button>
        {message && (
          <p className="mt-3 text-xs leading-relaxed text-gold text-center">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
