import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.includes("/admin/login")) {
    // Check session via better-auth cookie
    const sessionCookie = request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Validate session with the backend API
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${apiUrl}/auth/get-session`, {
        headers: {
          Cookie: `better-auth.session_token=${sessionCookie.value}`,
        },
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      // Check role if needed
      // const { user } = await res.json();
      // if (user.role !== 'admin' && user.role !== 'superadmin') { ... }

      return NextResponse.next();
    } catch (error: any) {
      if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
      console.error("Middleware session check failed:", error);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
