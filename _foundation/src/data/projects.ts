// Data for Projects with detailed case studies
// Images are reused from previous assets but with expanded metadata

import energyPlant from "@/assets/portfolio/energy-plant.jpeg";
import energyCylinders from "@/assets/portfolio/energy-cylinders.jpeg";
import energyTransformer from "@/assets/portfolio/energy-transformer.jpeg";
import aviationFoam1 from "@/assets/portfolio/aviation-foam-1.jpeg";
import aviationFoam2 from "@/assets/portfolio/aviation-foam-2.jpeg";
import aviationFoam3 from "@/assets/portfolio/aviation-foam-3.jpeg";

export interface CaseStudy {
  challenge: string;
  solution: string;
  result: string;
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  titleAr?: string;
  client?: string;
  clientAr?: string;
  category: "Energy" | "Aviation" | "Industrial";
  location: string;
  locationAr?: string;
  year: string;
  description: string;
  descriptionAr?: string;
  image: string;
  tags: string[];
  caseStudy: CaseStudy;
  caseStudyAr?: CaseStudy;
}

export const projects: Project[] = [
  {
    id: "power-plant-suppression",
    title: "El-Burullus Power Plant",
    titleAr: "محطة كهرباء البرلس",
    client: "Siemens / Orascom Construction",
    category: "Energy",
    location: "Kafr El Sheikh, Egypt",
    locationAr: "كفر الشيخ، مصر",
    year: "2018",
    description: "Design and installation of high-pressure CO2 systems for turbine enclosures and transformer protection in one of the world's largest combined-cycle power plants.",
    descriptionAr: "تصميم وتركيب أنظمة ثاني أكسيد الكربون عالية الضغط لحماية التوربينات والمحولات في واحدة من أكبر محطات الدورة المركبة في العالم.",
    image: energyPlant,
    tags: ["CO2 Systems", "Transformer Protection", "Power Generation"],
    caseStudy: {
      challenge: "Protecting 12 gas turbines and critical electrical infrastructure in a high-temperature, high-vibration coastal environment where saltwater corrosion is a constant threat.",
      solution: "Implemented a redundant High-Pressure CO2 system using seamless steel cylinders with marine-grade electrostatic coating (RAL 3000). The system features zoned release valves and integrated heat detection to ensure rapid suppression without thermal shock to the turbines.",
      result: "Achieved 100% successful commissioning tests with discharge times under 60 seconds. The installation passed all Civil Defense and NFPA 12 compliance checks, securing continuous power generation for 4.8 GW capacity.",
      technologies: ["High-Pressure CO2", "Heat Detection", "Zoned Release Control"]
    },
    caseStudyAr: {
      challenge: "حماية 12 توربين غازي وبنية تحتية كهربائية حيوية في بيئة ساحلية ذات درجات حرارة عالية واهتزازات مستمرة حيث يشكل تآكل المياه المالحة تهديداً دائماً.",
      solution: "تنفيذ نظام ثاني أكسيد الكربون عالي الضغط الزائد باستخدام أسطوانات فولاذية غير ملحومة مع طلاء إلكتروستاتيكي مقاوم للبيئة البحرية (RAL 3000). يتميز النظام بصمامات إطلاق مخصصة لكل منطقة وكشف حراري متكامل لضمان الإخماد السريع دون صدمة حرارية للتوربينات.",
      result: "تحقيق نجاح بنسبة 100٪ في اختبارات التشغيل مع أوقات تفريغ أقل من 60 ثانية. اجتاز التثبيت جميع فحوصات الدفاع المدني وامتثال NFPA 12، مما يضمن توليد طاقة مستمر لسعة 4.8 جيجاوات.",
      technologies: ["ثاني أكسيد الكربون عالي الضغط", "الكشف الحراري", "تحكم الإطلاق المخصص"]
    }
  },
  {
    id: "airport-hangar-cairo",
    title: "Cairo Int'l Airport Hangar 3",
    titleAr: "مطار القاهرة الدولي - هنجر 3",
    client: "Cairo Airport Company",
    category: "Aviation",
    location: "Cairo, Egypt",
    locationAr: "القاهرة، مصر",
    year: "2020",
    description: "Comprehensive high-expansion foam system for wide-body aircraft maintenance hangar. Capable of filling the hangar to 1.5m depth in 2 minutes.",
    descriptionAr: "نظام رغوة عالي التمدد شامل لهنجر صيانة الطائرات عريضة البدن. قادر على ملء الهنجر بعمق 1.5 متر في دقيقتين.",
    image: aviationFoam1,
    tags: ["High Expansion Foam", "Deluge System", "Aircraft Safety"],
    caseStudy: {
      challenge: "Providing fire suppression for a 15,000 sqm hangar housing Boeing 777 and Airbus A330 aircraft. The challenge was to cover the immense volume and shadow areas under aircraft wings where fuel spills might ignite.",
      solution: "Installed a grid of ceiling-mounted High-Expansion Foam Generators fed by a central pumping station. The system utilizes Meteory's AFFF 3% foam concentrate, designed to expand 500:1, blanketing the entire floor area rapidly to starve oxygen from potential fuel fires.",
      result: "Full-scale discharge test demonstrated complete floor coverage within 1.8 minutes, exceeding NFPA 409 requirements. The system provides failsafe protection for assets valued over $500 million.",
      technologies: ["High-Expansion Foam Generators", "AFFF Concentrate", "Optical Flame Detectors"]
    },
    caseStudyAr: {
      challenge: "توفير نظام إخماد حرائق لهنجر مساحته 15,000 متر مربع يضم طائرات بوينج 777 وإيرباص A330. كان التحدي هو تغطية الحجم الهائل والمناطق المظللة تحت أجنحة الطائرات حيث قد تشتعل تسربات الوقود.",
      solution: "تركيب شبكة من مولدات الرغوة عالية التمدد المثبتة في السقف والمغذية بواسطة محطة ضخ مركزية. يستخدم النظام مركز رغوة AFFF 3% من Meteory، المصمم للتمدد بنسبة 500:1، ليغطي مساحة الأرضية بالكامل بسرعة لحجب الأكسجين عن حرائق الوقود المحتملة.",
      result: "أظهر اختبار التفريغ الكامل تغطية شاملة للأرضية في غضون 1.8 دقيقة، متجاوزاً متطلبات NFPA 409. يوفر النظام حماية آمنة للأصول التي تزيد قيمتها عن 500 مليون دولار.",
      technologies: ["مولدات رغوة عالية التمدد", "مركز AFFF", "كاشفات اللهب البصرية"]
    }
  },
  {
    id: "transformer-substation",
    title: "New Capital Substation",
    titleAr: "محطة محولات العاصمة الإدارية",
    client: "Egyptian Electricity Transmission Co.",
    category: "Energy",
    location: "New Administrative Capital",
    locationAr: "العاصمة الإدارية الجديدة",
    year: "2022",
    description: "Automatic water spray system for 500kV transformers ensuring rapid cooling and suppression.",
    descriptionAr: "نظام رش مياه أوتوماتيكي لمحولات 500 كيلو فولت لضمان التبريد والإخماد السريع.",
    image: energyTransformer,
    tags: ["Water Spray", "High Voltage", "Infrastructure"],
    caseStudy: {
      challenge: "Protecting strategic 500kV oil-filled transformers in a high-density urban infrastructure project. The risk of oil explosions and cascaded failure required an immediate response system.",
      solution: "Designed a Deluge Water Spray System utilizing galvanized steel piping rings surrounding each transformer. High-velocity nozzles are strategically aimed to cool the transformer tank and extinguish oil fires simultaneously. Activated by linear heat detection cables.",
      result: "System successfully effectively isolates fire risks, preventing catastrophic damage to the grid backbone. Commissioned ahead of schedule to support the New Capital's inauguration.",
      technologies: ["Deluge Valve Sets", "High Velocity Nozzles", "Linear Heat Detection"]
    },
    caseStudyAr: {
      challenge: "حماية محولات مملوءة بالزيت استراتيجية بجهد 500 كيلو فولت في مشروع بنية تحتية حضرية عالي الكثافة. تطلب خطر انفجارات الزيت والفشل المتسلسل نظام استجابة فورية.",
      solution: "تصميم نظام رش مياه غامر باستخدام حلقات أنابيب من الفولاذ المجلفن تحيط بكل محول. يتم توجيه فوهات عالية السرعة بشكل استراتيجي لتبريد خزان المحول وإخماد حرائق الزيت في آن واحد. يتم التفعيل بواسطة كابلات الكشف الحراري الخطي.",
      result: "نجح النظام في عزل مخاطر الحريق بفعالية، مما يمنع الأضرار الكارثية للشبكة الرئيسية. تم التشغيل قبل الموعد المحدد لدعم افتتاح العاصمة الجديدة.",
      technologies: ["مجموعات صمامات الغمر", "فوهات عالية السرعة", "الكشف الحراري الخطي"]
    }
  },
  {
    id: "aviation-maintenance-alex",
    title: "Borg El Arab Maintenance Facility",
    titleAr: "مركز صيانة برج العرب",
    client: "EgyptAir Maintenance",
    category: "Aviation",
    location: "Alexandria, Egypt",
    locationAr: "الإسكندرية، مصر",
    year: "2019",
    description: "Integrated fire detection and foam suppression for regional aircraft hangar.",
    descriptionAr: "نظام متكامل للكشف عن الحرائق وإخمادها بالرغوة لهنجر الطائرات الإقليمية.",
    image: aviationFoam2,
    tags: ["Foam Monitors", "Detection", "Maintenance Hub"],
    caseStudy: {
      challenge: "Retrofitting a modern fire safety system into an active maintenance facility without disrupting daily operations. The system needed to differentiate between welding work (hot work) and actual fire hazards.",
      solution: "Implemented a dual-action system: Intelligent UV/IR flame detectors to minimize false alarms from welding, coupled with Oscillating Foam Monitors for targeted suppression. The system integrates with the building management system (BMS) for centralized monitoring.",
      result: "Zero false alarms recorded in the first two years of operation. The facility maintained 100% operational uptime during installation, meeting tight deadlines.",
      technologies: ["Oscillating Foam Monitors", "UV/IR Flame Detectors", "BMS Integration"]
    },
    caseStudyAr: {
      challenge: "تحديث نظام السلامة من الحرائق في منشأة صيانة نشطة دون تعطيل العمليات اليومية. كان النظام بحاجة للتمييز بين أعمال اللحام (الأعمال الساخنة) ومخاطر الحريق الحقيقية.",
      solution: "تنفيذ نظام مزدوج العمل: كاشفات لهب ذكية UV/IR لتقليل الإنذارات الكاذبة من اللحام، مقترنة بمراقب رغوة متذبذبة للإخماد المستهدف. يتكامل النظام مع نظام إدارة المبنى (BMS) للمراقبة المركزية.",
      result: "لم يتم تسجيل أي إنذارات كاذبة في العامين الأولين من التشغيل. حافظت المنشأة على وقت تشغيل بنسبة 100٪ أثناء التركيب، وتلبية المواعيد النهائية الضيقة.",
      technologies: ["مراقب رغوة متذبذبة", "كاشفات لهب UV/IR", "تكامل BMS"]
    }
  },
  {
    id: "gas-cylinder-storage",
    title: "Industrial Gas Storage Complex",
    titleAr: "مجمع تخزين الغازات الصناعية",
    client: "Air Liquide Egypt",
    category: "Energy",
    location: "Ain Sokhna",
    locationAr: "العين السخنة",
    year: "2021",
    description: "Inert gas suppression system protecting critical control rooms and gas cylinder storage areas.",
    descriptionAr: "نظام إخماد بالغاز الخامل لحماية غرف التحكم الحيوية ومناطق تخزين أسطوانات الغاز.",
    image: energyCylinders,
    tags: ["Inert Gas", "Control Room", "Safety Critical"],
    caseStudy: {
      challenge: "Safeguarding highly sensitive electrical control rooms and volatile gas storage zones where water or conductive agents would be disastrous. Human safety was a priority as staff are present 24/7.",
      solution: "Deployed an IG-541 (Inert Gas) system. This mix of nitrogen, argon, and CO2 extinguishes fire by lowering oxygen levels to combustion-suppressing limits while remaining breathable for personnel. Zero residue, non-conductive, and eco-friendly.",
      result: "Achieved 'Green' safety certification. The system successfully suppressed a minor electrical fault incident in 2022 with no equipment damage or downtime.",
      technologies: ["IG-541 Inert Gas", "Smoke Sampling System", "Pressure Relief Dampers"]
    },
    caseStudyAr: {
      challenge: "حماية غرف التحكم الكهربائية الحساسة للغاية ومناطق تخزين الغاز المتطاير حيث سيكون الماء أو المواد الموصلة كارثياً. كانت سلامة البشر أولوية حيث يتواجد الموظفون على مدار الساعة طوال أيام الأسبوع.",
      solution: "نشر نظام IG-541 (غاز خامل). هذا المزيج من النيتروجين والأرجون وثاني أكسيد الكربون يطفئ الحريق عن طريق خفض مستويات الأكسجين إلى حدود قمع الاحتراق مع البقاء قابلاً للتنفس للموظفين. بدون بقايا، غير موصل، وصديق للبيئة.",
      result: "الحصول على شهادة السلامة 'الخضراء'. نجح النظام في إخماد حادث عطل كهربائي طفيف في عام 2022 دون أي تلف في المعدات أو توقف عن العمل.",
      technologies: ["غاز خامل IG-541", "نظام عينات الدخان", "مخمدات تخفيف الضغط"]
    }
  },
  {
    id: "military-hangar",
    title: "Strategic Airbase Hangar",
    titleAr: "هنجر القاعدة الجوية الاستراتيجية",
    client: "Ministry of Defense",
    category: "Aviation",
    location: "Restricted",
    locationAr: "منطقة مقيدة",
    year: "2023",
    description: "State-of-the-art foam deluge system for strategic defense assets.",
    descriptionAr: "نظام غمر بالرغوة حديث لأصول الدفاع الاستراتيجية.",
    image: aviationFoam3,
    tags: ["Defense", "Foam Deluge", "High Security"],
    caseStudy: {
      challenge: "Securing high-value defense aircraft in a fortified hangar. Requirements included extremely fast response times and fail-safe activation mechanisms under combat-readiness conditions.",
      solution: "Engineered a redundant Foam Deluge System with triple-activation logic (UV/IR, heat, manual). The system uses underground foam concentrate storage tanks for maximum blast protection and quick-opening deluge valves for instant suppression.",
      result: "Passed rigorous military acceptance tests. The system is integrated into the base's central command structure, providing top-tier readiness and asset protection.",
      technologies: ["Quick-Opening Deluge Valves", "Underground Storage", "Triple-Check Activation"]
    },
    caseStudyAr: {
      challenge: "تأمين طائرات دفاعية عالية القيمة في هنجر محصن. تضمنت المتطلبات أوقات استجابة سريعة للغاية وآليات تفعيل آمنة من الفشل في ظل ظروف الاستعداد القتالي.",
      solution: "هندسة نظام غمر بالرغوة فائض مع منطق تفعيل ثلاثي (UV/IR، حرارة، يدوي). يستخدم النظام خزانات تخزين مركز الرغوة تحت الأرض لأقصى حماية من الانفجارات وصمامات غمر سريعة الفتح للإخماد الفوري.",
      result: "اجتاز اختبارات القبول العسكرية الصارمة. تم دمج النظام في هيكل القيادة المركزي للقاعدة، مما يوفر جاهزية من الدرجة الأولى وحماية للأصول.",
      technologies: ["صمامات غمر سريعة الفتح", "تخزين تحت الأرض", "تفعيل ثلاثي الفحص"]
    }
  }
];
