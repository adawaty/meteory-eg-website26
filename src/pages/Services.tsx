import { Settings, GraduationCap, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { motion } from "framer-motion";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t("services.mfg"),
      icon: <FactoryIcon className="h-12 w-12 text-primary mb-4" />,
      description: t("services.mfg.desc")
    },
    {
      title: t("services.maint"),
      icon: <Settings className="h-12 w-12 text-primary mb-4" />,
      description: t("services.maint.desc")
    },
    {
      title: t("services.consult"),
      icon: <ShieldAlert className="h-12 w-12 text-primary mb-4" />,
      description: t("services.consult.desc")
    },
    {
      title: t("services.train"),
      icon: <GraduationCap className="h-12 w-12 text-primary mb-4" />,
      description: t("services.train.desc")
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="relative bg-secondary py-24 border-b border-border overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute right-0 top-0 h-full w-1/3 bg-primary skew-x-12 transform origin-bottom"
        />
        <div className="container px-4 relative z-10">
          <SlideUp>
            <h1 className="text-5xl md:text-7xl font-heading font-bold uppercase mb-4">{t("services.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {t("services.desc")}
            </p>
          </SlideUp>
        </div>
      </div>

      <div className="container px-4 py-16">
        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div 
              variants={StaggerItem}
              key={index} 
              className="bg-white p-10 border border-border hover:border-primary transition-all duration-300 group hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-500">
                {service.icon}
              </div>
              <div className="relative z-10">
                {service.icon}
                <h3 className="text-3xl font-heading font-bold uppercase mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}

function FactoryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </svg>
  )
}
