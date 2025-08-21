// 3. Fix middleware.ts - Remove database calls
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/farms", "/Dashboard/allDashbards", "/Dashboard"];
const publicRoutes = ["/seller/login", "/seller/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  try {
    // Get session from cookie only
    const sessionCookie = req.cookies.get("session")?.value;
    let isAuthenticated = false;

    if (sessionCookie) {
      const payload = await decrypt(sessionCookie);
      isAuthenticated = !!(
        payload &&
        payload.userId &&
        new Date(payload.expiresAt) > new Date()
      );
    }

    // Protect routes that require authentication
    if (isProtectedRoute && !isAuthenticated) {
      console.log(
        "Redirecting to /seller/login: No valid session for protected route"
      );
      return NextResponse.redirect(new URL("/seller/login", req.nextUrl));
    }

    // Redirect authenticated users away from auth pages
    if (
      isPublicRoute &&
      isAuthenticated &&
      !req.nextUrl.pathname.startsWith("/farms")
    ) {
      console.log("Redirecting to /farms: Valid session for public route");
      return NextResponse.redirect(new URL("/farms", req.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/seller/login", req.nextUrl));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
