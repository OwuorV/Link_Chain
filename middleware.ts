import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const protectedRoutes = ["/farms", "/Dashboard/allDashbards", "/Dashboard"];
const publicRoutes = ["/seller/login", "/seller/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  try {
    const session = await getSession();
    if (isProtectedRoute && !session?.userId) {
      console.log(
        "Redirecting to /seller/login: No valid session for protected route"
      );
      return NextResponse.redirect(new URL("/seller/login", req.nextUrl));
    }

    if (
      isPublicRoute &&
      session?.userId &&
      !req.nextUrl.pathname.startsWith("/farms")
    ) {
      console.log("Redirecting to /farms: Valid session for public route");
      return NextResponse.redirect(new URL("/farms", req.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/seller/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
