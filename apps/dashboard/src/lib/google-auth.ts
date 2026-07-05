import "server-only";

type TokenConfig = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

let cachedToken:
  | {
      accessToken: string;
      expiresAt: number;
      cacheKey: string;
    }
  | null = null;

export async function getGoogleAccessToken(config: TokenConfig) {
  const cacheKey = `${config.clientId}:${config.refreshToken.slice(-8)}`;

  if (cachedToken && cachedToken.cacheKey === cacheKey && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.accessToken;
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const payload = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "Google OAuth token request failed");
  }

  cachedToken = {
    accessToken: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in ?? 3600) * 1000,
    cacheKey,
  };

  return payload.access_token;
}
