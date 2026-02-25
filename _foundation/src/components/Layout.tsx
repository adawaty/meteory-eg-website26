import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Mail, Globe, Facebook, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_INFO } from "@/data/company";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import logoFull from "@/assets/branding/meteory-logo-full.png";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.products"), href: "/products" },
    { label: t("nav.projects"), href: "/projects" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.calculator"), href: "/calculator" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar - Industrial Info */}
      <div className="bg-foreground text-background py-1 px-4 text-xs font-mono uppercase tracking-widest hidden md:flex justify-between items-center">
        <span>{t("nav.iso")}</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-2" dir="ltr"><Phone className="h-3 w-3" /> {COMPANY_INFO.phones.mobile}</span>
          <span className="flex items-center gap-2"><Mail className="h-3 w-3" /> {COMPANY_INFO.email}</span>
        </div>
      </div>

      <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2 rtl:ml-6 rtl:mr-0">
           {/* Use real logo instead of text */}
           <img src={logoFull} alt="Meteory Fire Safety" className="h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary uppercase tracking-wide",
                location === item.href ? "text-primary font-bold" : "text-foreground/80"
              )}
            >
              {item.label}
            </Link>
          ))}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLanguage}
            className="rounded-full w-8 h-8"
            title={language === "en" ? "Switch to Arabic" : "Switch to English"}
          >
            <Globe className="h-4 w-4" />
            <span className="sr-only">Toggle Language</span>
          </Button>

          <Button asChild variant="default" className="bg-primary hover:bg-primary/90 rounded-none uppercase tracking-widest font-bold">
            <Link href="/quote">{t("nav.quote")}</Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLanguage}
            className="rounded-full w-8 h-8"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t bg-background overflow-hidden"
          >
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium uppercase tracking-wide hover:text-primary block py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  const { t, language } = useLanguage();
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <img src={logoFull} alt="Meteory" className="h-16 w-auto object-contain bg-white/10 p-2 rounded-lg" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t("footer.desc")}
          </p>
        </div>
        
        <div>
          <h4 className="font-heading text-lg mb-6 text-white">{t("footer.products")}</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/products" className="hover:text-primary">{t("products.filter.extinguisher")}</Link></li>
            <li><Link href="/products" className="hover:text-primary">{t("products.filter.cabinet")}</Link></li>
            <li><Link href="/products" className="hover:text-primary">{t("products.filter.system")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-6 text-white">{t("footer.company")}</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary">{t("nav.about")}</Link></li>
            <li><Link href="/services" className="hover:text-primary">{t("nav.services")}</Link></li>
            <li><Link href="/contact" className="hover:text-primary">{t("nav.contact")}</Link></li>
            <li className="pt-2 border-t border-white/10 mt-2"><Link href="/admin" className="text-primary hover:text-white font-bold transition-colors">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-6 text-white">{t("footer.contact")}</h4>
          <address className="not-italic text-sm text-muted-foreground space-y-3">
            <p>{language === "ar" ? COMPANY_INFO.addressAr : COMPANY_INFO.address}</p>
            <p dir="ltr">{t("footer.phone")} {COMPANY_INFO.phones.mobile}</p>
            <p dir="ltr">{t("footer.fax")} {COMPANY_INFO.phones.fax}</p>
            <p dir="ltr">{t("footer.email")} {COMPANY_INFO.email}</p>
          </address>
          <div className="flex gap-4 mt-6">
            <a href={COMPANY_INFO.socials.facebook} target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={COMPANY_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="container px-4 mt-16 pt-8 border-t border-white/10 text-center text-xs text-muted-foreground font-mono">
        © {new Date().getFullYear()} Meteory. {t("footer.rights")} ISO 9001:2015 Certified.
      </div>
    </footer>
  );
}
