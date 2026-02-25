// Client-side authentication helper.
// Backend enforcement is done via HttpOnly cookie set by /api/auth.

const AUTH_KEY = "meteory_admin_session";

export const auth = {
  login: async (password: string) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    const json = await res.json().catch(() => ({ success: false, error: "Non-JSON response" }));
    if (res.ok && json?.success) {
      sessionStorage.setItem(AUTH_KEY, "true");
      return { success: true };
    }
    return { success: false, error: json?.error || `Login failed (${res.status})` };
  },

  logout: async () => {
    try {
      await fetch("/api/auth", { method: "DELETE", credentials: "include" });
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
