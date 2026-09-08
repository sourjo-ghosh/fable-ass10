"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const roleHomes = {
  user: "/dashboard/user",
  writer: "/dashboard/writer",
  admin: "/dashboard/admin",
};

export default function DashboardOverview() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    const role = session?.user?.role;
    if (role === null || role === undefined) {
      router.replace("/role-selector");
      return;
    }
    const target = roleHomes[role] || "/dashboard/user";
    router.replace(target);
  }, [isPending, session, router]);

  return (
    <div className="grid min-h-[60vh] place-items-center bg-bg-deep text-sm text-ink-muted">
      Preparing your workspace…
    </div>
  );
}
