import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getLeads, updateLeadStatus, type LeadStatus } from "@/lib/db";
import { auth } from "@/lib/auth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, LogOut, Download } from "lucide-react";
import logoFullEn from "@/assets/branding/meteory-logo-full-en.png";
import logoFullAr from "@/assets/branding/meteory-logo-full-ar.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Admin() {
  const { language } = useLanguage();
  const logo = language === "ar" ? logoFullAr : logoFullEn;
  const [, setLocation] = useLocation();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeads = async () => {
    setLoading(true);
    const result = await getLeads();
    if (result.success) {
      setLeads(result.data || []);
      setError("");
    } else {
      setError(String((result as any).error || "Failed to fetch leads. Check database connection."));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }
    fetchLeads();
  }, [setLocation]);

  const handleLogout = () => {
    auth.logout();
  };

  const STATUS_OPTIONS: LeadStatus[] = ["New", "Contacted", "In Progress", "Archived"];

  const downloadCSV = () => {
    if (!leads.length) return;

    const headers = ["Date", "Name", "Email", "Phone", "App", "Facility Type", "Area (m2)", "Hazard Level", "Total Units", "Status"];
    const csvContent = [
      headers.join(","),
      ...leads.map(lead => [
        new Date(lead.created_at).toLocaleDateString(),
        `"${lead.name || ''}"`,
        `"${lead.email || ''}"`,
        `"${lead.phone || ''}"`,
        `"${lead.app_name || ''}"`,
        lead.facility_type,
        lead.area,
        lead.hazard_level,
        lead.total_units,
        `"${lead.status || 'New'}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `meteory_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const setStatus = async (id: string | number, status: LeadStatus) => {
    const prev = leads;
    setLeads(prev.map((l: any) => (l.id === id ? { ...l, status } : l)));
    const res = await updateLeadStatus(id, status);
    if (!res.success) {
      setLeads(prev);
      setError(String((res as any).error || "Failed to update status. Check database connection."));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Meteory" width={240} height={64} className="h-10 w-auto object-contain" />
            <div className="h-8 w-px bg-slate-200" />
            <h1 className="text-xl font-bold uppercase text-slate-900 tracking-wide">
              Lead Generation Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={downloadCSV} disabled={loading || leads.length === 0} variant="outline" size="sm" className="hidden sm:flex">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={fetchLeads} disabled={loading} variant="outline" size="sm">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Refresh
            </Button>
            <Button onClick={handleLogout} variant="destructive" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle>Recent Calculator Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <div className="text-red-500 mb-4 bg-red-50 p-3 rounded">{error}</div>}
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>App</TableHead>
                    <TableHead>Specs</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                        No leads found yet.
                      </TableCell>
                    </TableRow>
                  )}
                  {leads.map((lead: any) => (
                    <TableRow key={lead.id} className="hover:bg-slate-50">
                      <TableCell className="font-mono text-xs">{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col text-xs">
                          <span className="font-medium text-slate-900">{lead.email}</span>
                          <span className="text-muted-foreground">{lead.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-bold">
                          {lead.app_name || ""}
                        </span>
                      </TableCell>
                      <TableCell className="capitalize">
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
                          {lead.facility_type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          {lead.area} m² / <span className={`font-bold ${
                            lead.hazard_level === 'extra' ? 'text-red-600' :
                            lead.hazard_level === 'ordinary' ? 'text-amber-600' : 'text-green-600'
                          }`}>{lead.hazard_level} Hazard</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <select
                          className="h-9 rounded-md border border-slate-200 bg-white px-2 text-xs font-medium"
                          value={(lead.status || "New") as LeadStatus}
                          onChange={(e) => setStatus(lead.id, e.target.value as LeadStatus)}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell className="text-right font-bold text-lg">{lead.total_units}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
