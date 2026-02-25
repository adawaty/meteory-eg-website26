// Client-side helpers call the serverless API (/api/leads).

export type LeadStatus = "New" | "Contacted" | "In Progress" | "Archived";

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  app_name?: string;
  facility_type?: string;
  area?: string | number;
  hazard_level?: string;
  total_units?: number;
  data?: any;
}

function apiBase() {
  const base = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
  if (!base) return "";
  return base.replace(/\/+$/, "");
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${apiBase()}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...init,
  });

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    json = { success: false, error: `Non-JSON response (${res.status})` };
  }

  // Normalize network / config errors
  if (!res.ok && (json?.success === undefined || json?.success === true)) {
    json = { success: false, error: json?.error || `Request failed (${res.status})` };
  }

  return json as T;
}

export async function saveLead(data: LeadData) {
  return api<{ success: boolean; data?: any; error?: any }>("/api/leads", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getLeads() {
  return api<{ success: boolean; data?: any[]; error?: any }>("/api/leads", {
    method: "GET",
  });
}

export async function updateLeadStatus(id: string | number, status: LeadStatus) {
  return api<{ success: boolean; data?: any; error?: any }>("/api/leads", {
    method: "PATCH",
    body: JSON.stringify({ id, status }),
  });
}
