import "server-only";
import { cache } from "react";
import { getSession, deleteSession } from "@/lib/session";
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
    await deleteSession();
    redirect("/seller/login");
  }

  // Verify user exists in database
  try {
    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: { id: true },
    });

    if (!user) {
      console.log(
        "verifySession: User not found in database, clearing session"
      );
      await deleteSession();
      redirect("/seller/login");
    }

    console.log("verifySession: Valid session for user:", session.userId);
    return { isAuth: true, userId: session.userId };
  } catch (error) {
    console.error("verifySession: Database error:", error);
    await deleteSession();
    redirect("/seller/login");
  }
});

export const getUser = cache(async () => {
  try {
    const session = await verifySession();
    if (!session) {
      console.log("getUser: No valid session");
      return null;
    }

    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        Shop: {
          select: {
            id: true,
            storeName: true,
          },
        },
      },
    });

    if (!user) {
      console.error("getUser: User not found for ID:", session.userId);
      await deleteSession();
      return null;
    }

    console.log("getUser: User retrieved:", user.email);
    return user;
  } catch (error) {
    console.error("getUser: Failed to fetch user:", error);
    await deleteSession();
    return null;
  }
});
