"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Sidebar from "@/components/dashboard/SideBar";

const roleHomes = {
  reader: "/dashboard/user",
  writer: "/dashboard/writer",
  admin: "/dashboard/admin",
};

export default function DashboardShell({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const role = session?.user?.role || "reader";
  const home = roleHomes[role] || roleHomes.reader;

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    if (pathname !== home && !pathname.startsWith(`${home}/`)) {
      router.replace(home);
    }
  }, [home, isPending, pathname, router, session]);

  if (isPending || !session || (pathname !== home && !pathname.startsWith(`${home}/`))) {
    return <div className="grid min-h-dvh place-items-center bg-bg-deep text-sm text-ink-muted">Loading your workspace…</div>;
  }

  return <div className="flex min-h-dvh bg-bg-deep"><Sidebar role={role} /><div className="min-w-0 flex-1">{children}</div></div>;
}
