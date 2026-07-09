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
  const contentType = request.headers.get("content-type") ?? "";
  const htmlFormRequest = !contentType.includes("application/json");

  try {
    const body = contentType.includes("application/json")
      ? ((await request.json()) as {
          username?: string;
          password?: string;
        })
      : Object.fromEntries(await request.formData());
    username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const key = loginKey(request, username || "empty");
    const limit = checkLoginRateLimit(key);

    if (!limit.allowed) {
      if (htmlFormRequest) {
        return NextResponse.redirect(new URL("/login?error=rate-limit", request.url), 303);
      }

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

      if (htmlFormRequest) {
        return NextResponse.redirect(new URL("/login?error=invalid", request.url), 303);
      }

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
    const response = htmlFormRequest
      ? NextResponse.redirect(new URL("/dashboard", request.url), 303)
      : NextResponse.json({
          ok: true,
          next: "/dashboard",
        });
    setSessionCookie(response, passwordUsername);

    return response;
  } catch (error) {
    if (htmlFormRequest) {
      return NextResponse.redirect(new URL("/login?error=config", request.url), 303);
    }

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
