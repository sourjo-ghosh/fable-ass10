"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaBookOpen, FaPenNib } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const roles = [
  {
    value: "reader",
    title: "Reader",
    description: "Discover new stories, build your library, and keep track of every book you love.",
    href: "/dashboard/user",
    icon: FaBookOpen,
  },
  {
    value: "writer",
    title: "Writer",
    description: "Create, publish, and manage your ebooks for readers around the world.",
    href: "/dashboard/writer",
    icon: FaPenNib,
  },
];

export default function RoleSelectorPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, router, session]);

  const chooseRole = async (role) => {
    setSelectedRole(role.value);
    const { error } = await authClient.updateUser({ role: role.value });

    if (error) {
      setSelectedRole(null);
      toast.error(error.message || "We couldn't save your role. Please try again.");
      return;
    }

    toast.success(`Welcome to Fable, ${role.title}!`);
    router.replace(role.href);
    router.refresh();
  };

  if (isPending || !session) {
    return <div className="grid min-h-dvh place-items-center bg-bg-deep text-sm text-ink-muted">Preparing your next chapter…</div>;
  }

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-bg-deep px-5 py-12 text-ink">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -right-36 -bottom-36 h-96 w-96 rounded-full bg-gold/8 blur-3xl" />
      <section className="relative w-full max-w-4xl rounded-3xl border border-white/[0.09] bg-bg-card p-7 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Welcome to Fable</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">How would you like to use Fable?</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">Choose a role to personalize your workspace. You can change it later from your account settings.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSaving = selectedRole === role.value;
            return (
              <button key={role.value} type="button" onClick={() => chooseRole(role)} disabled={selectedRole !== null} className="group rounded-2xl border border-white/[0.09] bg-bg-raised p-7 text-left transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_16px_40px_rgba(0,0,0,.28)] disabled:cursor-wait disabled:opacity-70">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-dim text-xl text-gold"><Icon /></span>
                <h2 className="mt-5 font-serif text-3xl font-semibold">{role.title}</h2>
                <p className="mt-2 min-h-12 text-sm leading-relaxed text-ink-muted">{role.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">{isSaving ? "Saving…" : "Choose this role"}<FaArrowRight className="transition-transform group-hover:translate-x-1" /></span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
