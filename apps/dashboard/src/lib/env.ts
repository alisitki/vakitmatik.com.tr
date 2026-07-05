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
    return error.message;
  }

  return "Unexpected server error";
}
