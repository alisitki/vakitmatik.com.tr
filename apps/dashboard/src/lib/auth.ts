import "server-only";

import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getRequiredEnv } from "./env";

const SESSION_COOKIE = "vakitmatik_dashboard_session";
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

type SessionPayload = {
  u: string;
  exp: number;
};

function sign(value: string) {
  return createHmac("sha256", getRequiredEnv("DASHBOARD_SESSION_SECRET"))
    .update(value)
    .digest("base64url");
}

function encodeSession(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${body}.${sign(body)}`;
}

function decodeSession(value: string | undefined) {
  if (!value) {
    return null;
  }

  const [body, signature] = value.split(".");

  if (!body || !signature) {
    return null;
  }

  const expected = sign(body);
  const given = Buffer.from(signature);
  const wanted = Buffer.from(expected);

  if (given.length !== wanted.length || !timingSafeEqual(given, wanted)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;

    if (!payload.u || !payload.exp || payload.exp <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function parsePasswordHash(value: string) {
  const [scheme, n, r, p, salt, hash] = value.split(":");

  if (scheme !== "scrypt" || !n || !r || !p || !salt || !hash) {
    throw new Error("DASHBOARD_PASSWORD_HASH must use scrypt:N:r:p:salt:hash format");
  }

  return {
    N: Number(n),
    r: Number(r),
    p: Number(p),
    salt: Buffer.from(salt, "base64url"),
    hash: Buffer.from(hash, "base64url"),
  };
}

export function verifyDashboardPassword(password: string) {
  const expectedUsername = getRequiredEnv("DASHBOARD_USERNAME");
  const stored = parsePasswordHash(getRequiredEnv("DASHBOARD_PASSWORD_HASH"));
  const computed = scryptSync(password, stored.salt, stored.hash.length, {
    N: stored.N,
    r: stored.r,
    p: stored.p,
  });

  if (computed.length !== stored.hash.length) {
    return null;
  }

  if (!timingSafeEqual(computed, stored.hash)) {
    return null;
  }

  return expectedUsername;
}

export async function getPageSession() {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requirePageSession() {
  const session = await getPageSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export function getRequestSession(request: NextRequest) {
  return decodeSession(request.cookies.get(SESSION_COOKIE)?.value);
}

export function setSessionCookie(response: NextResponse, username: string) {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  response.cookies.set({
    name: SESSION_COOKIE,
    value: encodeSession({
      u: username,
      exp: expiresAt,
    }),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
