import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Award, Flame, Radar, Droplets, Siren, Wrench, CircuitBoard } from "lucide-react";
import { products } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";
import { motion } from "framer-motion";
import heroImg from "@/assets/portfolio/energy-plant.jpeg";
import aboutImg from "@/assets/portfolio/energy-transformer.jpeg";
import ctaImg from "@/assets/portfolio/aviation-foam-1.jpeg";

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero Section (Johnson Controls-inspired layout) */}
      <section className="relative overflow-hidden bg-background">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,oklch(var(--accent)/0.18),transparent_55%),radial-gradient(700px_circle_at_80%_30%,oklch(var(--primary)/0.16),transparent_55%)]"
          initial={{ opacity: 0.65 }}
          animate={{ opacity: [0.65, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-border" />

        <div className="container relative z-10 px-4 py-16 md:py-20">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center min-h-[70vh]">
            <StaggerContainer className="max-w-xl space-y-6" delay={0.15}>
              <motion.div variants={StaggerItem} className="inline-flex items-center gap-2">
                <span className="ui-label bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {t("hero.est")}
                </span>
                <span className="ui-label text-muted-foreground">
                  {language === "ar" ? "مصنع معتمد" : "Certified manufacturer"}
                </span>
              </motion.div>

              <motion.h1
                variants={StaggerItem}
                className="text-5xl md:text-6xl font-heading font-semibold leading-[1.05]"
              >
                {t("hero.title")} <span className="text-primary">{t("hero.subtitle")}</span>
              </motion.h1>

              <motion.p
                variants={StaggerItem}
                className="text-lg text-muted-foreground max-w-xl border-l-2 rtl:border-l-0 rtl:border-r-2 border-primary pl-5 rtl:pl-0 rtl:pr-5"
              >
                {t("hero.desc")}
              </motion.p>

              <motion.div variants={StaggerItem} className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/92 rounded-md h-12 px-6 text-base font-semibold"
                >
                  <Link href="/products">{t("hero.cta.products")}</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-md h-12 px-6 text-base font-semibold border-border hover:bg-secondary"
                >
                  <Link href="/contact">{t("hero.cta.contact")}</Link>
                </Button>
              </motion.div>
            </StaggerContainer>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-white/60 rounded-2xl border border-border shadow-[0_20px_80px_-40px_rgba(0,0,0,0.35)]" />
              <div className="relative rounded-2xl overflow-hidden border border-border bg-white">
                <img
                  src={heroImg}
                  alt="Fire safety manufacturing"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white font-semibold">
                    {language === "ar" ? "حلول صناعية موثوقة" : "Reliability engineered for critical sites"}
                  </div>
                  <div className="text-white/75 text-sm mt-1">
                    {language === "ar" ? "تصنيع وخدمة ودعم" : "Manufacturing • Service • Support"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <section className="bg-white/70 border-y border-border py-10">
        <div className="container px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x rtl:divide-x-reverse divide-border">
          <FadeIn delay={0.1} className="p-4">
            <div className="text-4xl font-heading font-semibold mb-2 text-foreground">50+</div>
            <div className="ui-label text-muted-foreground">{t("stats.years")}</div>
          </FadeIn>
          <FadeIn delay={0.2} className="p-4">
            <div className="text-4xl font-heading font-semibold mb-2 text-foreground">ISO</div>
            <div className="ui-label text-muted-foreground">{t("stats.iso")}</div>
          </FadeIn>
          <FadeIn delay={0.3} className="p-4">
            <div className="text-4xl font-heading font-semibold mb-2 text-foreground">10+</div>
            <div className="ui-label text-muted-foreground">{t("stats.countries")}</div>
          </FadeIn>
          <FadeIn delay={0.4} className="p-4">
            <div className="text-4xl font-heading font-semibold mb-2 text-foreground">#1</div>
            <div className="ui-label text-muted-foreground">{t("stats.rank")}</div>
          </FadeIn>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-background">
        <div className="container px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 rtl:left-auto rtl:-right-4 w-24 h-24 border-t-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-primary" />
            <img
              src={aboutImg}
              alt="Industrial Factory"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 rtl:right-auto rtl:-left-4 w-24 h-24 border-b-4 border-r-4 rtl:border-r-0 rtl:border-l-4 border-primary" />
          </div>
          <SlideUp className="space-y-6">
            <h2 className="text-4xl font-heading font-semibold text-foreground">
              {t("home.about.title")} <span className="text-primary">{t("home.about.highlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t("home.about.desc")}</p>
            <ul className="space-y-4 pt-4">
              {[t("home.about.point1"), t("home.about.point2"), t("home.about.point3")].map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium">
                  <ShieldCheck className="text-primary h-6 w-6 rtl:ml-3 rtl:mr-0" /> {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="link" className="text-primary text-lg font-semibold p-0 h-auto mt-4 group">
              <Link href="/about">
                {t("home.about.cta")}{" "}
                <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5 rtl:rotate-180 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" />
              </Link>
            </Button>
          </SlideUp>
        </div>
      </section>

      {/* Our Technology */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="ui-label bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {t("home.tech.badge")}
                </span>
                <span className="ui-label text-muted-foreground">
                  {language === "ar" ? "حماية متكاملة" : "End-to-end protection"}
                </span>
              </div>
              <h2 className="text-4xl font-heading font-semibold text-foreground">
                {t("home.tech.title")} <span className="text-primary">{t("home.tech.highlight")}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {t("home.tech.desc")}
              </p>
            </div>

            <div className="flex gap-3">
              <Button asChild variant="outline" className="rounded-md border-border hover:bg-secondary font-semibold">
                <Link href="/services">{language === "ar" ? "الخدمات" : "Services"}</Link>
              </Button>
              <Button asChild className="rounded-md bg-primary hover:bg-primary/90 font-semibold">
                <Link href="/contact">{language === "ar" ? "تواصل مع مهندس" : "Talk to an Engineer"}</Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Radar,
                title: t("home.tech.item.clean.title"),
                desc: t("home.tech.item.clean.desc"),
              },
              {
                icon: CircuitBoard,
                title: t("home.tech.item.co2.title"),
                desc: t("home.tech.item.co2.desc"),
              },
              {
                icon: Flame,
                title: t("home.tech.item.foam.title"),
                desc: t("home.tech.item.foam.desc"),
              },
              {
                icon: Droplets,
                title: t("home.tech.item.mist.title"),
                desc: t("home.tech.item.mist.desc"),
              },
              {
                icon: Siren,
                title: t("home.tech.item.detect.title"),
                desc: t("home.tech.item.detect.desc"),
              },
              {
                icon: Wrench,
                title: t("home.tech.item.service.title"),
                desc: t("home.tech.item.service.desc"),
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="ui-surface ui-hover-lift p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-lg border border-border bg-secondary p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-white p-8 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div>
              <div className="ui-label text-muted-foreground">{language === "ar" ? "ملاحظة" : "Note"}</div>
              <div className="mt-2 text-base text-foreground font-medium">
                {language === "ar"
                  ? "نقوم بتصميم الحل بناءً على نوع المنشأة والمساحة ومستوى الخطورة ومتطلبات الاشتراطات المحلية." 
                  : "We size and specify systems based on facility type, area, hazard level, and local code requirements."}
              </div>
            </div>
            <Button asChild variant="outline" className="rounded-md border-border hover:bg-secondary font-semibold">
              <Link href="/calculator">{language === "ar" ? "جرّب حاسبة السلامة" : "Try Safety Calculator"}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-secondary">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
            <h2 className="text-4xl font-heading font-semibold text-foreground">
              {t("home.products.title")} <span className="text-primary">{t("home.products.highlight")}</span>
            </h2>
            <Button asChild variant="outline" className="hidden md:flex rounded-md border-border hover:bg-secondary font-semibold">
              <Link href="/products">{t("home.products.viewAll")}</Link>
            </Button>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                variants={StaggerItem}
                key={product.id}
                className="group ui-surface ui-hover-lift hover:border-primary/70 relative overflow-hidden"
              >
                <div className="aspect-[4/5] bg-white p-8 flex items-center justify-center relative">
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-secondary text-xs font-semibold px-2.5 py-1 tracking-wide text-muted-foreground rounded-full">
                    {t(`products.filter.${product.category.toLowerCase()}` as any) || product.category}
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 border-t border-border bg-white relative z-10">
                  <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
                    {language === "ar" && product.nameAr ? product.nameAr : product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {language === "ar" && product.descriptionAr ? product.descriptionAr : product.description}
                  </p>
                  <span className="text-xs font-semibold tracking-[0.12em] text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                    {t("home.products.viewSpecs")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </span>
                </div>
                <Link href="/products" className="absolute inset-0 z-20">
                  <span className="sr-only">{language === "ar" && product.nameAr ? product.nameAr : product.name}</span>
                </Link>
              </motion.div>
            ))}
          </StaggerContainer>

          <div className="mt-8 md:hidden">
            <Button asChild className="w-full rounded-md font-semibold">
              <Link href="/products">{t("home.products.viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0b1a2b] text-background text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: `url(${ctaImg})` }} />
        <ScaleIn className="container px-4 max-w-3xl space-y-8 relative z-10">
          <Award className="h-16 w-16 text-primary mx-auto" />
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">{t("home.cta.title")}</h2>
          <p className="text-xl text-muted-foreground">{t("home.cta.desc")}</p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/92 text-white rounded-md h-14 px-10 text-lg font-semibold shadow-[var(--shadow-2)]"
          >
            <Link href="/contact">{t("home.cta.button")}</Link>
          </Button>
        </ScaleIn>
      </section>
    </div>
  );
}
