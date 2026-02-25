
export interface ProductSpec {
  model: string;
  capacity?: string;
  agent?: string;
  workingPressure?: string;
  testingPressure?: string;
  burstingPressure?: string;
  temperature?: string;
  material?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  category: "extinguisher" | "cabinet" | "system";
  subCategory?: "co2" | "powder" | "foam" | "water" | "cabinet-steel" | "cabinet-stainless";
  description: string;
  descriptionAr?: string;
  image: string;
  specs?: ProductSpec[];
  features?: string[];
  featuresAr?: string[];
  applications?: string[];
}

import co2_6kg from "@/assets/products/Co2-6-12-vk9x.png";
import co2_2kg from "@/assets/products/Co2---2-GUSS.png";
import powder_auto from "@/assets/products/Dry-Powder-Auto-min-coov.png";
import powder_ext from "@/assets/products/Dry-Powder-External-Cartrige-cBM5.jpg";
import powder_trolley from "@/assets/products/Meteory-Trolley-Dry-Chemical-Powder-3WYb.png";
import foam_trolley from "@/assets/products/1-faom-VRvg.png";
import cabinet_single from "@/assets/products/Cabinet-1-min-1muA.png";
import cabinet_double from "@/assets/products/Cabinets-2-min-kiry.png";
import cabinet_stainless from "@/assets/products/Untitled-1-x2cv.png";

