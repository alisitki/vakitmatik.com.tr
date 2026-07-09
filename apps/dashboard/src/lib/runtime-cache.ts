import "server-only";

type CacheEntry<T> = {
  value?: T;
  cachedAt?: string;
  expiresAt?: number;
  promise?: Promise<T>;
};

export type RuntimeCacheResult<T> = {
  data: T;
  cachedAt: string;
  stale: boolean;
  error: string | null;
  ttlMs: number;
};

type RuntimeCacheStore = Map<string, CacheEntry<unknown>>;

const globalCache = globalThis as typeof globalThis & {
  __vakitmatikDashboardCache?: RuntimeCacheStore;
};

const cacheStore = globalCache.__vakitmatikDashboardCache ?? new Map<string, CacheEntry<unknown>>();
globalCache.__vakitmatikDashboardCache = cacheStore;

function publicMessage(error: unknown) {
  return error instanceof Error ? error.message : "Veri yenilenemedi.";
}

export async function getRuntimeCached<T>({
  key,
  ttlMs,
  refresh = false,
  load,
}: {
  key: string;
  ttlMs: number;
  refresh?: boolean;
  load: () => Promise<T>;
}): Promise<RuntimeCacheResult<T>> {
  const now = Date.now();
  const existing = cacheStore.get(key) as CacheEntry<T> | undefined;

  if (!refresh && existing?.value !== undefined && existing.expiresAt && existing.expiresAt > now) {
    return {
      data: existing.value,
      cachedAt: existing.cachedAt ?? new Date(now).toISOString(),
      stale: false,
      error: null,
      ttlMs,
    };
  }

  if (!refresh && existing?.promise) {
    const data = await existing.promise;

    return {
      data,
      cachedAt: (cacheStore.get(key) as CacheEntry<T> | undefined)?.cachedAt ?? new Date().toISOString(),
      stale: false,
      error: null,
      ttlMs,
    };
  }

  const promise = load();
  cacheStore.set(key, {
    ...existing,
    promise,
  });

  try {
    const data = await promise;
    const cachedAt = new Date().toISOString();

    cacheStore.set(key, {
      value: data,
      cachedAt,
      expiresAt: Date.now() + ttlMs,
    });

    return {
      data,
      cachedAt,
      stale: false,
      error: null,
      ttlMs,
    };
  } catch (error) {
    if (existing?.value !== undefined && existing.cachedAt) {
      cacheStore.set(key, existing);

      return {
        data: existing.value,
        cachedAt: existing.cachedAt,
        stale: true,
        error: publicMessage(error),
        ttlMs,
      };
    }

    cacheStore.delete(key);
    throw error;
  }
}
