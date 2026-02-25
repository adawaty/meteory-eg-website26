import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, { en: string; ar: string }> = {
  // Navigation
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "من نحن" },
  "nav.products": { en: "Products", ar: "المنتجات" },
  "nav.projects": { en: "Projects", ar: "المشاريع" },
  "nav.industries": { en: "Industries", ar: "القطاعات" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.resources": { en: "Resources", ar: "الموارد" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.quote": { en: "Get Quote", ar: "طلب عرض سعر" },
  "nav.iso": { en: "ISO 9001:2015 Certified Manufacturer", ar: "حاصلة على شهادة ISO 9001:2015" },

  // Footer
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.desc": { en: "Unrivaled leader in fire safety solutions with over 45 years of manufacturing excellence. Protecting lives and property across Africa and the Middle East.", ar: "رائد لا مثيل له في حلول السلامة من الحرائق مع أكثر من 45 عامًا من التميز في التصنيع. حماية الأرواح والممتلكات في جميع أنحاء أفريقيا والشرق الأوسط." },
  "footer.products": { en: "Products", ar: "المنتجات" },
  "footer.company": { en: "Company", ar: "الشركة" },
  "footer.contact": { en: "Contact", ar: "اتصل بنا" },
  "footer.address": { en: "81 Joseph Tito Street, El Nozha, Cairo, Egypt", ar: "81 شارع جوزيف تيتو، النزهة، القاهرة، مصر" },
  "footer.phone": { en: "Phone:", ar: "تليفون:" },
  "footer.fax": { en: "Fax:", ar: "فاكس:" },
  "footer.email": { en: "Email:", ar: "بريد إلكتروني:" },

  // Home Hero
  "hero.est": { en: "Est. 1979", ar: "تأسست 1979" },
  "hero.title": { en: "The Unrivaled Leader in", ar: "الرائد بلا منازع في" },
  "hero.subtitle": { en: "Fire Safety", ar: "أنظمة إطفاء الحريق" },
  "hero.desc": { en: "Protecting lives and property across industries with precision-engineered firefighting solutions.", ar: "حماية الأرواح والممتلكات في مختلف الصناعات بحلول مكافحة حرائق هندسية دقيقة." },
  "hero.cta.products": { en: "Explore Products", ar: "تصفح المنتجات" },
  "hero.cta.contact": { en: "Contact Us", ar: "اتصل بنا" },

  // Home Stats
  "stats.years": { en: "Years Experience", ar: "سنوات خبرة" },
  "stats.iso": { en: "9001:2015 Certified", ar: "معتمدة 9001:2015" },
  "stats.countries": { en: "Countries Served", ar: "دول نخدمها" },
  "stats.rank": { en: "In Africa", ar: "في أفريقيا" },

  // Home About
  "home.about.title": { en: "Engineered for", ar: "هندسة من أجل" },
  "home.about.highlight": { en: "Survival", ar: "البقاء" },
  "home.about.desc": { en: "Meteory is not just a manufacturer; we are an institution of safety. For over 45 years, we have built a legacy of manufacturing firefighting products with cutting-edge assembly lines.", ar: "Meteory ليست مجرد شركة مصنعة؛ نحن مؤسسة للسلامة. لأكثر من 45 عامًا، قمنا ببناء إرث من تصنيع منتجات مكافحة الحرائق بخطوط تجميع متطورة." },
  "home.about.point1": { en: "Advanced Manufacturing Facility in Egypt", ar: "منشأة تصنيع متقدمة في مصر" },
  "home.about.point2": { en: "Partnership with Global Labs", ar: "شراكة مع مختبرات عالمية" },
  "home.about.point3": { en: "Integrated Fire Safety Solutions", ar: "حلول متكاملة للسلامة من الحرائق" },
  "home.about.cta": { en: "Read Our Story", ar: "اقرأ قصتنا" },

  // Home Technology
  "home.tech.badge": { en: "Our Technology", ar: "تقنياتنا" },
  "home.tech.title": { en: "Advanced", ar: "حلول" },
  "home.tech.highlight": { en: "Suppression & Detection", ar: "إخماد & إنذار" },
  "home.tech.desc": { en: "From clean-agent systems for critical rooms to compliant detection and alarm infrastructure, Meteory engineers end-to-end protection around your risk profile.", ar: "من أنظمة الغازات النظيفة لغرف العمليات الحيوية إلى البنية التحتية المطابقة للإنذار والكشف، تقوم Meteory بهندسة حماية متكاملة وفقاً لطبيعة المخاطر." },

  "home.tech.item.clean.title": { en: "Clean Agent Systems (FM-200 / Novec)", ar: "أنظمة الغازات النظيفة (FM-200 / Novec)" },
  "home.tech.item.clean.desc": { en: "Fast suppression with minimal residue—ideal for data centers, electrical rooms, and control cabinets.", ar: "إخماد سريع دون بقايا تقريباً—مثالي لمراكز البيانات وغرف الكهرباء ولوحات التحكم." },

  "home.tech.item.co2.title": { en: "CO2 Solutions for Electrical Risks", ar: "حلول CO2 لمخاطر الكهرباء" },
  "home.tech.item.co2.desc": { en: "Portable and fixed CO2 options designed to address Class B and electrical fire scenarios.", ar: "خيارات CO2 المحمولة والثابتة لمعالجة حرائق الفئة B ومخاطر الكهرباء." },

  "home.tech.item.foam.title": { en: "Foam & Special Hazards", ar: "الرغوة والمخاطر الخاصة" },
  "home.tech.item.foam.desc": { en: "Foam concentrates and engineered discharge solutions for fuel, aviation, and industrial applications.", ar: "محاليل الرغوة وحلول ضخ/تفريغ مصممة لتطبيقات الوقود والطيران والصناعة." },

  "home.tech.item.mist.title": { en: "Water Spray & Mist Strategies", ar: "استراتيجيات رذاذ/رذاذ ضبابي" },
  "home.tech.item.mist.desc": { en: "Targeted cooling and control using water spray approaches where appropriate for the space and code.", ar: "تبريد وتحكم موضعي باستخدام حلول رذاذ الماء حسب طبيعة المكان ومتطلبات الكود." },

  "home.tech.item.detect.title": { en: "Detection & Alarm Infrastructure", ar: "البنية التحتية للكشف والإنذار" },
  "home.tech.item.detect.desc": { en: "Sensors, panels, and notification design that supports evacuation readiness and compliance workflows.", ar: "حساسات ولوحات إنذار وتصميم تنبيه يدعم جاهزية الإخلاء ومتطلبات الالتزام." },

  "home.tech.item.service.title": { en: "Testing, Maintenance & Documentation", ar: "الاختبار والصيانة والتوثيق" },
  "home.tech.item.service.desc": { en: "Hydrostatic testing, refilling, commissioning, and clear documentation for audits and handover.", ar: "اختبار هيدروستاتيكي وإعادة تعبئة وتشغيل وتسليم مع توثيق واضح للتدقيق والاستلام." },

  // Home Products
  "home.products.title": { en: "Product", ar: "تشكيلة" },
  "home.products.highlight": { en: "Lineup", ar: "المنتجات" },
  "home.products.viewAll": { en: "View All Products", ar: "عرض كل المنتجات" },
  "home.products.viewSpecs": { en: "View Specs", ar: "عرض المواصفات" },

  // Home CTA
  "home.cta.title": { en: "Ready to Secure Your Facility?", ar: "هل أنت مستعد لتأمين منشأتك؟" },
  "home.cta.desc": { en: "Get a custom quote for your residential, commercial, or industrial project today.", ar: "احصل على عرض سعر مخصص لمشروعك السكني أو التجاري أو الصناعي اليوم." },
  "home.cta.button": { en: "Get Free Quote", ar: "احصل على عرض سعر مجاني" },

  // Common
  "common.viewDetails": { en: "View Details", ar: "عرض التفاصيل" },
  "common.download": { en: "Datasheet", ar: "كتالوج البيانات" },
  "common.requestQuote": { en: "Request Quote", ar: "طلب عرض سعر" },
  
  // Projects
  "projects.title": { en: "Proven Excellence", ar: "تميز مثبت" },
  "projects.subtitle": { en: "Showcasing our capabilities in critical infrastructure protection across Energy and Aviation sectors.", ar: "عرض قدراتنا في حماية البنية التحتية الحيوية في قطاعي الطاقة والطيران." },
  "projects.badge": { en: "Portfolio", ar: "معرض الأعمال" },
  "projects.viewCase": { en: "View Case Study", ar: "عرض دراسة الحالة" },
  "projects.challenge": { en: "The Challenge", ar: "التحدي" },
  "projects.solution": { en: "The Solution", ar: "الحل" },
  "projects.result": { en: "The Result", ar: "النتيجة" },
  "projects.tech": { en: "Technologies Used", ar: "التقنيات المستخدمة" },
  "projects.cta.title": { en: "Have a Critical Project?", ar: "لديك مشروع حيوي؟" },
  "projects.cta.desc": { en: "Our engineering team specializes in custom solutions for high-risk industrial applications.", ar: "فريقنا الهندسي متخصص في الحلول المخصصة للتطبيقات الصناعية عالية المخاطر." },
  "projects.cta.btn": { en: "Consult an Engineer", ar: "استشر مهندساً" },

  // Products Page
  "products.catalog": { en: "Product Catalog", ar: "كتالوج المنتجات" },
  "products.desc": { en: "Explore our comprehensive range of certified firefighting equipment designed for maximum reliability.", ar: "استكشف مجموعتنا الشاملة من معدات مكافحة الحرائق المعتمدة المصممة لأقصى درجات الموثوقية." },
  "products.filter.all": { en: "All Products", ar: "كل المنتجات" },
  "products.filter.extinguisher": { en: "Fire Extinguishers", ar: "طفايات الحريق" },
  "products.filter.cabinet": { en: "Fire Cabinets", ar: "صناديق الحريق" },
  "products.filter.system": { en: "Systems", ar: "الأنظمة" },
  "products.features": { en: "Key Features", ar: "الميزات الرئيسية" },
  "products.specs": { en: "Technical Specifications", ar: "المواصفات الفنية" },
  "products.model": { en: "Model", ar: "الموديل" },
  "products.capacity": { en: "Capacity", ar: "السعة" },
  "products.pressure": { en: "Pressure (Work/Test)", ar: "الضغط (عمل/اختبار)" },

  // Services
  "services.title": { en: "Our Services", ar: "خدماتنا" },
  "services.desc": { en: "Beyond manufacturing, we provide lifecycle support for your fire safety infrastructure.", ar: "بالإضافة إلى التصنيع، نقدم دعماً متكاملاً طوال دورة حياة البنية التحتية للسلامة من الحرائق لديك." },
  "services.mfg": { en: "Manufacturing", ar: "التصنيع" },
  "services.mfg.desc": { en: "ISO 9001:2015 certified manufacturing of fire extinguishers (CO2, Powder, Foam) and cabinets using high-grade steel and automated welding lines.", ar: "تصنيع معتمد بشهادة ISO 9001:2015 لطفايات الحريق (ثاني أكسيد الكربون، البودرة، الرغوة) والصناديق باستخدام صلب عالي الجودة وخطوط لحام آلية." },
  "services.maint": { en: "Maintenance & Refilling", ar: "الصيانة وإعادة التعبئة" },
  "services.maint.desc": { en: "Comprehensive maintenance services including hydrostatic testing, refilling, and certification for all types of fire extinguishers.", ar: "خدمات صيانة شاملة تشمل الاختبار الهيدروستاتيكي، إعادة التعبئة، وإصدار الشهادات لجميع أنواع طفايات الحريق." },
  "services.consult": { en: "Consulting & Design", ar: "الاستشارات والتصميم" },
  "services.consult.desc": { en: "Expert fire safety system design for industrial, commercial, and residential facilities in compliance with Egyptian Civil Defense codes.", ar: "تصميم أنظمة سلامة من الحرائق من قبل خبراء للمنشآت الصناعية والتجارية والسكنية وفقاً لأكواد الدفاع المدني المصري." },
  "services.train": { en: "Training", ar: "التدريب" },
  "services.train.desc": { en: "Firefighting training games and educational workshops for staff to ensure rapid and effective response during emergencies.", ar: "ألعاب تدريب على مكافحة الحرائق وورش عمل تعليمية للموظفين لضمان الاستجابة السريعة والفعالة أثناء الطوارئ." },

  // Contact
  "contact.title": { en: "Contact Us", ar: "اتصل بنا" },
  "contact.desc": { en: "Get in touch with our engineering team for sales, maintenance, or technical consultation.", ar: "تواصل مع فريقنا الهندسي للمبيعات، الصيانة، أو الاستشارات الفنية." },
  "contact.form.title": { en: "Send Message", ar: "أرسل رسالة" },
  "contact.name": { en: "Name", ar: "الاسم" },
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.subject": { en: "Subject", ar: "الموضوع" },
  "contact.message": { en: "Message", ar: "الرسالة" },
  "contact.submit": { en: "Send Message", ar: "إرسال الرسالة" },
  "contact.hq": { en: "Headquarters", ar: "المقر الرئيسي" },
  "contact.hours": { en: "Working Hours", ar: "ساعات العمل" },
  "contact.days": { en: "Sunday - Thursday", ar: "الأحد - الخميس" },
  "contact.friday": { en: "Friday", ar: "الجمعة" },
  "contact.closed": { en: "Closed", ar: "مغلق" },
  "contact.saturday": { en: "Saturday", ar: "السبت" },
  "contact.appt": { en: "By Appointment", ar: "بموعد مسبق" },

  // About
  "about.legacy": { en: "Our Legacy", ar: "إرثنا" },
  "about.legacy.desc": { en: "For over 45 years, Meteory has been the backbone of fire safety in Egypt and Africa.", ar: "لأكثر من 45 عاماً، كانت Meteory العمود الفقري للسلامة من الحرائق في مصر وأفريقيا." },
  "about.story.title": { en: "The Meteory Story", ar: "قصة Meteory" },
  "about.story.p1": { en: "Meteory is an Egyptian based manufacturer of firefighting products and an integrated solutions provider with an expertise of 45 years. The company roots go back to the 70s of the 20th century. In 1980, Meteory became a specialized distributor and importer of products from Italy and Germany. By 1986, the company built its factory with state-of-the-art assembly lines to manufacture and market fire extinguishers to cover the increasing demand in the Egyptian Market.", ar: "ميتيوري هي شركة مصرية لتصنيع منتجات مكافحة الحرائق ومزود للحلول المتكاملة بخبرة 45 عامًا. تعود جذور الشركة إلى سبعينيات القرن العشرين. في عام 1980، أصبحت ميتيوري موزعًا ومستوردًا متخصصًا لمنتجات من إيطاليا وألمانيا. وبحلول عام 1986، قامت الشركة ببناء مصنعها بخطوط تجميع حديثة لتصنيع وتسويق طفايات الحريق لتلبية الطلب المتزايد في السوق المصري." },
  "about.story.p2": { en: "Through continuous improvement, Meteory acquired technology and international experience, launching its flagship laboratory with focus on the stringiest quality measures. Today, Meteory is one of the top 3 in the market, ISO 9001:2000 SGS certified, and holds the Egyptian Quality Mark. Our lineup has expanded to cover FOAM, AEROSOL, WATER SPRAY, SPRINKLER, CO2, FM 200, and all types of fire cabinets.", ar: "من خلال التحسين المستمر، اكتسبت ميتيوري التكنولوجيا والخبرة الدولية، وأطلقت مختبرها الرئيسي مع التركيز على أكثر معايير الجودة صرامة. اليوم، تعد ميتيوري واحدة من أكبر 3 شركات في السوق، وحاصلة على شهادة ISO 9001:2000 SGS وعلامة الجودة المصرية. توسعت تشكيلتنا لتشمل الرغوة، الأيروسول، رذاذ الماء، الرشاشات، ثاني أكسيد الكربون، FM 200، وجميع أنواع صناديق الحريق." },
  "about.mission.title": { en: "Our Mission", ar: "مهمتنا" },
  "about.mission.quote": { en: "\"Best Protection is more than just a slogan, it’s a way of life for METEORY. Keeping you safe and your property secure is our business. We build our business for the long term, ensuring environmental sustainability and community support.\"", ar: "\"الحماية الأفضل ليست مجرد شعار، إنها أسلوب حياة لـ METEORY. الحفاظ على سلامتك وتأمين ممتلكاتك هو عملنا. نبني عملنا للمدى الطويل، ونضمن الاستدامة البيئية ودعم المجتمع.\"" },
  "about.partners": { en: "Global Partners", ar: "شركاء عالميون" },
  "about.partners.desc": { en: "We are the sole agent and exclusive distributor for QUÍMICA 21, S.L. (Spain) and Advanced Firefighting Technology GmbH (Germany) in Egypt, Sudan, and East Africa.", ar: "نحن الوكيل الوحيد والموزع الحصري لشركة QUÍMICA 21, S.L. (إسبانيا) و Advanced Firefighting Technology GmbH (ألمانيا) في مصر والسودان وشرق أفريقيا." },
  "about.tech": { en: "Technology", ar: "التكنولوجيا" },
  "about.tech.desc": { en: "From Ultra Fine Water Mist technology to customized foam systems, we bring the world's most advanced suppression technologies to local markets.", ar: "من تقنية رذاذ الماء فائق الدقة إلى أنظمة الرغوة المخصصة، نجلب تقنيات الإخماد الأكثر تقدماً في العالم إلى الأسواق المحلية." },
  
  // Tools
  "nav.calculator": { en: "Safety Calculator", ar: "حاسبة السلامة" },
  "common.print": { en: "Print PDF", ar: "طباعة PDF" },
  "common.back": { en: "Back to Products", ar: "عودة للمنتجات" },

  // Calculator Report
  "calc.report.title": { en: "Fire Safety Assessment Report", ar: "تقرير تقييم السلامة من الحرائق" },
  "calc.report.date": { en: "Date", ar: "التاريخ" },
  "calc.report.preparedFor": { en: "Prepared For", ar: "تم الإعداد لـ" },
  "calc.report.facility": { en: "Facility Details", ar: "تفاصيل المنشأة" },
  "calc.report.results": { en: "Assessment Results", ar: "نتائج التقييم" },
  "calc.report.total": { en: "Total Extinguishers", ar: "إجمالي الطفايات" },
  "calc.report.recType": { en: "Recommended Type", ar: "النوع الموصى به" },
  "calc.export": { en: "Export PDF Report", ar: "تصدير تقرير PDF" },
  
  // Branches
  "branches.title": { en: "Our Locations", ar: "فروعنا" },
  "branches.desc": { en: "Find the nearest Meteory service center for sales and support.", ar: "اعثر على أقرب مركز خدمة لـ Meteory للمبيعات والدعم." },
  "branches.getDirections": { en: "Get Directions", ar: "الحصول على الاتجاهات" },
  "branches.call": { en: "Call", ar: "اتصال" },
  "branches.email": { en: "Email", ar: "بريد إلكتروني" },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [direction, setDirection] = useState<Direction>("ltr");

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    setDirection(dir);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Update fonts based on language
    if (language === "ar") {
      document.body.classList.add("font-arabic");
      document.body.classList.remove("font-sans");
    } else {
      document.body.classList.add("font-sans");
      document.body.classList.remove("font-arabic");
    }
  }, [language]);

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
