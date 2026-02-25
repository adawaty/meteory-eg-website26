import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Building2, CheckCircle2, ChevronLeft, ChevronRight, Factory, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { saveLead } from "@/lib/db";

export default function Quote() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    industry: "",
    facilitySize: "", // m2
    facilityType: "",
    productInterest: "",
    urgency: "",
    city: "",
    name: "",
    email: "",
    phone: "",
  });

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    if (!form.name || !form.email) {
      toast.error(language === "en" ? "Name and email are required" : "الاسم والبريد الإلكتروني مطلوبان");
      return;
    }

    setSaving(true);
    const res = await saveLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      app_name: "Get Quote",
      facility_type: form.facilityType,
      area: form.facilitySize,
      data: {
        industry: form.industry,
        product_interest: form.productInterest,
        urgency: form.urgency,
        city: form.city,
      },
    });
    setSaving(false);

    if (res.success) {
      toast.success(language === "en" ? "Quote request submitted ✅" : "تم إرسال طلب عرض السعر ✅");
      setStep(4);
    } else {
      toast.error(String((res as any).error || (language === "en" ? "Submission failed" : "فشل الإرسال")));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="shadow-2xl border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-3xl uppercase tracking-wide">
              {language === "en" ? "Get a Quote" : "طلب عرض سعر"}
            </CardTitle>
            <CardDescription>
              {language === "en"
                ? "A short guided form so our sales engineers can reply with an accurate quotation."
                : "نموذج سريع لمساعدة فريق المبيعات والمهندسين على تقديم عرض سعر دقيق."}
            </CardDescription>
          </CardHeader>

          {step <= 3 && (
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                {language === "en" ? `Step ${step} of 3` : `الخطوة ${step} من 3`}
              </div>

              {step === 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{language === "en" ? "Industry" : "مجال العمل"}</Label>
                    <Select value={form.industry} onValueChange={(v) => setForm({ ...form, industry: v })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={language === "en" ? "Select industry" : "اختر المجال"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">Manufacturing / Factory</SelectItem>
                        <SelectItem value="hospitality">Hotel / Hospitality</SelectItem>
                        <SelectItem value="education">School / University</SelectItem>
                        <SelectItem value="healthcare">Hospital / Healthcare</SelectItem>
                        <SelectItem value="warehouse">Warehouse / Storage</SelectItem>
                        <SelectItem value="construction">Construction Site</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{language === "en" ? "Facility Type" : "نوع المنشأة"}</Label>
                    <Select value={form.facilityType} onValueChange={(v) => setForm({ ...form, facilityType: v })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={language === "en" ? "Select type" : "اختر النوع"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Office / Admin Building</SelectItem>
                        <SelectItem value="factory">Factory / Workshop</SelectItem>
                        <SelectItem value="warehouse">Warehouse</SelectItem>
                        <SelectItem value="kitchen">Commercial Kitchen</SelectItem>
                        <SelectItem value="data-center">Server Room / Data Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{language === "en" ? "Facility Size (m²)" : "مساحة المنشأة (م²)"}</Label>
                    <Input className="h-12" type="number" value={form.facilitySize} onChange={(e) => setForm({ ...form, facilitySize: e.target.value })} />
                  </div>

                  <div className="space-y-2">
                    <Label>{language === "en" ? "City" : "المدينة"}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground rtl:right-3 rtl:left-auto" />
                      <Input className="h-12 pl-10 rtl:pr-10 rtl:pl-3" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{language === "en" ? "Product Interest" : "المنتجات المطلوبة"}</Label>
                    <Select value={form.productInterest} onValueChange={(v) => setForm({ ...form, productInterest: v })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={language === "en" ? "Select" : "اختر"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="co2">CO2 Extinguishers</SelectItem>
                        <SelectItem value="dry-powder">Dry Powder Extinguishers</SelectItem>
                        <SelectItem value="foam">Foam Extinguishers</SelectItem>
                        <SelectItem value="fm200">FM-200 / Clean Agent</SelectItem>
                        <SelectItem value="sprinklers">Sprinkler System</SelectItem>
                        <SelectItem value="hosereel">Hose Reel</SelectItem>
                        <SelectItem value="hydrant">Hydrant System</SelectItem>
                        <SelectItem value="mixed">Mixed / Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{language === "en" ? "Urgency" : "درجة الاستعجال"}</Label>
                    <Select value={form.urgency} onValueChange={(v) => setForm({ ...form, urgency: v })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={language === "en" ? "Select" : "اختر"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (0-7 days)</SelectItem>
                        <SelectItem value="soon">Soon (1-4 weeks)</SelectItem>
                        <SelectItem value="planning">Planning (1-3 months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg border bg-white p-4 flex items-start gap-3 md:col-span-2">
                    <Factory className="h-5 w-5 text-primary mt-0.5" />
                    <div className="text-sm">
                      <div className="font-bold">{language === "en" ? "Tip" : "نصيحة"}</div>
                      <div className="text-muted-foreground">
                        {language === "en"
                          ? "If you have drawings or Civil Defense requirements, send them via email after submitting."
                          : "إذا كان لديك رسومات أو متطلبات الدفاع المدني، أرسلها عبر البريد بعد الإرسال."}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{language === "en" ? "Full Name" : "الاسم الكامل"}</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-5 w-5 text-muted-foreground rtl:right-3 rtl:left-auto" />
                      <Input className="h-12 pl-10 rtl:pr-10 rtl:pl-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>{language === "en" ? "Email" : "البريد الإلكتروني"}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground rtl:right-3 rtl:left-auto" />
                      <Input type="email" className="h-12 pl-10 rtl:pr-10 rtl:pl-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>{language === "en" ? "Phone" : "رقم الهاتف"}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground rtl:right-3 rtl:left-auto" />
                      <Input className="h-12 pl-10 rtl:pr-10 rtl:pl-3" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          )}

          {step === 4 && (
            <CardContent className="py-16 text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div className="text-2xl font-bold uppercase">
                {language === "en" ? "Request Received" : "تم استلام الطلب"}
              </div>
              <div className="text-muted-foreground">
                {language === "en" ? "Our sales team will contact you shortly." : "سيتواصل معك فريق المبيعات قريباً."}
              </div>
              <Button onClick={() => setLocation("/")} variant="outline">
                {language === "en" ? "Back to Home" : "العودة للرئيسية"}
              </Button>
            </CardContent>
          )}

          {step <= 3 && (
            <CardFooter className="flex items-center justify-between">
              <Button type="button" variant="outline" onClick={step === 1 ? () => setLocation("/") : back} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                {language === "en" ? "Back" : "رجوع"}
              </Button>

              {step < 3 ? (
                <Button type="button" onClick={next} className="gap-2">
                  {language === "en" ? "Next" : "التالي"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" onClick={submit} disabled={saving} className="gap-2">
                  {saving ? (language === "en" ? "Submitting..." : "جاري الإرسال...") : language === "en" ? "Submit" : "إرسال"}
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
