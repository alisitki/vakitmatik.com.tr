import "server-only";

export function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

export function getOptionalEnv(name: string) {
  return process.env[name] || null;
}

export function getEnvList(name: string) {
  return getRequiredEnv(name)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function publicError(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("is not configured")) {
      return "Bu veri kaynağı henüz yapılandırılmamış.";
    }

    if (process.env.NODE_ENV === "production") {
      return "Veri kaynağına şu anda bağlanılamıyor.";
    }

    return error.message;
  }

  return "Beklenmeyen bir sunucu hatası oluştu.";
}
