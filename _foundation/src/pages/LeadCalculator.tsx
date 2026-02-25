import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Calculator, Check, Download, Droplets, Flame, Printer, Sprout, Wind } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import logoEn from "@/assets/branding/meteory-logo-full.png";
import { saveLead } from "@/lib/db";

type AppId = "extinguishers" | "fm200" | "sprinklers" | "hosereel" | "hydrant";

const APP_META: Record<AppId, { title: string; subtitle: string; icon: any }> = {
  extinguishers: {
    title: "Fire Extinguisher Estimator",
    subtitle: "Quick estimate based on area + hazard class",
    icon: Flame,
  },
  fm200: {
    title: "FM-200 Agent Quantity (Total Flooding)",
    subtitle: "Based on the FM-200 engineered equation (W=(V/S)*(C/(100-C)))",
    icon: Wind,
  },
  sprinklers: {
    title: "Sprinkler Layout (Head Count)",
    subtitle: "Calculates sprinklers from room dimensions + spacing",
    icon: Droplets,
  },
  hosereel: {
    title: "Fire Hose Reel Coverage",
    subtitle: "Estimate reels needed from hose length (coverage radius)",
    icon: Sprout,
  },
  hydrant: {
    title: "Fire Hydrant Coverage",
    subtitle: "Estimate hydrants needed from coverage radius",
    icon: Droplets,
  },
};

