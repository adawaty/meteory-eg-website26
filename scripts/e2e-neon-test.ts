/*
  End-to-end sanity test for serverless functions against Neon.
  Usage:
    DATABASE_URL='...' ADMIN_PASSWORD='...' pnpm tsx scripts/e2e-neon-test.ts
*/
import authHandler from "../api/auth";
import leadsHandler from "../api/leads";

type Headers = Record<string, string | undefined>;

function makeRes() {
  const state: any = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: null as any,
  };
  const res: any = {
    status(code: number) {
      state.statusCode = code;
      return res;
    },
    setHeader(k: string, v: any) {
      state.headers[k.toLowerCase()] = String(v);
    },
    json(obj: any) {
      state.body = obj;
      return res;
    },
  };
  return { res, state };
}

async function call(handler: any, req: any) {
  const { res, state } = makeRes();
  await handler(req, res);
  return state;
}

function assert(cond: any, msg: string) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

async function main() {
  assert(process.env.DATABASE_URL, "DATABASE_URL missing");
  assert(process.env.ADMIN_PASSWORD, "ADMIN_PASSWORD missing");

  // 1) Login
  const login = await call(authHandler, {
    method: "POST",
    headers: {} as Headers,
    body: { password: process.env.ADMIN_PASSWORD },
  });
  assert(login.statusCode === 200, `login status ${login.statusCode}`);
  assert(login.body?.success === true, "login success false");
  const setCookie = login.headers["set-cookie"];
  assert(setCookie?.includes("meteory_admin=1"), "admin cookie not set");

  // 2) Insert a lead
  const lead = {
    name: "Test User",
    email: "test@example.com",
    phone: "+20 100 000 0000",
    app_name: "E2E Test",
    facility_type: "Industrial",
    area: 1000,
    hazard_level: "High",
    total_units: 10,
    data: { note: "created by scripts/e2e-neon-test.ts" },
  };

  const created = await call(leadsHandler, {
    method: "POST",
    headers: {} as Headers,
    body: lead,
  });
  assert(created.statusCode === 200, `create lead status ${created.statusCode}`);
  assert(created.body?.success === true, "create lead failed");
  const leadId = created.body?.data?.id;
  assert(leadId, "lead id missing");

  // 3) List leads (admin)
  const list = await call(leadsHandler, {
    method: "GET",
    headers: { cookie: setCookie } as Headers,
  });
  assert(list.statusCode === 200, `list leads status ${list.statusCode}`);
  assert(list.body?.success === true, "list leads failed");
  assert(Array.isArray(list.body?.data), "list data not array");
  assert(list.body.data.some((x: any) => String(x.id) === String(leadId)), "created lead not found");

  // 4) Update status (admin)
  const patch = await call(leadsHandler, {
    method: "PATCH",
    headers: { cookie: setCookie } as Headers,
    body: { id: leadId, status: "Contacted" },
  });
  assert(patch.statusCode === 200, `patch status ${patch.statusCode}`);
  assert(patch.body?.success === true, "patch failed");
  assert(patch.body?.data?.status === "Contacted", "status not updated");

  console.log(JSON.stringify({ success: true, leadId }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
