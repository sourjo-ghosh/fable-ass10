import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

const roleHomes = {
  user: "/dashboard/user",
  writer: "/dashboard/writer",
  admin: "/dashboard/admin",
};

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = session?.user?.role;
  if (role === null || role === undefined) {
    if (pathname === "/role-selector") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/role-selector", request.url));
  }

  // Allow profile page for any logged in user
  if (pathname === "/dashboard/my-profile") {
    return NextResponse.next();
  }

  const myDashboard = roleHomes[role] || "/dashboard/user";
  const isAllowed = pathname === myDashboard || pathname.startsWith(`${myDashboard}/`);
  if (!isAllowed) {
    return NextResponse.redirect(new URL(myDashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/role-selector"],
};
