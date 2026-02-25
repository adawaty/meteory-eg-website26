import { useRoute } from "wouter";
import { products } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Printer, Download, ArrowLeft } from "lucide-react";
import logoEn from "@/assets/branding/meteory-logo-full.png"; // Using full logo for header

export default function Datasheet() {
  const [match, params] = useRoute("/products/:id/datasheet");
  const { t, language } = useLanguage();

  if (!match || !params?.id) return null;

  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  const title = language === "ar" && product.nameAr ? product.nameAr : product.name;
  const description = language === "ar" && product.descriptionAr ? product.descriptionAr : product.description;
  const features = language === "ar" ? (product.featuresAr || product.features) : product.features;

  return (
    <div className="min-h-screen bg-muted/20 p-8 print:p-0 print:bg-white">
      {/* Toolbar - Hidden in Print */}
      <div className="max-w-[210mm] mx-auto mb-8 flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={() => history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0 rtl:rotate-180" /> {t("common.back")}
        </Button>
        <div className="flex gap-2">
          <Button onClick={handlePrint} className="bg-primary text-white">
            <Printer className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> {t("common.print")}
          </Button>
        </div>
      </div>

      {/* A4 Page Container */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-xl print:shadow-none p-[15mm] min-h-[297mm] flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center border-b-4 border-primary pb-6 mb-8">
          <img src={logoEn} alt="Meteory" className="h-16 object-contain" />
          <div className="text-right rtl:text-left">
            <h1 className="text-2xl font-bold uppercase tracking-widest text-primary">Technical Data Sheet</h1>
            <p className="text-sm text-muted-foreground mt-1">ISO 9001:2015 Certified Manufacturer</p>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-grow">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="col-span-1">
              <div className="border border-gray-200 p-4 bg-gray-50 flex items-center justify-center h-full">
                <img src={product.image} alt={product.name} className="max-h-64 object-contain mix-blend-multiply" />
              </div>
            </div>
            <div className="col-span-2 space-y-4">
              <h2 className="text-3xl font-heading font-bold uppercase text-gray-900">{title}</h2>
              <div className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 uppercase tracking-widest mb-2">
                {product.category}
              </div>
              <p className="text-gray-600 leading-relaxed text-sm text-justify">
                {description}
              </p>
              
              {features && (
                <div className="pt-4">
                  <h3 className="font-bold uppercase text-sm text-primary mb-2 border-b border-gray-200 pb-1">
                    {language === "en" ? "Key Features" : "الميزات الرئيسية"}
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <span className="text-primary mt-0.5">■</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Specs Table */}
          {product.specs && (
            <div className="mb-8">
              <h3 className="font-bold uppercase text-sm text-primary mb-4 border-b border-gray-200 pb-1">
                {language === "en" ? "Technical Specifications" : "المواصفات الفنية"}
              </h3>
              <div className="border border-gray-300 rounded-sm overflow-hidden text-xs">
                <Table>
                  <TableBody>
                    <TableRow className="bg-gray-100 font-bold border-b border-gray-300">
                      <TableCell className="w-1/4 border-r border-gray-300">Model</TableCell>
                      <TableCell className="w-1/4 border-r border-gray-300">Capacity</TableCell>
                      <TableCell className="w-1/4 border-r border-gray-300">Working Pressure</TableCell>
                      <TableCell className="w-1/4">Test Pressure</TableCell>
                    </TableRow>
                    {product.specs.map((spec, idx) => (
                      <TableRow key={idx} className="border-b border-gray-200 last:border-0 odd:bg-white even:bg-gray-50">
                        <TableCell className="font-bold border-r border-gray-200">{spec.model}</TableCell>
                        <TableCell className="border-r border-gray-200">{spec.capacity}</TableCell>
                        <TableCell className="border-r border-gray-200">{spec.workingPressure || '-'}</TableCell>
                        <TableCell>{spec.testingPressure || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Applications */}
          {product.applications && (
            <div className="mb-8">
              <h3 className="font-bold uppercase text-sm text-primary mb-2 border-b border-gray-200 pb-1">
                {language === "en" ? "Recommended Applications" : "تطبيقات الاستخدام"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app, i) => (
                  <span key={i} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 font-medium border border-gray-200">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-6 border-t border-gray-200 flex justify-between items-end text-xs text-gray-500">
          <div>
            <p className="font-bold text-gray-900">Meteory Fire Safety Solutions</p>
            <p>81 Joseph Tito St, El Nozha, Cairo, Egypt</p>
            <p>www.meteory-eg.com | info@meteory-eg.com</p>
          </div>
          <div className="text-right">
            <p>Doc Ref: TDS-{product.id.toUpperCase()}-V1</p>
            <p>© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
        </footer>
        
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] pointer-events-none">
          <img src={logoEn} className="w-[150mm]" alt="" />
        </div>
      </div>
    </div>
  );
}
