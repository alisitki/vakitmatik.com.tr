import { NextRequest, NextResponse } from "next/server";
import { getRequiredEnv, publicError } from "@/lib/env";
import { clearLoginRateLimit, checkLoginRateLimit, recordFailedLogin } from "@/lib/rate-limit";
import { getClientIp, setSessionCookie, verifyDashboardPassword } from "@/lib/auth";

function loginKey(request: NextRequest, username: string) {
  return `${getClientIp(request)}:${username.toLocaleLowerCase("tr-TR")}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
  let username = "";

  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };
    username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const key = loginKey(request, username || "empty");
    const limit = checkLoginRateLimit(key);

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: "Çok fazla hatalı giriş denemesi. Biraz sonra tekrar deneyin.",
          retryAfterSeconds: limit.retryAfterSeconds,
        },
        {
          status: 429,
        },
      );
    }

    const expectedUsername = getRequiredEnv("DASHBOARD_USERNAME");
    const passwordUsername = username === expectedUsername ? verifyDashboardPassword(password) : null;

    if (!passwordUsername) {
      recordFailedLogin(key);
      await sleep(350);

      return NextResponse.json(
        {
          error: "Kullanıcı adı veya şifre hatalı.",
        },
        {
          status: 401,
        },
      );
    }

    clearLoginRateLimit(key);
    const response = NextResponse.json({
      ok: true,
      next: "/dashboard",
    });
    setSessionCookie(response, passwordUsername);

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: publicError(error),
      },
      {
        status: 500,
      },
    );
  }
}
