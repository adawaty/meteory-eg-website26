import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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

function requireAdmin(req: VercelRequest) {
  const cookies = parseCookies(req.headers.cookie);
  return cookies.meteory_admin === "1";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ success: false, error: "DATABASE_URL missing" });
    }

    if (req.method === "GET") {
      if (!requireAdmin(req)) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
      }
      const result = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
      return res.status(200).json({ success: true, data: result.rows });
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const {
        name,
        email,
        phone,
        app_name,
        facility_type,
        area,
        hazard_level,
        total_units,
        data,
      } = body || {};

      if (!name || !email) {
        return res.status(400).json({ success: false, error: "name and email required" });
      }

      const query = `
        INSERT INTO leads (name, email, phone, app_name, facility_type, area, hazard_level, total_units, data)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id, created_at;
      `;

      const values = [
        String(name),
        String(email),
        phone ? String(phone) : null,
        app_name ? String(app_name) : null,
        facility_type ? String(facility_type) : null,
        typeof area === "number" || typeof area === "string" ? Number(area) : null,
        hazard_level ? String(hazard_level) : null,
        typeof total_units === "number" ? total_units : total_units ? Number(total_units) : null,
        data ? data : null,
      ];

      const result = await pool.query(query, values);
      return res.status(200).json({ success: true, data: result.rows[0] });
    }

    if (req.method === "PATCH") {
      if (!requireAdmin(req)) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
      }
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const { id, status } = body || {};

      if (!id || !status) {
        return res.status(400).json({ success: false, error: "id and status required" });
      }

      const result = await pool.query(
        "UPDATE leads SET status = $1 WHERE id = $2 RETURNING id, status",
        [String(status), Number(id)]
      );

      return res.status(200).json({ success: true, data: result.rows[0] });
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, error: e?.message || "Server error" });
  }
}
