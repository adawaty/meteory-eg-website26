import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Award } from "lucide-react";
import { products } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";
import { motion } from "framer-motion";

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center bg-foreground text-background overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1582200780210-9076f7f6f4c5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-black/80 via-black/50 to-transparent z-0"></div>
        
        <div className="container relative z-10 px-4">
          <StaggerContainer className="max-w-3xl space-y-6" delay={0.2}>
            <motion.div variants={StaggerItem} className="inline-block bg-primary px-3 py-1 text-sm font-bold uppercase tracking-widest text-white mb-4">
              {t("hero.est")}
            </motion.div>
            <motion.h1 variants={StaggerItem} className="text-5xl md:text-7xl font-heading font-bold leading-tight uppercase">
              {t("hero.title")} <br/>
              <span className="text-primary">{t("hero.subtitle")}</span>
            </motion.h1>
            <motion.p variants={StaggerItem} className="text-xl text-muted-foreground max-w-xl border-l-4 rtl:border-l-0 rtl:border-r-4 border-primary pl-6 rtl:pl-0 rtl:pr-6">
              {t("hero.desc")}
            </motion.p>
            <motion.div variants={StaggerItem} className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-none h-14 px-8 text-lg font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <Link href="/products">{t("hero.cta.products")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black rounded-none h-14 px-8 text-lg font-bold uppercase tracking-wide">
                <Link href="/contact">{t("hero.cta.contact")}</Link>
              </Button>
            </motion.div>
          </StaggerContainer>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x rtl:divide-x-reverse divide-white/20">
          <FadeIn delay={0.1} className="p-4">
            <div className="text-4xl font-heading font-bold mb-2">50+</div>
            <div className="text-sm uppercase tracking-widest opacity-80">{t("stats.years")}</div>
          </FadeIn>
          <FadeIn delay={0.2} className="p-4">
            <div className="text-4xl font-heading font-bold mb-2">ISO</div>
            <div className="text-sm uppercase tracking-widest opacity-80">{t("stats.iso")}</div>
          </FadeIn>
          <FadeIn delay={0.3} className="p-4">
            <div className="text-4xl font-heading font-bold mb-2">10+</div>
            <div className="text-sm uppercase tracking-widest opacity-80">{t("stats.countries")}</div>
          </FadeIn>
          <FadeIn delay={0.4} className="p-4">
            <div className="text-4xl font-heading font-bold mb-2">#1</div>
            <div className="text-sm uppercase tracking-widest opacity-80">{t("stats.rank")}</div>
          </FadeIn>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-background">
        <div className="container px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 rtl:left-auto rtl:-right-4 w-24 h-24 border-t-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-primary"></div>
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" 
              alt="Industrial Factory" 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 rtl:right-auto rtl:-left-4 w-24 h-24 border-b-4 border-r-4 rtl:border-r-0 rtl:border-l-4 border-primary"></div>
          </div>
          <SlideUp className="space-y-6">
             <h2 className="text-4xl font-heading font-bold uppercase text-foreground">
              {t("home.about.title")} <span className="text-primary">{t("home.about.highlight")}</span>
             </h2>
             <p className="text-muted-foreground text-lg leading-relaxed">
               {t("home.about.desc")}
             </p>
             <ul className="space-y-4 pt-4">
               {[
                 t("home.about.point1"),
                 t("home.about.point2"),
                 t("home.about.point3")
               ].map(item => (
                 <li key={item} className="flex items-center gap-3 font-medium">
                   <ShieldCheck className="text-primary h-6 w-6 rtl:ml-3 rtl:mr-0" /> {item}
                 </li>
               ))}
             </ul>
             <Button asChild variant="link" className="text-primary text-lg font-bold uppercase p-0 h-auto mt-4 group">
               <Link href="/about">{t("home.about.cta")} <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5 rtl:rotate-180 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" /></Link>
             </Button>
          </SlideUp>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-secondary">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
            <h2 className="text-4xl font-heading font-bold uppercase text-foreground">
              {t("home.products.title")} <span className="text-primary">{t("home.products.highlight")}</span>
            </h2>
            <Button asChild variant="outline" className="hidden md:flex rounded-none border-foreground hover:bg-foreground hover:text-background uppercase font-bold">
              <Link href="/products">{t("home.products.viewAll")}</Link>
            </Button>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <motion.div variants={StaggerItem} key={product.id} className="group bg-background border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden">
                <div className="aspect-[4/5] bg-white p-8 flex items-center justify-center relative">
                   <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-secondary text-xs font-bold uppercase px-2 py-1 tracking-widest text-muted-foreground">
                     {t(`products.filter.${product.category.toLowerCase()}` as any) || product.category}
                   </div>
                   <img 
                     src={product.image} 
                     alt={product.name}
                     className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                   />
                </div>
                <div className="p-6 border-t border-border bg-white relative z-10">
                  <h3 className="text-xl font-heading font-bold mb-2 uppercase group-hover:text-primary transition-colors">
                    {language === "ar" && product.nameAr ? product.nameAr : product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {language === 'ar' && product.descriptionAr ? product.descriptionAr : product.description}
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                    {t("home.products.viewSpecs")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </span>
                </div>
                <Link href="/products" className="absolute inset-0 z-20">
                  <span className="sr-only">
                    {language === "ar" && product.nameAr ? product.nameAr : product.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </StaggerContainer>
          
          <div className="mt-8 md:hidden">
            <Button asChild className="w-full rounded-none uppercase font-bold">
              <Link href="/products">{t("home.products.viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground text-background text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517646287278-68e918196016?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <ScaleIn className="container px-4 max-w-3xl space-y-8 relative z-10">
           <Award className="h-16 w-16 text-primary mx-auto" />
           <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase">
             {t("home.cta.title")}
           </h2>
           <p className="text-xl text-muted-foreground">
             {t("home.cta.desc")}
           </p>
           <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none h-16 px-12 text-xl font-bold uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all">
             <Link href="/contact">{t("home.cta.button")}</Link>
           </Button>
        </ScaleIn>
      </section>
    </div>
  );
}
