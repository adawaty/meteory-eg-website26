import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { BRANCHES } from "@/data/company";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "sonner";
import { saveLead } from "@/lib/db";

export default function Contact() {
  const { t, language } = useLanguage();

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error(language === "ar" ? "يرجى إدخال الاسم والبريد والرسالة" : "Please enter name, email, and message");
      return;
    }

    setSaving(true);
    const res = await saveLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      app_name: "Contact Form",
      data: {
        subject: form.subject,
        message: form.message,
        source: "contact",
      },
    });
    setSaving(false);

    if (res.success) {
      toast.success(language === "ar" ? "تم إرسال رسالتك ✅" : "Message sent ✅");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } else {
      toast.error(language === "ar" ? "تعذر إرسال الرسالة. حاول مرة أخرى." : "Could not send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary py-16 border-b border-border">
        <div className="container px-4">
          <h1 className="text-5xl font-heading font-bold uppercase mb-4">{t("contact.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {t("contact.desc")}
          </p>
        </div>
      </div>

      <div className="container px-4 py-16 grid lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-white p-8 border border-border shadow-sm">
          <h2 className="text-2xl font-heading font-bold uppercase mb-6">{t("contact.form.title")}</h2>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide">{t("contact.name")}</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder={t("contact.name")}
                  className="rounded-none border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide">{t("contact.email")}</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder={t("contact.email")}
                  className="rounded-none border-border focus:border-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wide">{t("contact.subject")}</label>
              <Input
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                placeholder={t("contact.subject")}
                className="rounded-none border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wide">{t("contact.message")}</label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder={t("contact.message")}
                className="min-h-[150px] rounded-none border-border focus:border-primary"
              />
            </div>
            <div className="grid gap-3">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide">{language === "ar" ? "الهاتف (اختياري)" : "Phone (optional)"}</label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder={language === "ar" ? "+20 ..." : "+20 ..."}
                  className="rounded-none border-border focus:border-primary"
                  dir="ltr"
                />
              </div>

              <Button
                disabled={saving}
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest rounded-none h-14"
              >
                {saving ? (language === "ar" ? "جارٍ الإرسال..." : "Sending...") : t("contact.submit")}
              </Button>
            </div>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-12">
          {/* Embedded Map */}
          <div className="w-full h-64 bg-muted rounded-lg overflow-hidden border border-border">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.388713564778!2d31.3546763!3d30.1117555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815dcc3e4e599%3A0x6e263a8767850239!2s81%20Joseph%20Tito%20St%2C%20El-Nozha%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1676212345678!5m2!1sen!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Meteory HQ Map"
            ></iframe>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
               <div className="bg-primary/10 p-3">
                 <MapPin className="h-6 w-6 text-primary" />
               </div>
               <div>
                 <h3 className="text-lg font-bold uppercase mb-2">{t("contact.hq")}</h3>
                 <p className="text-muted-foreground leading-relaxed">
                   {t("footer.address")}
                 </p>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="bg-primary/10 p-3">
                 <Phone className="h-6 w-6 text-primary" />
               </div>
               <div>
                 <h3 className="text-lg font-bold uppercase mb-2">{t("footer.phone").replace(":","")}</h3>
                 <p className="text-muted-foreground" dir="ltr">+20 120 117 0010</p>
                 <p className="text-muted-foreground" dir="ltr">+20 2 2620 0068</p>
                 <p className="text-muted-foreground" dir="ltr">+20 2 2620 0069</p>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="bg-primary/10 p-3">
                 <Mail className="h-6 w-6 text-primary" />
               </div>
               <div>
                 <h3 className="text-lg font-bold uppercase mb-2">{t("footer.email").replace(":","")}</h3>
                 <p className="text-muted-foreground">info@meteory-eg.com</p>
                 <p className="text-muted-foreground">sales@meteory-eg.com</p>
               </div>
            </div>
          </div>

          <div className="bg-foreground text-background p-8">
            <h3 className="text-xl font-heading font-bold uppercase mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary rtl:ml-2 rtl:mr-0" /> {t("contact.hours")}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>{t("contact.days")}</span>
                <span dir="ltr">09:00 AM - 05:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>{t("contact.friday")}</span>
                <span className="text-primary">{t("contact.closed")}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>{t("contact.saturday")}</span>
                <span>{t("contact.appt")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Branches Section */}
      <div className="bg-muted/30 py-24 border-t border-border">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold uppercase mb-4">{t("branches.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("branches.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BRANCHES.map((branch, idx) => (
              <Card key={idx} className="group border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-white border-b border-border pb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-heading font-bold text-xl uppercase text-foreground group-hover:text-primary transition-colors">
                      {language === "ar" ? branch.cityAr : branch.city}
                    </h3>
                    <div className="bg-secondary p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                      <MapPin className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4 bg-white">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {language === "ar" ? branch.addressAr : branch.address}
                    </p>
                  </div>
                  
                  <div className="h-px bg-border my-2" />
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                    <a href={`tel:${branch.phone}`} className="text-foreground font-bold hover:text-primary transition-colors" dir="ltr">
                      {branch.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                    <a href={`mailto:${branch.email}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {branch.email}
                    </a>
                  </div>

                  <Button 
                    className="w-full mt-4 bg-foreground hover:bg-primary text-background font-bold uppercase rounded-none transition-colors gap-2"
                    onClick={() => window.open(branch.mapLink, '_blank')}
                  >
                    <Navigation className="h-4 w-4" /> {t("branches.getDirections")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
