import { Button } from "@/components/ui/button";
import { products, type Product } from "@/data/products";
import { Link } from "wouter";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Download, FileText, ArrowRight } from "lucide-react";
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
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categories = [
    { id: "all", label: t("products.filter.all") },
    { id: "extinguisher", label: t("products.filter.extinguisher") },
    { id: "cabinet", label: t("products.filter.cabinet") },
    { id: "system", label: t("products.filter.system") },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-secondary py-16 border-b border-border">
        <div className="container px-4">
          <h1 className="text-5xl font-heading font-bold uppercase mb-4">{t("products.catalog")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {t("products.desc")}
          </p>
        </div>
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
              <div className="bg-secondary p-12 flex items-center justify-center border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group">
                <img 
                  src={product.image} 
                  alt={language === "ar" && product.nameAr ? product.nameAr : product.name} 
                  className="max-h-[400px] object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                   <div className="inline-block bg-muted text-muted-foreground px-2 py-1 text-xs font-bold uppercase tracking-widest mb-2">
                     {product.subCategory || product.category}
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
                  <Button asChild size="lg" className="rounded-none uppercase font-bold bg-primary hover:bg-primary/90">
                    <Link href="/quote">
                    {t("common.requestQuote")}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-none uppercase font-bold border-foreground/20 cursor-pointer">
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
