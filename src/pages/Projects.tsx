import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Calendar, Building2, Plane } from "lucide-react";
import { projects } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Projects() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-secondary py-16 border-b border-border">
        <div className="container px-4">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="outline" className="border-primary text-primary uppercase tracking-widest px-3 py-1">{t("projects.badge")}</Badge>
          </div>
          <h1 className="text-5xl font-heading font-bold uppercase mb-4">{t("projects.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {t("projects.subtitle")}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const title = language === 'ar' && project.titleAr ? project.titleAr : project.title;
            const location = language === 'ar' && project.locationAr ? project.locationAr : project.location;
            const description = language === 'ar' && project.descriptionAr ? project.descriptionAr : project.description;
            const caseStudy = language === 'ar' && project.caseStudyAr ? project.caseStudyAr : project.caseStudy;

            return (
              <div key={project.id} className="group bg-white border border-border hover:border-primary transition-all duration-300 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img 
                    src={project.image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                    <Badge className={
                      project.category === "Energy" ? "bg-amber-600 hover:bg-amber-700" : "bg-sky-600 hover:bg-sky-700"
                    }>
                      {project.category === "Energy" ? <Building2 className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" /> : <Plane className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />}
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold uppercase mb-1 group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground gap-3">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {location}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-secondary px-2 py-1 text-foreground/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-white group/btn rounded-none border border-transparent hover:border-primary">
                          {t("projects.viewCase")} <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0 overflow-hidden rounded-none border-primary">
                        <ScrollArea className="h-full max-h-[90vh]">
                          <div className="relative h-64 md:h-80">
                            <img src={project.image} alt={title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 text-white">
                              <Badge className="mb-2 bg-primary">{project.category}</Badge>
                              <h2 className="text-3xl font-heading font-bold uppercase">{title}</h2>
                              <div className="flex gap-4 mt-2 text-sm opacity-90">
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {location}</span>
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {project.year}</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-8 space-y-8">
                            <div>
                              <h3 className="text-lg font-bold uppercase text-primary mb-2 border-b border-border pb-2">{t("projects.challenge")}</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                {caseStudy.challenge}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold uppercase text-primary mb-2 border-b border-border pb-2">{t("projects.solution")}</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                {caseStudy.solution}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold uppercase text-primary mb-2 border-b border-border pb-2">{t("projects.result")}</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                {caseStudy.result}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-sm font-bold uppercase text-foreground mb-3">{t("projects.tech")}</h3>
                              <div className="flex flex-wrap gap-2">
                                {caseStudy.technologies.map(tech => (
                                  <Badge key={tech} variant="secondary" className="rounded-none px-3 py-1">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="container px-4 mt-8">
        <div className="bg-primary text-primary-foreground p-12 text-center">
          <h2 className="text-3xl font-heading font-bold uppercase mb-4">{t("projects.cta.title")}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t("projects.cta.desc")}
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold uppercase tracking-widest rounded-none">
            <a href="/contact">{t("projects.cta.btn")}</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
