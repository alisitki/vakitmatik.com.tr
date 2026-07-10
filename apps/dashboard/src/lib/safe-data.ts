import "server-only";

import { publicError } from "./env";
import type { DataState } from "./types";

export async function toDataState<T>(loader: () => Promise<T>): Promise<DataState<T>> {
  try {
    return {
      ok: true,
      data: await loader(),
    };
  } catch (error) {
    if (!(error instanceof Error && error.message.includes("is not configured"))) {
      console.error("[dashboard:data]", error);
    }

    return {
      ok: false,
      error: publicError(error),
    };
  }
}
