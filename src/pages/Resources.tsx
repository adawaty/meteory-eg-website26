import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileDown, ShieldCheck, Calculator, ArrowRight, Building2 } from "lucide-react";
import { Link } from "wouter";
import companyProfilePdf from "@/assets/datasheets/Meteory_Company_profile.pdf";
import cabinetsCatalogPdf from "@/assets/datasheets/Cabinets.pdf";
import attachmentsPdf from "@/assets/datasheets/Attachments.pdf";

const resources = [
  {
    key: "certs",
    icon: ShieldCheck,
    titleEn: "Certifications & Compliance",
    titleAr: "الشهادات والالتزام",
    descEn:
      "Centralize ISO certificates, approvals, and compliance statements for procurement and audits.",
    descAr:
      "تجميع شهادات ISO والاعتمادات وبيانات الالتزام لمتطلبات المشتريات والتدقيق.",
  },
  {
    key: "datasheets",
    icon: FileDown,
    titleEn: "Technical Datasheets",
    titleAr: "كتالوجات البيانات الفنية",
    descEn:
      "Product datasheets by model, capacity, and use-case. Ideal for consultants and site engineers.",
    descAr:
      "كتالوجات بيانات حسب الموديل والسعة وحالة الاستخدام. مناسبة للمكاتب الاستشارية ومهندسي المواقع.",
  },
  {
    key: "guides",
    icon: BookOpen,
    titleEn: "Guides & Best Practices",
    titleAr: "أدلة وأفضل الممارسات",
    descEn:
      "Short guides to help teams select extinguishers, plan coverage, and prepare facility documentation.",
    descAr:
      "أدلة مختصرة تساعد الفرق على اختيار الطفايات وتخطيط التغطية وتجهيز مستندات المنشأة.",
  },
];

export default function Resources() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary py-16 border-b border-border">
        <div className="container px-4">
          <h1 className="text-5xl font-heading font-bold uppercase mb-4">
            {language === "ar" ? "الموارد" : "Resources"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {language === "ar"
              ? "مكتبة مرجعية سريعة للفرق الهندسية والمشتريات. يمكنكم طلب الملفات الرسمية أو الكتالوجات عبر نموذج التواصل." 
              : "A quick reference library for engineering and procurement teams. Request official files or catalogs via the contact form."}
          </p>
        </div>
      </div>

      <div className="container px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Profile (Direct Download) */}
          <Card className="rounded-none border-border/60 shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 border border-border">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold uppercase">
                    {language === "ar" ? "نبذة عن الشركة" : "Company Profile"}
                  </h3>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {language === "ar"
                  ? "ملف تعريفي رسمي عن شركة ميتيوري: نبذة، رؤية ورسالة، وخبرة التصنيع." 
                  : "Official Meteory company profile PDF: overview, capabilities, and manufacturing background."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-none bg-primary hover:bg-primary/90 font-bold uppercase tracking-widest">
                  <a href={companyProfilePdf} download target="_blank" rel="noreferrer">
                    {language === "ar" ? "تحميل الملف" : "Download PDF"}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-none">
                  <Link href="/contact">
                    {language === "ar" ? "اطلب نسخة مختومة" : "Request stamped copy"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <Card key={r.key} className="rounded-none border-border/60 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 border border-border">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold uppercase">
                        {language === "ar" ? r.titleAr : r.titleEn}
                      </h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === "ar" ? r.descAr : r.descEn}
                  </p>
                  <div className="mt-6">
                    <Button asChild variant="outline" className="rounded-none">
                      <Link href="/contact">
                        {language === "ar" ? "اطلب الملفات" : "Request files"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Downloads (synced from Notion) */}
        <div className="mt-12 border border-border bg-secondary/40 p-8">
          <h2 className="text-2xl font-heading font-bold uppercase">
            {language === "ar" ? "تحميل سريع" : "Quick Downloads"}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            {language === "ar"
              ? "ملفات رسمية متاحة مباشرة من مكتبة Notion الخاصة بميتيوري." 
              : "Official files pulled from Meteory’s Notion library."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-none bg-primary hover:bg-primary/90 font-bold uppercase tracking-widest">
              <a href={companyProfilePdf} download target="_blank" rel="noreferrer">
                {language === "ar" ? "نبذة عن الشركة" : "Company Profile"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild variant="outline" className="rounded-none">
              <a href={cabinetsCatalogPdf} download target="_blank" rel="noreferrer">
                {language === "ar" ? "كتالوج الدواليب" : "Cabinets Catalog"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild variant="outline" className="rounded-none">
              <a href={attachmentsPdf} download target="_blank" rel="noreferrer">
                {language === "ar" ? "ملحقات" : "Attachments"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild variant="outline" className="rounded-none">
              <Link href="/products">
                {language === "ar" ? "تصفح كتالوج المنتجات" : "Browse Product Datasheets"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 bg-foreground text-background p-10 border border-border">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div>
              <h2 className="text-3xl font-heading font-bold uppercase flex items-center gap-3">
                <Calculator className="h-6 w-6 text-primary" />
                {language === "ar" ? "جرّب حاسبة السلامة" : "Try the Safety Calculator"}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl">
                {language === "ar"
                  ? "أداة تفاعلية سريعة لتقدير العدد المبدئي للطفايات حسب نوع المنشأة ومساحتها." 
                  : "A quick interactive tool to estimate baseline extinguisher quantity by facility type and area."}
              </p>
            </div>
            <Button asChild className="rounded-none bg-primary hover:bg-primary/90 font-bold uppercase tracking-widest">
              <Link href="/calculator">
                {language === "ar" ? "افتح الحاسبة" : "Open Calculator"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
