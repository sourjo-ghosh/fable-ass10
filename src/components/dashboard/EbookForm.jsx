"use client";

import { useState } from "react";
import { FaCloudArrowUp, FaImage } from "react-icons/fa6";

export default function EbookForm({
  initialBook = {},
  submitLabel = "Create ebook",
}) {
  const [preview, setPreview] = useState(initialBook.cover || "");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const chooseImage = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setMessage("");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const imgbbKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
    const fromData = new FormData(e.target);
    const data = Object.fromEntries(fromData.entries());
    try {
      if (file && imgbbKey) {
        const upload = new FormData();
        upload.append("image", file);
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          { method: "POST", body: upload },
        );
        if (!response.ok) throw new Error("Image upload failed");
        const imgData = await response.json();
        fromData.set("coverImage", imgData.data.url);
        setPreview(imgData.data.url);
        setMessage(
          "Cover uploaded successfully.",
        );
      } else if (file) {
        setMessage(
          "Cover preview ready.",
        );
      } else {
        setMessage(
          "Form is ready.",
        );
      }
    } catch (error) {
      setMessage(error.message || "Unable to upload the cover image.");
    } finally {
      setSubmitting(false);
    }
    // console.log(data);
    const formData = {
      title: data.title,
      content: data.content,
      price: parseFloat(data.price),
      genre: data.genre,
      coverImage: data.coverImage || preview || "",
    };
    console.log("Form Data:", formData);
    // Here you can send formData to your backend or API
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]"
    >
      <div className="space-y-5 rounded-2xl border border-white/[0.07] bg-bg-card p-6">
        <label className="block">
          <span className="text-xs font-bold tracking-[.14em] text-ink-faint uppercase">
            Title
          </span>
          <input
            required
            defaultValue={initialBook.title}
            placeholder="Your ebook title"
            className="mt-2 w-full rounded-xl border border-white/[.1] bg-bg-raised px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-gold/60"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold tracking-[.14em] text-ink-faint uppercase">
            Full content
          </span>
          <textarea
            required
            defaultValue={initialBook.content}
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
              required
              min="0"
              step="0.01"
              type="number"
              defaultValue={initialBook.price}
              placeholder="12.99"
              className="mt-2 w-full rounded-xl border border-white/[.1] bg-bg-raised px-4 py-3 text-sm text-ink outline-none focus:border-gold/60"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold tracking-[.14em] text-ink-faint uppercase">
              Genre
            </span>
            <select
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
      </div>
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
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={chooseImage}
            className="sr-only"
          />
        </label>
        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          Images upload through imgBB when{" "}
          <code className="text-gold">NEXT_PUBLIC_IMGBB_API_KEY</code> is
          configured.
        </p>
        <button
          disabled={submitting}
          className="btn-gold mt-5 w-full justify-center px-5 py-3 text-xs disabled:cursor-wait disabled:opacity-60"
        >
          <FaCloudArrowUp /> {submitting ? "Uploading…" : submitLabel}
        </button>
        {message && (
          <p className="mt-3 text-xs leading-relaxed text-gold">{message}</p>
        )}
      </aside>
    </form>
  );

