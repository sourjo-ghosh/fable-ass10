import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";


const roleHomes = {
  user: "/dashboard/user",
  writer: "/dashboard/writer",
  admin: "/dashboard/admin",
};

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const role = session?.user?.role || "user";
    const myDashboard = roleHomes[role];
    const pathname = request.nextUrl.pathname;
    if (pathname === "/dashboard/my-profile") {
        return NextResponse.next();
    }
    const isAllowed = pathname === myDashboard || pathname.startsWith(`${myDashboard}/`);
    if (!isAllowed) {
        return NextResponse.redirect(new URL(myDashboard, request.url));
    }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path", "/my-profile",],
};
