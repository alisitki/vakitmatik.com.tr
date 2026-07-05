import "server-only";

type LoginAttempt = {
  count: number;
  resetAt: number;
  blockedUntil: number;
};

const attempts = new Map<string, LoginAttempt>();

const WINDOW_MS = 10 * 60 * 1000;
const BLOCK_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function getAttempt(key: string, now: number) {
  const attempt = attempts.get(key);

  if (!attempt || attempt.resetAt <= now) {
    return {
      count: 0,
      resetAt: now + WINDOW_MS,
      blockedUntil: 0,
    } satisfies LoginAttempt;
  }

  return attempt;
}

export function checkLoginRateLimit(key: string) {
  const now = Date.now();
  const attempt = getAttempt(key, now);

  if (attempt.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((attempt.blockedUntil - now) / 1000),
    };
  }

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

export function recordFailedLogin(key: string) {
  const now = Date.now();
  const attempt = getAttempt(key, now);
  const next = {
    ...attempt,
    count: attempt.count + 1,
  };

  if (next.count >= MAX_ATTEMPTS) {
    next.blockedUntil = now + BLOCK_MS;
  }

  attempts.set(key, next);
}

export function clearLoginRateLimit(key: string) {
  attempts.delete(key);
}
