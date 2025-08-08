import "server-only";
import { cache } from "react";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const session = await getSession();

  if (!session?.userId) {
    console.log("verifySession: No userId in session, redirecting to /login");
    redirect("/seller/login");
  }

  const expiresAt = new Date(session.expiresAt);
  if (expiresAt < new Date()) {
    console.log("verifySession: Session expired, redirecting to /login");
    redirect("/seller/login");
  }

  console.log("verifySession: Valid session for user:", session.userId);
  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) {
    console.log("getUser: No valid session");
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      console.error("getUser: User not found for ID:", session.userId);
    } else {
      console.log("getUser: User retrieved:", user.email);
    }
    return user;
  } catch (error) {
    console.error("getUser: Failed to fetch user:", error);
    return null;
  }
});
