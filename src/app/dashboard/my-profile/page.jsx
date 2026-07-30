"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaCloudArrowUp, FaImage, FaPen } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

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

const roleLabels = {
  reader: "Reader",
  user: "Reader",
  writer: "Writer",
  admin: "Admin",
};

export default function MyProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name || "");
    setEmail(user.email || "");
    setPreview(user.image || "");
    setFile(null);
  }, [user]);

  const handleImageChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      toast.error("Name is required.");
      return;
    }
    if (!trimmedEmail) {
      toast.error("Email is required.");
      return;
    }

    setSaving(true);

    try {
      let imageUrl = user.image || "";

      if (file) {
        toast.loading("Uploading profile photo…", { id: "profile-upload" });
        const uploaded = await uploadToImgBB(file);
        toast.dismiss("profile-upload");

        if (!uploaded) {
          toast.error("Failed to upload profile photo. Please try again.");
          setSaving(false);
          return;
        }
        imageUrl = uploaded;
      } else if (preview && preview !== user.image) {
        imageUrl = preview;
      }

      const { error: updateError } = await authClient.updateUser({
        name: trimmedName,
        image: imageUrl || undefined,
      });

      if (updateError) {
        toast.error(updateError.message || "Could not update profile.");
        setSaving(false);
        return;
      }

      if (trimmedEmail !== user.email) {
        const { error: emailError } = await authClient.changeEmail({
          newEmail: trimmedEmail,
          callbackURL: "/dashboard/my-profile",
        });

        if (emailError) {
          toast.error(
            emailError.message ||
              "Name and photo saved, but email could not be updated.",
          );
          await refetch();
          setSaving(false);
          setEditing(false);
          return;
        }

        toast.success(
          "Profile updated. Check your inbox to verify your new email address.",
        );
      } else {
        toast.success("Profile updated successfully.");
      }

      await refetch();
      setFile(null);
      setEditing(false);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="grid min-h-dvh place-items-center text-sm text-ink-muted">
        Loading your profile…
      </div>
    );
  }

  const role = user.role || "reader";
  const roleHome =
    role === "admin"
      ? "/dashboard/admin"
      : role === "writer"
        ? "/dashboard/writer"
        : "/dashboard/user";
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <main className="mx-auto max-w-3xl px-5 pt-22 pb-12 sm:px-8 lg:px-12 lg:pt-12">
      <Link
        href={roleHome}
        className="inline-flex items-center gap-2 text-sm text-ink-muted no-underline hover:text-gold"
      >
        <FaArrowLeft className="h-3 w-3" /> Back to dashboard
      </Link>

      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-gold uppercase">
            Account
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">
            My profile
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Update your name, email, and profile photo.
          </p>
        </div>
        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="btn-ghost px-5 py-3 text-xs"
          >
            <FaPen /> Edit profile
          </button>
        )}
      </div>

      <section className="mt-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-card">
        <div className="h-28 bg-[linear-gradient(125deg,rgba(201,169,110,0.35),rgba(19,18,16,0.1),rgba(201,169,110,0.08))]" />

        <form onSubmit={handleSubmit} className="px-6 pb-7 sm:px-8">
          <div className="-mt-12 flex items-end gap-5">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-bg-card bg-gradient-to-br from-gold-light to-gold shadow-lg">
              {preview ? (
                <Image
                  src={preview}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-serif text-4xl font-semibold text-bg-deep">
                  {(name || user.email || "U")[0].toUpperCase()}
                </span>
              )}
            </div>

            {editing && (
              <label className="cursor-pointer">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-bg-raised px-4 py-2.5 text-xs font-medium text-ink transition-colors hover:border-gold/30">
                  <FaCloudArrowUp className="text-gold" />
                  Change photo
                </span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {!editing ? (
            <div className="mt-6">
              <h2 className="font-serif text-3xl font-semibold text-ink">
                {user.name || "Reader"}
              </h2>
              <p className="mt-1 text-sm text-ink-muted">{user.email}</p>
              <div className="mt-7 grid gap-4 border-t border-white/[0.07] pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-ink-faint uppercase">
                    Role
                  </p>
                  <p className="mt-2 text-sm text-ink">
                    {roleLabels[role] || "Reader"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-ink-faint uppercase">
                    Member since
                  </p>
                  <p className="mt-2 text-sm text-ink">{memberSince}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="profile-name"
                  className="text-xs font-bold tracking-[0.14em] text-ink-faint uppercase"
                >
                  Full name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-bg-raised px-4 py-3 text-sm text-ink outline-none focus:border-gold/40"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="text-xs font-bold tracking-[0.14em] text-ink-faint uppercase"
                >
                  Email address
                </label>
                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-bg-raised px-4 py-3 text-sm text-ink outline-none focus:border-gold/40"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="rounded-2xl border border-dashed border-white/10 bg-bg-raised/50 p-5">
                <div className="flex items-center gap-3 text-sm text-ink-muted">
                  <FaImage className="text-gold" />
                  <span>
                    PNG, JPG, or WebP. Uploads go to ImgBB when you save.
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-white/[0.07] pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-gold px-6 py-3 text-xs disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setEditing(false);
                    setName(user.name || "");
                    setEmail(user.email || "");
                    setPreview(user.image || "");
                    setFile(null);
                  }}
                  className="btn-ghost px-6 py-3 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