function safeNum(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export default function LeadCalculator() {
  const { language } = useLanguage();

  const [activeApp, setActiveApp] = useState<AppId>("extinguishers");
  const [saving, setSaving] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  // Shared contact data (one time entry, reused across apps)
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  // --- App 1: Extinguishers ---
  const [ext, setExt] = useState({
    facilityType: "",
    area: "",
    floors: "1",
    hazardLevel: "light", // light | ordinary | extra
  });

  const extResults = useMemo(() => {
    const area = safeNum(ext.area);
    const floors = Math.max(1, Math.round(safeNum(ext.floors) || 1));

    // Simplified planning heuristic
    // Light Hazard: 1 per 280m²
    // Ordinary Hazard: 1 per 140m²
    // Extra Hazard: 1 per 93m²
    let coveragePerUnit = 280;
    if (ext.hazardLevel === "ordinary") coveragePerUnit = 140;
    if (ext.hazardLevel === "extra") coveragePerUnit = 93;

    const perFloor = Math.max(1, Math.ceil(area / coveragePerUnit));
    const total = perFloor * floors;
    const type = ext.hazardLevel === "light" ? "CO2 + Powder" : "Powder + Foam";

    return { perFloor, total, type, coveragePerUnit };
  }, [ext.area, ext.floors, ext.hazardLevel]);

  // --- App 2: FM200 ---
  const [fm, setFm] = useState({
    length: "",
    width: "",
    height: "",
    tempC: "21",
    conc: "7.2",
    safetyFactor: "1.05",
  });

  const fmResults = useMemo(() => {
    const L = safeNum(fm.length);
    const W = safeNum(fm.width);
    const H = safeNum(fm.height);
    const t = safeNum(fm.tempC);
    const C = safeNum(fm.conc);
    const sf = Math.max(1, safeNum(fm.safetyFactor) || 1);

    const V = Math.max(0, L * W * H); // m3
    const S = 0.1269 + 0.0005131 * t; // m3/kg

    const baseKg = V  / S * (C / (100 - C));
    const finalKg = baseKg * sf;

    return { V, S, baseKg, finalKg, t, C, sf };
  }, [fm.length, fm.width, fm.height, fm.tempC, fm.conc, fm.safetyFactor]);

  // --- App 3: Sprinklers (layout-based) ---
  const [sp, setSp] = useState({
    length: "",
    width: "",
    hazard: "OH1" as "LH" | "OH1" | "OH2" | "EH1" | "EH2",
    spacingX: "3.6", // meters (along branch line)
    spacingY: "3.0", // meters (between branch lines)
  });

  const SP_PRESETS: Record<string, { spacingX: number; spacingY: number; maxArea: number; note: string }> = {
    LH: { spacingX: 4.6, spacingY: 4.6, maxArea: 21.0, note: "Light Hazard planning: up to ~21 m²/head (225 ft²)" },
    OH1: { spacingX: 3.6, spacingY: 3.0, maxArea: 12.0, note: "Ordinary Hazard Group 1 example: 12 m²/head (130 ft² max), 3.6m x 3.0m" },
    OH2: { spacingX: 3.6, spacingY: 3.0, maxArea: 12.0, note: "Ordinary Hazard Group 2 often uses similar max area; verify by project" },
    EH1: { spacingX: 3.0, spacingY: 3.0, maxArea: 9.3, note: "Extra Hazard planning: ~9.3 m²/head (100 ft²)" },
    EH2: { spacingX: 3.0, spacingY: 3.0, maxArea: 9.3, note: "Extra Hazard planning: ~9.3 m²/head (100 ft²)" },
  };

  const spResults = useMemo(() => {
    const L = safeNum(sp.length);
    const W = safeNum(sp.width);
    const preset = SP_PRESETS[sp.hazard] || SP_PRESETS.OH1;
    const sx = Math.max(0.5, safeNum(sp.spacingX) || preset.spacingX);
    const sy = Math.max(0.5, safeNum(sp.spacingY) || preset.spacingY);

    const area = Math.max(0, L * W);
    const countX = L > 0 ? Math.max(1, Math.ceil(L / sx)) : 0;
    const countY = W > 0 ? Math.max(1, Math.ceil(W / sy)) : 0;
    const headsByGrid = countX * countY;

    const coveragePerHead = sx * sy;
    const headsByAreaMax = preset.maxArea > 0 ? Math.max(1, Math.ceil(area / preset.maxArea)) : headsByGrid;

    // For safety, recommend the higher of the two checks.
    const recommendedHeads = Math.max(headsByGrid, headsByAreaMax);

    return {
      area,
      countX,
      countY,
      sx,
      sy,
      coveragePerHead,
      headsByGrid,
      headsByAreaMax,
      recommendedHeads,
      presetNote: preset.note,
    };
  }, [sp.length, sp.width, sp.hazard, sp.spacingX, sp.spacingY]);

  // --- App 4: Hose reel coverage ---
  const [hr, setHr] = useState({
    siteArea: "",
    hoseLength: "30", // meters
    utilization: "0.65", // overlap/obstructions factor
  });

  const hrResults = useMemo(() => {
    const A = safeNum(hr.siteArea);
    const r = Math.max(1, safeNum(hr.hoseLength) || 30);
    const util = Math.min(1, Math.max(0.2, safeNum(hr.utilization) || 0.65));
    const cover = Math.PI * r * r * util;
    const reels = A > 0 ? Math.max(1, Math.ceil(A / cover)) : 0;
    return { A, r, util, cover, reels };
  }, [hr.siteArea, hr.hoseLength, hr.utilization]);

  // --- App 5: Hydrant coverage (planning) ---
  const [hy, setHy] = useState({
    siteArea: "",
    radius: "50", // meters
    utilization: "0.55",
  });

  const hyResults = useMemo(() => {
    const A = safeNum(hy.siteArea);
    const r = Math.max(5, safeNum(hy.radius) || 50);
    const util = Math.min(1, Math.max(0.2, safeNum(hy.utilization) || 0.55));
    const cover = Math.PI * r * r * util;
    const hydrants = A > 0 ? Math.max(1, Math.ceil(A / cover)) : 0;
    return { A, r, util, cover, hydrants };
  }, [hy.siteArea, hy.radius, hy.utilization]);

  const canSave = () => {
    // Soft gate: require contact before revealing/saving
    if (!contact.name || !contact.email) {
      toast.error(language === "en" ? "Enter your details to receive the full report" : "أدخل بياناتك لاستلام التقرير الكامل");
      return false;
    }
    return true;
  };

  const isRevealed = (app: AppId) => !!revealed[app];

  const revealAndSave = async () => {
    if (!canSave()) return;
    await handleSave();
    setRevealed((p) => ({ ...p, [activeApp]: true }));
  };


  const handleSave = async () => {
    if (!canSave()) return;

    setSaving(true);
    try {
      if (activeApp === "extinguishers") {
        if (!ext.facilityType || !ext.area) {
          toast.error(language === "en" ? "Please fill facility details first" : "يرجى ملء تفاصيل المنشأة أولاً");
          return;
        }
        const res = await saveLead({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          app_name: "Extinguisher Estimator",
          facility_type: ext.facilityType,
          area: ext.area,
          hazard_level: ext.hazardLevel,
          total_units: extResults.total,
          data: { inputs: ext, results: extResults },
        });
        if (res.success) toast.success(language === "en" ? "Saved for sales team ✅" : "تم الحفظ لفريق المبيعات ✅");
        else toast.error(String((res as any).error || (language === "en" ? "Save failed" : "فشل الحفظ")));
      }

      if (activeApp === "fm200") {
        if (!fm.length || !fm.width || !fm.height) {
          toast.error(language === "en" ? "Please enter room dimensions" : "يرجى إدخال أبعاد الغرفة");
          return;
        }
        const res = await saveLead({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          app_name: "FM-200 Total Flooding",
          data: {
            inputs: fm,
            results: {
              volume_m3: fmResults.V,
              specific_vapour_volume_m3_per_kg: fmResults.S,
              base_agent_kg: fmResults.baseKg,
              agent_kg_with_safety_factor: fmResults.finalKg,
            },
          },
        });
        if (res.success) toast.success(language === "en" ? "Saved for sales team ✅" : "تم الحفظ لفريق المبيعات ✅");
        else toast.error(String((res as any).error || (language === "en" ? "Save failed" : "فشل الحفظ")));
      }

      if (activeApp === "sprinklers") {
        if (!sp.length || !sp.width) {
          toast.error(language === "en" ? "Please enter room length and width" : "يرجى إدخال الطول والعرض");
          return;
        }
        const res = await saveLead({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          app_name: "Sprinkler Layout",
          area: spResults.area,
          total_units: spResults.recommendedHeads,
          data: { inputs: sp, results: spResults },
        });
        if (res.success) toast.success(language === "en" ? "Saved for sales team ✅" : "تم الحفظ لفريق المبيعات ✅");
        else toast.error(String((res as any).error || (language === "en" ? "Save failed" : "فشل الحفظ")));
      }

      if (activeApp === "hosereel") {
        if (!hr.siteArea) {
          toast.error(language === "en" ? "Please enter site area" : "يرجى إدخال مساحة الموقع");
          return;
        }
        const res = await saveLead({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          app_name: "Hose Reel Coverage",
          area: hr.siteArea,
          total_units: hrResults.reels,
          data: { inputs: hr, results: hrResults },
        });
        if (res.success) toast.success(language === "en" ? "Saved for sales team ✅" : "تم الحفظ لفريق المبيعات ✅");
        else toast.error(String((res as any).error || (language === "en" ? "Save failed" : "فشل الحفظ")));
      }

      if (activeApp === "hydrant") {
        if (!hy.siteArea) {
          toast.error(language === "en" ? "Please enter site area" : "يرجى إدخال مساحة الموقع");
          return;
        }
        const res = await saveLead({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          app_name: "Hydrant Coverage",
          area: hy.siteArea,
          total_units: hyResults.hydrants,
          data: { inputs: hy, results: hyResults },
        });
        if (res.success) toast.success(language === "en" ? "Saved for sales team ✅" : "تم الحفظ لفريق المبيعات ✅");
        else toast.error(String((res as any).error || (language === "en" ? "Save failed" : "فشل الحفظ")));
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => window.print();

  const ActiveIcon = APP_META[activeApp].icon;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container px-4 text-center">
          <Calculator className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">
            {language === "en" ? "Safety Calculator Suite" : "مجموعة حاسبات السلامة"}
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            {language === "en"
              ? "Multiple firefighting estimation tools. Enter contact details once, and we’ll save each submission for the sales team to follow up."
              : "عدة أدوات تقدير للسلامة. أدخل بياناتك مرة واحدة وسيتم حفظ كل طلب لفريق المبيعات للمتابعة."}
          </p>
        </div>
      </div>

      <div className="container px-4 -mt-12 space-y-8">
        {/* App Selector */}
        <Card className="border-t-4 border-t-accent shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl uppercase tracking-wide">
              {language === "en" ? "Choose a Tool" : "اختر أداة"}
            </CardTitle>
            <CardDescription>
              {language === "en" ? "Start with what you need right now." : "ابدأ بما تحتاجه الآن."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {(Object.keys(APP_META) as AppId[]).map((id) => {
              const Ico = APP_META[id].icon;
              const active = id === activeApp;
              return (
                <button
                  key={id}
                  onClick={() => setActiveApp(id)}
                  className={`text-left rounded-lg border p-4 transition-all ${
                    active ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-md flex items-center justify-center ${active ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <Ico className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold uppercase tracking-wide">{APP_META[id].title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{APP_META[id].subtitle}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Shared Contact Capture */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl uppercase tracking-wide">{language === "en" ? "Contact Info" : "بيانات الاتصال"}</CardTitle>
            <CardDescription>
              {language === "en"
                ? "Required to save the results for the sales team."
                : "مطلوب لحفظ النتائج لفريق المبيعات."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{language === "en" ? "Full Name" : "الاسم الكامل"}</Label>
              <Input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="h-11" required />
            </div>
            <div className="space-y-2">
              <Label>{language === "en" ? "Email" : "البريد الإلكتروني"}</Label>
              <Input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="h-11" required />
            </div>
            <div className="space-y-2">
              <Label>{language === "en" ? "Phone" : "رقم الهاتف"}</Label>
              <Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="h-11" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-xs text-muted-foreground">
              {language === "en" ? "We store submissions to follow up with a quotation." : "نقوم بحفظ الطلبات للمتابعة وتقديم عرض سعر."}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <ActiveIcon className="h-4 w-4" /> {APP_META[activeApp].title}
            </div>
          </CardFooter>
        </Card>

        {/* Active Tool */}
        {activeApp === "extinguishers" && (
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-2xl uppercase">{APP_META.extinguishers.title}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Preliminary estimate. A site survey by a certified engineer is required for Civil Defense approval."
                  : "تقدير مبدئي. يلزم مسح ميداني بواسطة مهندس معتمد لموافقة الدفاع المدني."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{language === "en" ? "Facility Type" : "نوع المنشأة"}</Label>
                <Select onValueChange={(val) => setExt({ ...ext, facilityType: val })} value={ext.facilityType}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={language === "en" ? "Select Type" : "اختر النوع"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">{language === "en" ? "Office / School / Hotel" : "مكتب / مدرسة / فندق"}</SelectItem>
                    <SelectItem value="factory">{language === "en" ? "Factory / Workshop" : "مصنع / ورشة"}</SelectItem>
                    <SelectItem value="warehouse">{language === "en" ? "Warehouse / Storage" : "مخزن / مستودع"}</SelectItem>
                    <SelectItem value="kitchen">{language === "en" ? "Commercial Kitchen" : "مطبخ تجاري"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>{language === "en" ? "Total Area (m²)" : "المساحة الكلية (م²)"}</Label>
                  <Input type="number" placeholder="e.g. 500" className="h-12" value={ext.area} onChange={(e) => setExt({ ...ext, area: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{language === "en" ? "Number of Floors" : "عدد الطوابق"}</Label>
                  <Input type="number" placeholder="1" className="h-12" value={ext.floors} onChange={(e) => setExt({ ...ext, floors: e.target.value })} />
                </div>
              </div>

              <div className="space-y-3">
                <Label>{language === "en" ? "Hazard Level" : "مستوى الخطورة"}</Label>
                <RadioGroup
                  value={ext.hazardLevel}
                  onValueChange={(val) => setExt({ ...ext, hazardLevel: val })}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {[
                    { id: "light", labelEn: "Low", labelAr: "منخفض" },
                    { id: "ordinary", labelEn: "Medium", labelAr: "متوسط" },
                    { id: "extra", labelEn: "High", labelAr: "عالي" },
                  ].map((o) => (
                    <div key={o.id}>
                      <RadioGroupItem value={o.id} id={o.id} className="peer sr-only" />
                      <Label
                        htmlFor={o.id}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                      >
                        <Flame className="mb-3 h-6 w-6" />
                        {language === "en" ? o.labelEn : o.labelAr}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">{language === "en" ? "Total Extinguishers" : "إجمالي الطفايات"}</div>
                  <div className="text-4xl font-heading font-bold text-foreground">{isRevealed("extinguishers") ? extResults.total : "—"}</div>
                </div>
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">{language === "en" ? "Per Floor" : "لكل طابق"}</div>
                  <div className="text-4xl font-heading font-bold text-foreground">{isRevealed("extinguishers") ? extResults.perFloor : "—"}</div>
                </div>
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">{language === "en" ? "Recommended Type" : "النوع الموصى به"}</div>
                  <div className="text-xl font-heading font-bold text-foreground pt-2">{isRevealed("extinguishers") ? extResults.type : "—"}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-3">
              <Button onClick={revealAndSave} disabled={saving} className="w-full h-12 uppercase font-bold tracking-widest rounded-none">
                {saving ? (language === "en" ? "Saving..." : "جاري الحفظ...") : !isRevealed(activeApp) ? (language === "en" ? "Get Report (Email)" : "استلام التقرير (بريد)" ) : (language === "en" ? "Save Again" : "حفظ مرة أخرى") }
              </Button>
              <Button onClick={handlePrint} variant="outline" className="w-full h-12 uppercase font-bold tracking-widest rounded-none gap-2">
                <Printer className="h-4 w-4" /> {language === "en" ? "Print Report" : "طباعة التقرير"}
              </Button>
            </CardFooter>
          </Card>
        )}

        {activeApp === "fm200" && (
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-2xl uppercase">{APP_META.fm200.title}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Planning estimate only. Final design must follow NFPA 2001 / manufacturer software, including nozzle layout and room integrity."
                  : "تقدير مبدئي فقط. يجب أن يعتمد التصميم النهائي على NFPA 2001 وبرامج الشركة المصنعة."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Length (m)</Label>
                  <Input type="number" className="h-12" value={fm.length} onChange={(e) => setFm({ ...fm, length: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Width (m)</Label>
                  <Input type="number" className="h-12" value={fm.width} onChange={(e) => setFm({ ...fm, width: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Height (m)</Label>
                  <Input type="number" className="h-12" value={fm.height} onChange={(e) => setFm({ ...fm, height: e.target.value })} />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Design Temp (°C)</Label>
                  <Input type="number" className="h-12" value={fm.tempC} onChange={(e) => setFm({ ...fm, tempC: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Design Concentration (%)</Label>
                  <Input type="number" className="h-12" value={fm.conc} onChange={(e) => setFm({ ...fm, conc: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Safety Factor</Label>
                  <Input type="number" step="0.01" className="h-12" value={fm.safetyFactor} onChange={(e) => setFm({ ...fm, safetyFactor: e.target.value })} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">Room Volume</div>
                  <div className="text-3xl font-heading font-bold text-foreground">{fmResults.V.toFixed(2)} m³</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    S = 0.1269 + 0.0005131·t = {fmResults.S.toFixed(6)} m³/kg
                  </div>
                </div>
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">Estimated FM-200 Agent</div>
                  <div className="text-3xl font-heading font-bold text-foreground">{isRevealed("fm200") ? `${fmResults.finalKg.toFixed(1)} kg` : "—"}</div>
                  <div className="text-xs text-muted-foreground mt-2">{isRevealed("fm200") ? `Base: ${fmResults.baseKg.toFixed(1)} kg @ ${fmResults.C}%` : (language === "en" ? "Enter email to reveal." : "أدخل البريد لإظهار النتائج")}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-3">
              <Button onClick={revealAndSave} disabled={saving} className="w-full h-12 uppercase font-bold tracking-widest rounded-none">
                {saving ? (language === "en" ? "Saving..." : "جاري الحفظ...") : !isRevealed(activeApp) ? (language === "en" ? "Get Report (Email)" : "استلام التقرير (بريد)" ) : (language === "en" ? "Save Again" : "حفظ مرة أخرى") }
              </Button>
              <Button onClick={handlePrint} variant="outline" className="w-full h-12 uppercase font-bold tracking-widest rounded-none gap-2">
                <Printer className="h-4 w-4" /> {language === "en" ? "Print" : "طباعة"}
              </Button>
            </CardFooter>
          </Card>
        )}

        {activeApp === "sprinklers" && (
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-2xl uppercase">{APP_META.sprinklers.title}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Enter room dimensions and spacing. We compute head count as typed + validate against typical max area per head."
                  : "أدخل أبعاد الغرفة ومسافات التباعد. سنحسب العدد كما تم إدخاله مع التحقق من أقصى مساحة تقديرية لكل رشاش."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>{language === "en" ? "Length (m)" : "الطول (م)"}</Label>
                  <Input type="number" className="h-12" value={sp.length} onChange={(e) => setSp({ ...sp, length: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{language === "en" ? "Width (m)" : "العرض (م)"}</Label>
                  <Input type="number" className="h-12" value={sp.width} onChange={(e) => setSp({ ...sp, width: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{language === "en" ? "Hazard Class" : "تصنيف الخطورة"}</Label>
                  <Select
                    value={sp.hazard}
                    onValueChange={(val) => {
                      const preset = SP_PRESETS[val] || SP_PRESETS.OH1;
                      setSp({ ...sp, hazard: val as any, spacingX: String(preset.spacingX), spacingY: String(preset.spacingY) });
                    }}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LH">LH (Light Hazard)</SelectItem>
                      <SelectItem value="OH1">OH1</SelectItem>
                      <SelectItem value="OH2">OH2</SelectItem>
                      <SelectItem value="EH1">EH1</SelectItem>
                      <SelectItem value="EH2">EH2</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-muted-foreground">{spResults.presetNote}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>{language === "en" ? "Spacing X (m)" : "تباعد X (م)"}</Label>
                  <Input type="number" className="h-12" value={sp.spacingX} onChange={(e) => setSp({ ...sp, spacingX: e.target.value })} />
                  <div className="text-xs text-muted-foreground">{language === "en" ? "Along branch line" : "على خط الفرع"}</div>
                </div>
                <div className="space-y-2">
                  <Label>{language === "en" ? "Spacing Y (m)" : "تباعد Y (م)"}</Label>
                  <Input type="number" className="h-12" value={sp.spacingY} onChange={(e) => setSp({ ...sp, spacingY: e.target.value })} />
                  <div className="text-xs text-muted-foreground">{language === "en" ? "Between branch lines" : "بين خطوط الفروع"}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">{language === "en" ? "Grid Heads" : "عدد الرشاشات (شبكة)"}</div>
                  <div className="text-4xl font-heading font-bold text-foreground">{spResults.headsByGrid}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {spResults.countX} × {spResults.countY}
                  </div>
                </div>
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">{language === "en" ? "Area/Head Check" : "تحقق المساحة"}</div>
                  <div className="text-4xl font-heading font-bold text-foreground">{spResults.headsByAreaMax}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {spResults.area.toFixed(1)} m² / {spResults.coveragePerHead.toFixed(2)} m²
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">{language === "en" ? "Recommended" : "العدد الموصى به"}</div>
                  <div className="text-4xl font-heading font-bold text-primary">{isRevealed("sprinklers") ? spResults.recommendedHeads : "—"}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {language === "en" ? "Max(grid, max-area)" : "الأكبر بين الشبكة وتحقيق المساحة"}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-3">
              <Button onClick={revealAndSave} disabled={saving} className="w-full h-12 uppercase font-bold tracking-widest rounded-none">
                {saving ? (language === "en" ? "Saving..." : "جاري الحفظ...") : !isRevealed(activeApp) ? (language === "en" ? "Get Report (Email)" : "استلام التقرير (بريد)" ) : (language === "en" ? "Save Again" : "حفظ مرة أخرى") }
              </Button>
              <Button onClick={handlePrint} variant="outline" className="w-full h-12 uppercase font-bold tracking-widest rounded-none gap-2">
                <Printer className="h-4 w-4" /> {language === "en" ? "Print" : "طباعة"}
              </Button>
            </CardFooter>
          </Card>
        )}

        {activeApp === "hosereel" && (
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-2xl uppercase">{APP_META.hosereel.title}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Estimate number of hose reels from coverage radius (hose length) and site area."
                  : "تقدير عدد خراطيم الحريق بناءً على نصف قطر التغطية (طول الخرطوم) ومساحة الموقع."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>{language === "en" ? "Site Area (m²)" : "مساحة الموقع (م²)"}</Label>
                  <Input type="number" className="h-12" value={hr.siteArea} onChange={(e) => setHr({ ...hr, siteArea: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{language === "en" ? "Hose Length (m)" : "طول الخرطوم (م)"}</Label>
                  <Input type="number" className="h-12" value={hr.hoseLength} onChange={(e) => setHr({ ...hr, hoseLength: e.target.value })} />
                  <div className="text-xs text-muted-foreground">{language === "en" ? "Used as coverage radius" : "يُستخدم كنصف قطر التغطية"}</div>
                </div>
                <div className="space-y-2">
                  <Label>{language === "en" ? "Utilization Factor" : "معامل الاستفادة"}</Label>
                  <Input type="number" step="0.05" className="h-12" value={hr.utilization} onChange={(e) => setHr({ ...hr, utilization: e.target.value })} />
                  <div className="text-xs text-muted-foreground">{language === "en" ? "Accounts for overlap/obstructions (0.2–1.0)" : "يعوض التداخل/العوائق (0.2–1.0)"}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">{language === "en" ? "Coverage per Reel" : "تغطية كل خرطوم"}</div>
                  <div className="text-3xl font-heading font-bold text-foreground">{hrResults.cover.toFixed(0)} m²</div>
                  <div className="text-xs text-muted-foreground mt-1">πr² × utilization</div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">{language === "en" ? "Estimated Reels" : "عدد الخراطيم"}</div>
                  <div className="text-4xl font-heading font-bold text-primary">{isRevealed("hosereel") ? hrResults.reels : "—"}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-3">
              <Button onClick={revealAndSave} disabled={saving} className="w-full h-12 uppercase font-bold tracking-widest rounded-none">
                {saving ? (language === "en" ? "Saving..." : "جاري الحفظ...") : !isRevealed(activeApp) ? (language === "en" ? "Get Report (Email)" : "استلام التقرير (بريد)" ) : (language === "en" ? "Save Again" : "حفظ مرة أخرى") }
              </Button>
              <Button onClick={handlePrint} variant="outline" className="w-full h-12 uppercase font-bold tracking-widest rounded-none gap-2">
                <Printer className="h-4 w-4" /> {language === "en" ? "Print" : "طباعة"}
              </Button>
            </CardFooter>
          </Card>
        )}

        {activeApp === "hydrant" && (
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-2xl uppercase">{APP_META.hydrant.title}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Planning estimate: hydrants needed based on site area and assumed coverage radius."
                  : "تقدير مبدئي: عدد حنفيات الحريق بناءً على مساحة الموقع ونصف قطر التغطية."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>{language === "en" ? "Site Area (m²)" : "مساحة الموقع (م²)"}</Label>
                  <Input type="number" className="h-12" value={hy.siteArea} onChange={(e) => setHy({ ...hy, siteArea: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{language === "en" ? "Coverage Radius (m)" : "نصف قطر التغطية (م)"}</Label>
                  <Input type="number" className="h-12" value={hy.radius} onChange={(e) => setHy({ ...hy, radius: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{language === "en" ? "Utilization Factor" : "معامل الاستفادة"}</Label>
                  <Input type="number" step="0.05" className="h-12" value={hy.utilization} onChange={(e) => setHy({ ...hy, utilization: e.target.value })} />
                  <div className="text-xs text-muted-foreground">{language === "en" ? "Accounts for overlap/road access (0.2–1.0)" : "يعوض التداخل/إمكانية الوصول (0.2–1.0)"}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">{language === "en" ? "Coverage per Hydrant" : "تغطية كل حنفية"}</div>
                  <div className="text-3xl font-heading font-bold text-foreground">{hyResults.cover.toFixed(0)} m²</div>
                  <div className="text-xs text-muted-foreground mt-1">πr² × utilization</div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-sm uppercase font-bold text-muted-foreground mb-1">{language === "en" ? "Estimated Hydrants" : "عدد الحنفيات"}</div>
                  <div className="text-4xl font-heading font-bold text-primary">{isRevealed("hydrant") ? hyResults.hydrants : "—"}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-3">
              <Button onClick={revealAndSave} disabled={saving} className="w-full h-12 uppercase font-bold tracking-widest rounded-none">
                {saving ? (language === "en" ? "Saving..." : "جاري الحفظ...") : !isRevealed(activeApp) ? (language === "en" ? "Get Report (Email)" : "استلام التقرير (بريد)" ) : (language === "en" ? "Save Again" : "حفظ مرة أخرى") }
              </Button>
              <Button onClick={handlePrint} variant="outline" className="w-full h-12 uppercase font-bold tracking-widest rounded-none gap-2">
                <Printer className="h-4 w-4" /> {language === "en" ? "Print" : "طباعة"}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Printable header for all apps */}
        <div className="hidden print:block print:fixed print:inset-0 print:bg-white print:z-[9999] print:p-[15mm] text-black">
          <div className="max-w-[210mm] mx-auto h-full flex flex-col">
            <header className="flex justify-between items-center border-b-4 border-primary pb-6 mb-8">
              <img src={logoEn} alt="Meteory" className="h-16 object-contain" />
              <div className="text-right rtl:text-left">
                <h1 className="text-2xl font-bold uppercase tracking-widest text-primary">Meteory Estimate Report</h1>
                <p className="text-sm text-gray-500 mt-1">Generated from Safety Calculator Suite</p>
              </div>
            </header>

            <div className="grid grid-cols-2 gap-8 mb-8 border-b border-gray-200 pb-8">
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Prepared For</h3>
                <p className="text-xl font-bold">{contact.name}</p>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
              <div className="text-right rtl:text-left">
                <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Date</h3>
                <p className="text-lg">{new Date().toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                <p className="text-xs text-gray-400 mt-1">Tool: {APP_META[activeApp].title}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold uppercase text-primary border-b border-gray-200 pb-2 mb-4">Results</h3>
              {activeApp === "extinguishers" && (
                <div className="space-y-2">
                  <p><strong>Total:</strong> {extResults.total} units</p>
                  <p><strong>Per floor:</strong> {extResults.perFloor}</p>
                  <p><strong>Recommended:</strong> {extResults.type}</p>
                </div>
              )}
              {activeApp === "fm200" && (
                <div className="space-y-2">
                  <p><strong>Room volume:</strong> {fmResults.V.toFixed(2)} m³</p>
                  <p><strong>Estimated agent:</strong> {fmResults.finalKg.toFixed(1)} kg</p>
                  <p className="text-xs text-gray-500">W=(V/S)*(C/(100-C)), S=0.1269+0.0005131·t</p>
                </div>
              )}
              {activeApp === "sprinklers" && (
                <div className="space-y-2">
                  <p><strong>Recommended heads:</strong> {spResults.recommendedHeads}</p>
                  <p><strong>Grid:</strong> {spResults.countX} × {spResults.countY} = {spResults.headsByGrid}</p>
                  <p><strong>Room:</strong> {sp.length}m × {sp.width}m = {spResults.area.toFixed(1)} m²</p>
                  <p><strong>Spacing:</strong> {spResults.sx.toFixed(2)}m × {spResults.sy.toFixed(2)}m</p>
                </div>
              )}
              {activeApp === "hosereel" && (
                <div className="space-y-2">
                  <p><strong>Estimated reels:</strong> {hrResults.reels}</p>
                  <p><strong>Site area:</strong> {hr.siteArea} m²</p>
                  <p><strong>Coverage per reel:</strong> {hrResults.cover.toFixed(0)} m²</p>
                </div>
              )}
              {activeApp === "hydrant" && (
                <div className="space-y-2">
                  <p><strong>Estimated hydrants:</strong> {hyResults.hydrants}</p>
                  <p><strong>Site area:</strong> {hy.siteArea} m²</p>
                  <p><strong>Coverage per hydrant:</strong> {hyResults.cover.toFixed(0)} m²</p>
                </div>
              )}
            </div>

            <div className="mt-auto pt-8 border-t border-gray-200">
              <div className="bg-amber-50 p-4 border-l-4 border-amber-500 text-xs text-amber-900 mb-6">
                <strong>Disclaimer:</strong> This report provides a preliminary estimate only. Final design must be verified by certified engineers and follow applicable standards (Egyptian Civil Defense, NFPA, manufacturer instructions).
              </div>

              <div className="flex justify-between items-end text-xs text-gray-500">
                <div>
                  <p className="font-bold text-gray-900">Meteory Fire Safety Solutions</p>
                  <p>81 Joseph Tito St, El Nozha, Cairo</p>
                  <p>info@meteory-eg.com</p>
                </div>
                <div className="text-right rtl:text-left">
                  <p>Generated via Meteory Online Tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
