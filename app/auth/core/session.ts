import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

const userRoles = ["USER", "ADMIN"] as const

// Seven days in seconds
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_SESSION_KEY = "session-id";

const sessionSchema = z.object({
  id: z.number(),
  role: z.enum(userRoles),
});

type UserSession = z.infer<typeof sessionSchema>;

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

// Fetch user session based on session ID stored in cookies
export async function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  return getUserSessionById(sessionId);
}

// Update user session data in the database
export async function updateUserSessionData(
  user: UserSession,
  cookies: Pick<Cookies, "get">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  // Update session in the database
  await prisma.session.update({
    where: { id: sessionId },
    data: {
      role: user.role,
      userId: user.id,
      expiresAt: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
    },
  });
}

// Create a new user session and store it in the database
export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();

  // Store session in the database
  await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      role: user.role,
      expiresAt: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
    },
  });

  setCookie(sessionId, cookies);
}

// Update session expiration in the database
export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  const user = await getUserSessionById(sessionId);
  if (user == null) return;

  // Update session expiration in the database
  await prisma.session.update({
    where: { id: sessionId },
    data: {
      expiresAt: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
    },
  });

  setCookie(sessionId, cookies);
}

// Remove user session from the database
export async function removeUserFromSession(
  cookies: Pick<Cookies, "get" | "delete">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  // Delete session from the database
  await prisma.session.delete({
    where: { id: sessionId },
  });

  cookies.delete(COOKIE_SESSION_KEY);
}

// Helper function to set session cookie
function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

// Fetch user session from the database by session ID
async function getUserSessionById(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  return session;
}
