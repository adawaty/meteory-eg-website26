import type { VercelRequest, VercelResponse } from "@vercel/node";

function parseCookies(cookieHeader: string | undefined) {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(";").forEach((part) => {
    const [k, ...rest] = part.trim().split("=");
    if (!k) return;
    cookies[k] = decodeURIComponent(rest.join("=") || "");
  });
  return cookies;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ success: false, error: "ADMIN_PASSWORD missing" });
  }

  if (req.method === "GET") {
    const cookies = parseCookies(req.headers.cookie);
    return res.status(200).json({ success: true, authenticated: cookies.meteory_admin === "1" });
  }

  if (req.method === "POST") {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const password = String(body?.password || "");

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, error: "Invalid password" });
    }

    // HttpOnly cookie so it can't be read by JS.
    // SameSite=Lax works for same-site navigation.
    res.setHeader(
      "Set-Cookie",
      `meteory_admin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 8}`
    );
    return res.status(200).json({ success: true });
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", "meteory_admin=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
