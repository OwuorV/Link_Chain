import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET is not defined in environment variables");
}
const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload {
  userId: string;
  expiresAt: string;
}

export async function encrypt(payload: { userId: string; expiresAt: Date }) {
  const serializablePayload = {
    userId: payload.userId,
    expiresAt: payload.expiresAt.toISOString(),
  };
  try {
    const jwt = await new SignJWT(serializablePayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);
    console.log("JWT created for user:", payload.userId);
    return jwt;
  } catch (error) {
    console.error("Encryption error:", error);
    throw error;
  }
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    console.log("No session cookie provided");
    return null;
  }
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    if (!payload.userId || !payload.expiresAt) {
      console.error("Invalid session payload:", payload);
      return null;
    }
    const result = {
      userId: payload.userId as string,
      expiresAt: payload.expiresAt as string,
    } as SessionPayload;
    console.log("Session decrypted for user:", result.userId);
    return result;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  try {
    const session = await encrypt({ userId, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      //  domain: process.env.NODE_ENV === "production" ? ".vercel.app" : undefined,
    });
    console.log("Session cookie set for user:", userId);
    return session;
  } catch (error) {
    console.error("Session creation error:", error);
    throw error;
  }
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    console.log("No valid session to update");
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    domain: "linkinngchain.vercel.app",
  });
  console.log("Session updated for user:", payload.userId);
  return payload;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  console.log("Session cookie deleted");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const payload = await decrypt(session);
  if (!payload) {
    console.log("No valid session payload");
    return null;
  }
  const expiresAt = new Date(payload.expiresAt);
  if (expiresAt < new Date()) {
    console.log("Session expired:", payload.expiresAt);
    await deleteSession();
    return null;
  }
  console.log("Valid session retrieved for user:", payload.userId);
  return payload;
}
