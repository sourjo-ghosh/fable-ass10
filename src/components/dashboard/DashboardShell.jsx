"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Sidebar from "@/components/dashboard/SideBar";

const roleHomes = {
  user: "/dashboard/user",
  writer: "/dashboard/writer",
  admin: "/dashboard/admin",
};

export default function DashboardShell({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const role = session?.user?.role;
  const home = roleHomes[role];

  const isProfileRoute = pathname === "/dashboard/my-profile";


  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    if (role === null || role === undefined) {
      router.replace("/role-selector");
    }
  }, [home, isPending, router, session, role]);

  if (isPending || !session || role === null || role === undefined) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bg-deep text-sm text-ink-muted">
        Loading your workspace…
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-bg-deep">
      <Sidebar role={role} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
