// Client-side authentication helper.
// Backend enforcement is done via HttpOnly cookie set by /api/auth.

import { apiJson } from "@/lib/api";

const AUTH_KEY = "meteory_admin_session";

export const auth = {
  login: async (password: string) => {
    const res = await apiJson("/api/auth", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    const json: any = res.json;
    if (res.ok && json?.success) {
      sessionStorage.setItem(AUTH_KEY, "true");
      return { success: true };
    }

    return { success: false, error: json?.error || `Login failed (${res.status})` };
  },

  logout: async () => {
    try {
      await apiJson("/api/auth", { method: "DELETE" });
    } catch {
      // ignore
    }
    sessionStorage.removeItem(AUTH_KEY);
    window.location.href = "/";
  },

  isAuthenticated: () => {
    return sessionStorage.getItem(AUTH_KEY) === "true";
  },
};
