// Shared API utilities for frontend.
// Supports running the frontend from a different origin than the backend by using VITE_API_BASE_URL.
//
// Native-data-fetching principles:
// - prefer fetch
// - explicit error handling
// - timeouts via AbortController
// - optional retry for idempotent requests

export function apiBase() {
  const base = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
  if (!base) return "";
  return base.replace(/\/+$/, "");
}

export class ApiError extends Error {
  status: number;
  code?: string;
  payload?: any;
  constructor(message: string, status: number, code?: string, payload?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

function withTimeout(init: RequestInit | undefined, timeoutMs: number) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  const signal = init?.signal;

  // If the caller already passed a signal, we abort when either aborts.
  if (signal) {
    if (signal.aborted) controller.abort();
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  return {
    init: { ...(init || {}), signal: controller.signal },
    done: () => clearTimeout(t),
  };
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJsonWithRetry(url: string, init: RequestInit, retries: number) {
  let attempt = 0;
  // Only retry safe/idempotent requests by default
  const method = (init.method || "GET").toUpperCase();
  const canRetry = method === "GET" || method === "HEAD";

  while (true) {
    try {
      const { init: timedInit, done } = withTimeout(init, 15000);
      const res = await fetch(url, timedInit);
      done();

      const text = await res.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = null;
      }

      if (!res.ok) {
        const message = json?.error || json?.message || `Request failed (${res.status})`;
        throw new ApiError(message, res.status, json?.code, json);
      }

      return { ok: true as const, status: res.status, json, data: json };
    } catch (e: any) {
      const isAbort = e?.name === "AbortError";
      const isApiError = e instanceof ApiError;

      if (!canRetry || attempt >= retries) {
        const msg = isAbort ? "Request timed out" : isApiError ? e.message : "Network error";
        const status = isApiError ? e.status : 0;
        const payload = isApiError ? e.payload : undefined;
        return { ok: false as const, status, json: { success: false, error: msg }, data: payload };
      }

      // Exponential backoff
      await sleep(Math.pow(2, attempt) * 400);
      attempt += 1;
    }
  }
}

export async function apiJson<T>(
  path: string,
  init?: RequestInit
): Promise<{ ok: boolean; status: number; json: any; data?: T }> {
  const url = `${apiBase()}${path}`;
  const mergedInit: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  };

  const res = await fetchJsonWithRetry(url, mergedInit, 2);
  return { ok: res.ok, status: res.status, json: res.json, data: res.json as T };
}
