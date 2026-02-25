// Client-side helpers call the serverless API (/api/*).

import { apiJson } from "@/lib/api";

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

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await apiJson<T>(path, init);
  const json: any = res.json;

  // Normalize network / config errors
  if (!res.ok && (json?.success === undefined || json?.success === true)) {
    return { success: false, error: json?.error || `Request failed (${res.status})` } as any;
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
