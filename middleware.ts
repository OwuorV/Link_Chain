import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getShops } from "./lib/getShop";

import { decrypt } from "@/lib/session";

const protectedRoutes = ["/farms", "/Dashboard/allDashbards", "/Dashboard"];
const publicRoutes = ["/seller/login", "/seller/signup", "/"];

export default async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (session) {
    const payload = await decrypt(session);
    console.log("Middleware session check:", {
      path: req.nextUrl.pathname,
      hasSession: !!session,
      hasPayload: !!payload,
      userId: payload?.userId,
      expiresAt: payload?.expiresAt,
    });
    return NextResponse.next();
  }

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

    // const Shop = await getShops();
    // if (Shop && Shop.length > 0) {
    //   if (Shop.some((shop) => shop.ownerId === session?.userId)) {
    //     console.log("Found shops:", Shop);
    //   }
    // } else {
    //   console.log("No shops found");
    //   if (isProtectedRoute) {
    //     return NextResponse.redirect(new URL("/shopReg", req.nextUrl));
    //   }
    // }

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
  //matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
