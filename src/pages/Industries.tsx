import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, Factory, Hospital, Server, Fuel, Building2, Plane } from "lucide-react";

const industries = [
  {
    key: "oil_gas",
    icon: Fuel,
    titleEn: "Oil & Gas / High-Risk Facilities",
    titleAr: "النفط والغاز / المنشآت عالية الخطورة",
    descEn:
      "Explosion-risk zoning, foam systems, clean-agent protection for control rooms, and rapid-response suppression planning.",
    descAr:
      "تقسيم مناطق الخطورة، أنظمة الرغوة، أنظمة الغازات النظيفة لغرف التحكم، وتخطيط إخماد سريع الاستجابة.",
  },
  {
    key: "manufacturing",
    icon: Factory,
    titleEn: "Industrial & Manufacturing",
    titleAr: "الصناعة والتصنيع",
    descEn:
      "End-to-end fire protection strategies for production lines, warehouses, and hazardous material storage.",
    descAr:
      "استراتيجيات حماية متكاملة لخطوط الإنتاج والمخازن وتخزين المواد الخطرة.",
  },
  {
    key: "healthcare",
    icon: Hospital,
    titleEn: "Healthcare",
    titleAr: "الرعاية الصحية",
    descEn:
      "Life-safety focused solutions: evacuation readiness, compliant extinguishers, and suppression for critical areas.",
    descAr:
      "حلول تركز على سلامة الأرواح: جاهزية الإخلاء، طفايات مطابقة للاشتراطات، وإخماد للمناطق الحرجة.",
  },
  {
    key: "datacenters",
    icon: Server,
    titleEn: "Data Centers & IT Rooms",
    titleAr: "مراكز البيانات وغرف الـ IT",
    descEn:
      "Clean-agent / CO₂ options, early detection readiness, and documentation for audit & compliance workflows.",
    descAr:
      "خيارات الغازات النظيفة / CO₂، جاهزية للكشف المبكر، وتوثيق مناسب لأعمال التدقيق والالتزام.",
  },
  {
    key: "commercial",
    icon: Building2,
    titleEn: "Commercial & Mixed-Use",
    titleAr: "التجاري والمتعدد الاستخدام",
    descEn:
      "Design, installation, and maintenance planning for offices, malls, and complex property layouts.",
    descAr:
      "تصميم وتركيب وخطط صيانة للمكاتب والمراكز التجارية وتخطيطات المباني المعقدة.",
  },
  {
    key: "aviation",
    icon: Plane,
    titleEn: "Aviation & Logistics",
    titleAr: "الطيران والخدمات اللوجستية",
    descEn:
      "Foam applications, hangar protection, and quick-access equipment placement for high-traffic operations.",
    descAr:
      "تطبيقات الرغوة، حماية الحظائر، وتوزيع معدات سريعة الوصول للعمليات عالية الحركة.",
  },
];

export default function Industries() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary py-16 border-b border-border">
        <div className="container px-4">
          <div className="inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 text-xs font-mono uppercase tracking-[0.3em]">
            <Shield className="h-4 w-4 text-primary" />
            {language === "ar" ? "قطاعات نخدمها" : "Industries Served"}
          </div>
          <h1 className="text-5xl font-heading font-bold uppercase mt-6 mb-4">
            {language === "ar" ? "حلول حسب طبيعة المخاطر" : "Solutions by Risk Profile"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {language === "ar"
              ? "كل منشأة لها مخاطر مختلفة. نقوم بتكييف منتجاتنا وخدماتنا وفقاً للبيئة التشغيلية، ونقاط الاشتعال المحتملة، ومتطلبات الالتزام." 
              : "Every facility has different hazards. We tailor products and services around operations, ignition sources, and compliance requirements."}
          </p>
        </div>
      </div>

      <div className="container px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((it) => {
            const Icon = it.icon;
            return (
              <Card key={it.key} className="border-border/60 rounded-none shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 border border-border">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold uppercase">
                        {language === "ar" ? it.titleAr : it.titleEn}
                      </h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === "ar" ? it.descAr : it.descEn}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
