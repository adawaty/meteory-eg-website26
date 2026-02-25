import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Shield, SlidersHorizontal, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Check, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { t, language } = useLanguage();
  
  const sorted = [...products].sort((a, b) => {
    const ac = a.category.localeCompare(b.category);
    if (ac !== 0) return ac;
    return (a.subCategory || "").localeCompare(b.subCategory || "");
  });

  const filteredProducts = activeCategory === "all" 
    ? sorted 
    : sorted.filter(p => p.category === activeCategory);

  const categories = [
    { id: "all", label: t("products.filter.all") },
    { id: "extinguisher", label: t("products.filter.extinguisher") },
    { id: "cabinet", label: t("products.filter.cabinet") },
    { id: "system", label: t("products.filter.system") },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative overflow-hidden bg-secondary py-16 border-b border-border">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,oklch(var(--accent)/0.18),transparent_55%),radial-gradient(700px_circle_at_80%_30%,oklch(var(--primary)/0.14),transparent_55%)]"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.7, 1, 0.75] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container px-4 relative">
          <div className="ui-label text-muted-foreground mb-3">{language === "ar" ? "خطوة بخطوة" : "Step-by-step"}</div>
          <h1 className="text-5xl font-heading font-semibold mb-4">{t("products.catalog")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {t("products.desc")}
          </p>
        </div>
      </div>

      {/* Story strip */}
      <div className="container px-4 -mt-8 mb-10">
        <StaggerContainer className="grid md:grid-cols-3 gap-4" delay={0.1}>
          {[ 
            {
              icon: Shield,
              title: language === "ar" ? "حدد الخطر" : "Assess the hazard",
              body: language === "ar"
                ? "نوع المنشأة، مساحة المنطقة، وطبيعة المخاطر." 
                : "Facility type, area, and what you’re protecting.",
            },
            {
              icon: SlidersHorizontal,
              title: language === "ar" ? "اختر الحل" : "Pick the system",
              body: language === "ar"
                ? "طفايات، خزائن، أو أنظمة إطفاء مُهندسة مثل FM-200." 
                : "Extinguishers, cabinets, or engineered systems like FM‑200.",
            },
            {
              icon: BadgeCheck,
              title: language === "ar" ? "تحقق من المتطلبات" : "Validate compliance",
              body: language === "ar"
                ? "طابق مع اشتراطات الجهة المختصة وخطة الموقع." 
                : "Cross-check with AHJ requirements and the final site plan.",
            },
          ].map((s) => {
            const Ico = s.icon;
            return (
              <motion.div key={s.title} variants={StaggerItem} className="ui-surface ui-hover-lift p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg border border-border bg-secondary p-3">
                    <Ico className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-heading font-semibold text-foreground">{s.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{s.body}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Filter */}
      <div className="border-b border-border sticky top-20 bg-background/95 backdrop-blur z-40">
        <div className="container px-4 overflow-x-auto">
          <div className="flex space-x-8 rtl:space-x-reverse min-w-max py-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "uppercase font-bold tracking-wider text-sm pb-1 border-b-2 transition-colors",
                  activeCategory === cat.id 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container px-4 py-16">
        <div className="space-y-24">
          {filteredProducts.map((product) => (
            <div key={product.id} id={product.id} className="scroll-mt-32 grid md:grid-cols-2 gap-12 items-start border-b border-border pb-16 last:border-0">
              {/* Product Image */}
              <div className="ui-surface ui-hover-lift p-10 flex items-center justify-center group relative overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 opacity-30 bg-[radial-gradient(800px_circle_at_20%_20%,oklch(var(--accent)/0.16),transparent_55%),radial-gradient(700px_circle_at_80%_30%,oklch(var(--primary)/0.12),transparent_55%)]" />
                <img
                  src={product.image}
                  alt={language === "ar" && product.nameAr ? product.nameAr : product.name}
                  className="max-h-[420px] object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                   <div className="inline-block bg-muted text-muted-foreground px-2 py-1 text-xs font-bold uppercase tracking-widest mb-2">
                     {product.subCategory
                       ? (language === "ar"
                           ? (product.subCategory === "co2" ? "CO2" : product.subCategory === "powder" ? "بودرة" : product.subCategory === "foam" ? "رغوة" : product.subCategory)
                           : (product.subCategory === "co2" ? "CO2" : product.subCategory === "powder" ? "Dry Powder" : product.subCategory === "foam" ? "Foam" : product.subCategory))
                       : (language === "ar"
                           ? (product.category === "extinguisher" ? "طفايات" : product.category === "cabinet" ? "خزائن" : "أنظمة")
                           : (product.category === "extinguisher" ? "Extinguishers" : product.category === "cabinet" ? "Cabinets" : "Systems"))}
                   </div>
                   <h2 className="text-3xl font-heading font-bold uppercase text-foreground mb-4">
                     {language === "ar" && product.nameAr ? product.nameAr : product.name}
                   </h2>
                   <p className="text-lg text-muted-foreground leading-relaxed">
                     {language === "ar" && product.descriptionAr ? product.descriptionAr : product.description}
                   </p>
                </div>

                {(language === "ar" ? (product.featuresAr || product.features) : product.features) && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">{t("products.features")}</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(language === "ar" ? (product.featuresAr || product.features) : product.features)!.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.specs && (
                  <div className="pt-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">{t("products.specs")}</h3>
                    <div className="border border-border rounded-none overflow-hidden">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="font-bold text-foreground text-start">{t("products.model")}</TableHead>
                            <TableHead className="font-bold text-foreground text-start">{t("products.capacity")}</TableHead>
                            <TableHead className="font-bold text-foreground text-start">{t("products.pressure")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {product.specs.map((spec, idx) => (
                            <TableRow key={idx} className="hover:bg-muted/30">
                              <TableCell className="font-medium text-start">{spec.model}</TableCell>
                              <TableCell className="text-start">{spec.capacity}</TableCell>
                              <TableCell className="text-start">
                                {spec.workingPressure ? `${spec.workingPressure}` : '-'} 
                                {spec.testingPressure && ` / ${spec.testingPressure}`}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4 pt-4">
                  <Button asChild size="lg" className="rounded-md bg-primary hover:bg-primary/92 ui-shine">
                    <Link href="/quote">
                    {t("common.requestQuote")}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-md border-foreground/20 cursor-pointer">
                    <Link href={`/products/${product.id}/datasheet`}>
                      <FileText className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> {t("common.download")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
