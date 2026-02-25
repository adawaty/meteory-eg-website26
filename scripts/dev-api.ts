/*
  Local dev server for Vercel-style functions.

  Starts an HTTP server that mounts:
    - /api/auth  -> api/auth.ts
    - /api/leads -> api/leads.ts

  Usage:
    DATABASE_URL='...' ADMIN_PASSWORD='...' pnpm tsx scripts/dev-api.ts
*/
import http from "node:http";
import { parse as parseUrl } from "node:url";
import authHandler from "../api/auth";
import leadsHandler from "../api/leads";

async function readJson(req: http.IncomingMessage) {
  return new Promise<any>((resolve) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      if (!data) return resolve(undefined);
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve(undefined);
      }
    });
  });
}

function makeVercelRes(res: http.ServerResponse) {
  const vres: any = {
    status(code: number) {
      res.statusCode = code;
      return vres;
    },
    setHeader(k: string, v: any) {
      res.setHeader(k, v);
    },
    json(obj: any) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(obj));
      return vres;
    },
  };
  return vres;
}

const server = http.createServer(async (req, res) => {
  const url = parseUrl(req.url || "").pathname || "/";

  // CORS for local dev convenience
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Cookie");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const body = await readJson(req);

  const vreq: any = {
    method: req.method,
    headers: req.headers,
    body,
  };

  const vres = makeVercelRes(res);

  if (url === "/api/auth") return authHandler(vreq, vres);
  if (url === "/api/leads") return leadsHandler(vreq, vres);

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ success: false, error: "Not found" }));
});

const port = Number(process.env.PORT || 8787);
server.listen(port, () => {
  console.log(`Dev API server listening on http://localhost:${port}`);
});