export const products: Product[] = [
  // CO2
  {
    id: "co2-portable",
    name: "CO2 Fire Extinguisher (Portable)",
    nameAr: "طفاية ثاني أكسيد الكربون CO2 (محمولة)",

    category: "extinguisher",
    subCategory: "co2",
    description: "Effective for Class B flammable liquids and electrical fires. Clean agent leaves no residue.",
    descriptionAr: "فعّالة لحرائق السوائل القابلة للاشتعال (Class B) والحرائق الكهربائية. عامل إطفاء نظيف بدون بقايا.",

    image: co2_6kg,
    applications: ["Class B (Flammable Liquids)", "Class C (Electrical)", "Class E"],
    features: [
      "Seamless steel cylinder",
      "Brass valve with safety release",
      "Leaves no residue",
      "Electrostatic painted (RAL 3000)",
      "ISO 9001 Certified"
    ],
    featuresAr: [
      "أسطوانة صلب غير ملحومة",
      "صمام نحاس مع صمام أمان",
      "لا يترك أي بقايا",
      "دهان إلكتروستاتيك (RAL 3000)",
      "معتمد ISO 9001",
    ],
    specs: [
      { model: "CO2 2", capacity: "2 kg", workingPressure: "100 bar", burstingPressure: "Min 400 bar" },
      { model: "CO2 3", capacity: "3 kg", workingPressure: "100 bar", burstingPressure: "Min 400 bar" },
      { model: "CO2 6", capacity: "6 kg", workingPressure: "100 bar", burstingPressure: "Min 400 bar" }
    ]
  },
  {
    id: "co2-trolley",
    name: "CO2 Fire Extinguisher (Trolley)",
    nameAr: "طفاية ثاني أكسيد الكربون CO2 (عربة)",

    category: "extinguisher",
    subCategory: "co2",
    description: "High capacity CO2 units for industrial applications.",
    descriptionAr: "وحدات CO2 عالية السعة للتطبيقات الصناعية.",

    image: co2_2kg, // Placeholder, using 2kg image but conceptually similar style
    applications: ["Industrial Facilities", "Power Stations"],
    features: ["Trolley mounted for mobility", "High pressure hose", "Seamless cylinder"],
    featuresAr: ["مثبتة على عربة لسهولة الحركة", "خرطوم ضغط عالي", "أسطوانة غير ملحومة"],
    specs: [
      { model: "CO2 10", capacity: "10 kg", workingPressure: "100 bar" },
      { model: "CO2 45", capacity: "45 kg", workingPressure: "100 bar" }
    ]
  },
  
  // Dry Powder
  {
    id: "powder-stored",
    name: "Dry Powder (Stored Pressure)",
    nameAr: "طفاية بودرة جافة (ضغط مخزن)",

    category: "extinguisher",
    subCategory: "powder",
    description: "Multipurpose ABC dry chemical powder. Effective on most fire types.",
    descriptionAr: "بودرة كيميائية جافة متعددة الاستخدامات (ABC) فعّالة لمعظم أنواع الحرائق.",

    image: powder_auto, // Using auto image as generic powder for now if better one missing
    applications: ["Class A (Solids)", "Class B (Liquids)", "Class C (Gas)"],
    features: [
      "Non-toxic dry chemical powder",
      "Corrosion resistant coating",
      "ISO 9001 Certified",
      "Egyptian Quality Mark"
    ],
    featuresAr: [
      "بودرة كيميائية جافة غير سامة",
      "طلاء مقاوم للتآكل",
      "معتمد ISO 9001",
      "حاصلة على علامة الجودة المصرية",
    ],
    specs: [
      { model: "M1", capacity: "1 kg", agent: "ABC Powder" },
      { model: "M6", capacity: "6 kg", agent: "ABC Powder" },
      { model: "M12", capacity: "12 kg", agent: "ABC Powder" }
    ]
  },
  {
    id: "powder-cartridge",
    name: "Dry Powder (External Cartridge)",
    nameAr: "طفاية بودرة جافة (خرطوش خارجي)",

    category: "extinguisher",
    subCategory: "powder",
    description: "External cartridge operated units for reliable activation in harsh conditions.",
    descriptionAr: "وحدات تعمل بخرطوش خارجي لضمان تشغيل موثوق في الظروف القاسية.",

    image: powder_ext,
    applications: ["Industrial", "Outdoor", "Harsh Environments"],
    specs: [
      { model: "ME 6", capacity: "6 kg" },
      { model: "ME 12", capacity: "12 kg" }
    ]
  },
  {
    id: "powder-automatic",
    name: "Automatic Dry Powder",
    nameAr: "طفاية بودرة جافة أوتوماتيك",

    category: "extinguisher",
    subCategory: "powder",
    description: "Heat-sensitive bulb activation for unmanned protection.",
    descriptionAr: "تشغيل تلقائي بلمبة حساسة للحرارة لحماية الأماكن غير المأهولة.",

    image: powder_auto,
    applications: ["Boiler Rooms", "Server Rooms", "Storage"],
    features: ["Automatic activation at 68°C", "Ceiling mounted"],
    featuresAr: ["تشغيل تلقائي عند 68°C", "تثبيت سقفي"],
    specs: [
      { model: "MAuto 6", capacity: "6 kg" },
      { model: "MAuto 12", capacity: "12 kg" }
    ]
  },
  {
    id: "powder-trolley",
    name: "Trolley Dry Powder",
    nameAr: "طفاية بودرة جافة (عربة)",

    category: "extinguisher",
    subCategory: "powder",
    description: "Mobile large capacity units for high risk areas.",
    descriptionAr: "وحدات متنقلة كبيرة السعة للمناطق عالية الخطورة.",

    image: powder_trolley,
    specs: [
      { model: "MET 30", capacity: "30 kg" },
      { model: "MET 100", capacity: "100 kg" }
    ]
  },

  // Foam
  {
    id: "foam-trolley",
    name: "Foam Fire Extinguisher",
    nameAr: "طفاية رغوة (AFFF)",

    category: "extinguisher",
    subCategory: "foam",
    description: "AFFF Foam for Class B fires. Forms a sealing blanket over fuel.",
    descriptionAr: "رغوة AFFF لحرائق السوائل القابلة للاشتعال (Class B) وتشكل طبقة عازلة فوق الوقود.",

    image: foam_trolley,
    applications: ["Class B (Liquids)", "Refineries", "Garages"],
    features: ["AFFF 1:6%", "Corrosion resistant internal coating"],
    featuresAr: ["رغوة AFFF بنسبة 1:6%", "طلاء داخلي مقاوم للتآكل"],
    specs: [
      { model: "F 50", capacity: "50 Liters" },
      { model: "F 100", capacity: "100 Liters" }
    ]
  },

  // Cabinets
  {
    id: "cabinet-single",
    name: "Single Fire Cabinet",
    nameAr: "دولاب حريق مفرد",

    category: "cabinet",
    subCategory: "cabinet-steel",
    description: "Steel fire hose cabinet with glass door.",
    descriptionAr: "دولاب خرطوم حريق من الصاج مع باب زجاجي.",

    image: cabinet_single,
    features: ["Electrostatic powder coating", "1.2mm steel sheet", "Universal mounting"],
    featuresAr: ["دهان بودرة إلكتروستاتيك", "صاج 1.2 مم", "قفل ومقبض قوي"]
  },
  {
    id: "cabinet-double",
    name: "Double Fire Cabinet",
    nameAr: "دولاب حريق مزدوج",

    category: "cabinet",
    subCategory: "cabinet-steel",
    description: "Vertical or horizontal double cabinet for hose and extinguisher.",
    descriptionAr: "دولاب مزدوج رأسي أو أفقي للخرطوم وطفاية الحريق.",

    image: cabinet_double,
    features: ["Separate compartment for extinguisher", "High visibility"],
    featuresAr: ["سعة لطفايتين", "هيكل صاج متين", "دهان إلكتروستاتيك"]
  },
  {
    id: "cabinet-stainless",
    name: "Stainless Steel Cabinet",
    nameAr: "دولاب حريق ستانلس ستيل",

    category: "cabinet",
    subCategory: "cabinet-stainless",
    description: "Premium stainless steel finish for architectural applications.",
    descriptionAr: "تشطيب ستانلس ستيل ممتاز للتطبيقات المعمارية.",

    image: cabinet_stainless,
    features: ["304/316 Stainless Steel", "Corrosion resistant", "Modern aesthetic"],
    featuresAr: ["ستانلس ستيل 304/316", "مقاوم للتآكل", "مناسب للبيئات الساحلية"]
  },

  // Systems
  {
    id: "system-co2",
    name: "CO2 Flooding System",
    nameAr: "نظام إطفاء بغاز CO2 (إغراق كلي)",

    category: "system",
    description: "Engineered total flooding systems for enclosed hazards.",
    descriptionAr: "أنظمة إغراق كلي مُهندسة لحماية المخاطر داخل الأماكن المغلقة.",

    image: co2_2kg, // Reusing CO2 image as placeholder for system cylinders
    applications: ["Server Rooms", "Engine Rooms", "Archives"],
    features: ["Automatic detection", "Manual release", "Audible/Visual alarms"],
    featuresAr: ["كشف تلقائي", "إطلاق يدوي/تلقائي", "إنذارات صوتية/ضوئية"],
    specs: [
      { model: "M-SYS-CO2", capacity: "Custom", workingPressure: "150 bar" }
    ]
  },
  {
    id: "system-kitchen",
    name: "Kitchen Suppression System",
    nameAr: "نظام إطفاء المطابخ (كيماوي رطب)",

    category: "system",
    description: "Wet chemical system for commercial kitchen hoods.",
    descriptionAr: "نظام كيماوي رطب لشفاطات المطابخ التجارية.",

    image: cabinet_single, // Placeholder
    applications: ["Restaurants", "Hotels", "Industrial Kitchens"],
    features: ["Fast acting", "Cooling effect", "UL Listed Agents"],
    featuresAr: ["مصمم لمطابخ المطاعم", "إخماد سريع مع تأثير تبريد", "يتوافق مع أنظمة الشفاطات"]
  },
  {
    id: "system-fm200",
    name: "FM 200 Suppression System",
    nameAr: "نظام إطفاء FM-200",

    category: "system",
    description: "Waterless fire suppression system that protects high-value assets without residue.",
    descriptionAr: "نظام إطفاء بدون ماء يحمي الأصول عالية القيمة بدون بقايا.",

    image: co2_2kg, // Placeholder
    applications: ["Data Centers", "Telecommunications", "Museums"],
    features: ["Clean agent", "Safe for occupied spaces", "Rapid extinguishment"],
    featuresAr: ["عامل نظيف (لا يترك بقايا)", "آمن للأماكن المأهولة", "زمن إخماد سريع"]
  },
  {
    id: "system-aerosol",
    name: "Condensed Aerosol System",
    nameAr: "نظام إطفاء أيروسول مكثّف",

    category: "system",
    description: "Compact and cost-effective extinguishing solution for enclosed spaces.",
    descriptionAr: "حل إطفاء مدمج وموفر للمساحات المغلقة.",

    image: powder_ext, // Placeholder
    applications: ["Electrical Panels", "Engine Compartments", "Storage"],
    features: ["No piping required", "Long service life", "Eco-friendly"],
    featuresAr: ["بدون شبكة مواسير معقدة", "صديق للبيئة", "صيانة منخفضة"]
  },
  {
    id: "system-water-spray",
    name: "Water Spray System",
    nameAr: "نظام رش مياه (Water Spray)",

    category: "system",
    description: "High velocity water spray for cooling and fire control.",
    descriptionAr: "رش مياه عالي السرعة للتبريد والتحكم في الحريق.",

    image: foam_trolley, // Placeholder
    applications: ["Transformers", "Oil Tanks", "Conveyors"],
    features: ["Deluge valve operation", "High cooling capacity"],
    featuresAr: ["تشغيل بصمام ديلوج", "تبريد وحماية المعدات", "مناسب لمناطق الوقود والمحولات"]
  },
  {
    id: "system-sprinkler",
    name: "Fire Sprinkler System",
    nameAr: "نظام رشاشات الحريق (Sprinkler)",

    category: "system",
    description: "Automatic water-based protection for building-wide coverage.",
    descriptionAr: "حماية تلقائية بالماء لتغطية المباني بالكامل.",

    image: cabinet_single, // Placeholder
    applications: ["Commercial Buildings", "Warehouses", "Offices"],
    features: ["Heat activation", "24/7 protection", "Standard compliance"],
    featuresAr: ["تنشيط حراري تلقائي", "حماية مستمرة 24/7", "مطابقة NFPA واشتراطات الدفاع المدني"]
  }
];
