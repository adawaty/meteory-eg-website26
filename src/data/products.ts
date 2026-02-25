
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
  /** Local PDF (imported) or external URL */
  datasheet?: string;
  /** Simple key/value specification table (for cabinets, etc.) */
  specTable?: Record<string, string>;
  specTableAr?: Record<string, string>;
  specs?: ProductSpec[];

  features?: string[];
  featuresAr?: string[];
  applications?: string[];
}

import co2_portable from "@/assets/generated/products/co2-portable.jpg";
import co2_trolley from "@/assets/generated/products/co2-trolley.jpg";
import powder_stored from "@/assets/generated/products/powder-stored.jpg";
import powder_cartridge from "@/assets/generated/products/powder-cartridge.jpg";
import powder_automatic from "@/assets/generated/products/powder-automatic.jpg";
import powder_trolley from "@/assets/generated/products/powder-trolley.jpg";
import foam_trolley from "@/assets/generated/products/foam-trolley.jpg";
import cabinet_single from "@/assets/generated/products/cabinet-single.jpg";
import cabinet_double from "@/assets/generated/products/cabinet-double.jpg";
import cabinet_stainless from "@/assets/generated/products/cabinet-stainless.jpg";

import system_co2 from "@/assets/generated/products/system-co2.jpg";
import system_kitchen from "@/assets/generated/products/system-kitchen.jpg";
import system_fm200 from "@/assets/generated/products/system-fm200.jpg";
import system_aerosol from "@/assets/generated/products/system-aerosol.jpg";
import system_water_spray from "@/assets/generated/products/system-water-spray.jpg";
import system_sprinkler from "@/assets/generated/products/system-sprinkler.jpg";

// Datasheets (from Notion)
import ds_cabinets_overview from "@/assets/datasheets/Cabinets.pdf";
import ds_cabinet_single from "@/assets/datasheets/Meteory_Single_Fire_Cabinet.pdf";
import ds_cabinet_double from "@/assets/datasheets/Meteory_Double_Fire_Cabinet.pdf";
import ds_cabinet_stainless_single from "@/assets/datasheets/Meteory_Stainless_Steel_Single_Fire_Cabinet.pdf";
import ds_cabinet_stainless_double from "@/assets/datasheets/Meteory_Stainless_Steel_Double_Fire_Cabinet.pdf";
import ds_cabinet_horizontal from "@/assets/datasheets/Meteory_Horizontal_Fire_Cabinet.pdf";
import ds_attachments from "@/assets/datasheets/Attachments.pdf";

import ds_co2 from "@/assets/datasheets/Co2.pdf";
import ds_co2_fire_sense from "@/assets/datasheets/Meteory_Co2_Fire_Sense.pdf";

import ds_powder_stored from "@/assets/datasheets/Dry_Powder_Stored_Pressure.pdf";
import ds_powder_automatic from "@/assets/datasheets/Dry_Powder_Automatic.pdf";
import ds_powder_fire_sense from "@/assets/datasheets/Meteory_Dry_Powder_Fire_Sense.pdf";
import ds_powder_cartridge from "@/assets/datasheets/Dry_Powder_External_Cartrige.pdf";
import ds_powder_trolley from "@/assets/datasheets/Dry_Powder_Trolley_External_Cartidge.pdf";

import ds_foam_100 from "@/assets/datasheets/Foam_100_Liter.pdf";

import ds_company_profile from "@/assets/datasheets/Meteory_Company_profile.pdf";

// Notion product photos (real)
import photo_co2 from "@/assets/notion/products/Co2.jpg";
import photo_co2_fire_sense from "@/assets/notion/products/Co2_Fire_Sence.jpg";
import photo_powder_stored from "@/assets/notion/products/Dry_Powder_Stored_Pressure.jpg";
import photo_powder_automatic from "@/assets/notion/products/Dry_Powder_Auto.png";
import photo_powder_fire_sense from "@/assets/notion/products/Meteory_Dry_Powder_Fire_Sense.png";
import photo_powder_cartridge from "@/assets/notion/products/Dry_Powder_External_Cartrige.jpg";
import photo_powder_trolley from "@/assets/notion/products/Meteory_Trolley_Dry_Chemical_Powder.png";
import photo_foam from "@/assets/notion/products/Foam.jpg";
import photo_cabinet_single from "@/assets/notion/products/Cabinet_1-min.png";
import photo_cabinet_stainless_single from "@/assets/notion/products/Cabinets_2-min.png";
import photo_cabinet_double from "@/assets/notion/products/Cabinets_3-min.png";

export const productsRaw: Product[] = [
  // CO2
  {
    id: "co2-portable",
    name: "CO2 Fire Extinguisher (Portable)",
    nameAr: "طفاية ثاني أكسيد الكربون CO2 (محمولة)",

    category: "extinguisher",
    subCategory: "co2",
    description: "Effective for Class B flammable liquids and electrical fires. Clean agent leaves no residue.",
    descriptionAr: "فعّالة لحرائق السوائل القابلة للاشتعال (Class B) والحرائق الكهربائية. عامل إطفاء نظيف بدون بقايا.",

    image: photo_co2,
    datasheet: ds_co2,
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

    image: photo_co2,
    datasheet: ds_co2,
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

    image: photo_powder_stored,
    datasheet: ds_powder_stored,
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

    image: photo_powder_cartridge,
    datasheet: ds_powder_cartridge,
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

    image: photo_powder_automatic,
    datasheet: ds_powder_automatic,
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

    image: photo_powder_trolley,
    datasheet: ds_powder_trolley,
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

    image: photo_foam,
    datasheet: ds_foam_100,
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

    image: photo_cabinet_single,
    datasheet: ds_cabinet_single,
    specTable: {
      "Cabinet Type": "Standard",
      "Cabinet Dimensions (WxHxD) cm": "80 × 80 × 30 (or custom)",
      "Cabinet Material": "Steel (DIN EN 10130 / ES 1110)",
      "Opening Door": "Up to 180° (right standard / left option)",
      "Cabinet Steel Thickness": "1.5 mm (or custom)",
      "Door Hinges": "Corrosion-resistant snap-in hinges",
      "Cabinet Paint Finish": "Electrostatic Painted, RAL3000"
    },
    features: ["Electrostatic powder coating", "High-quality steel", "Door swing up to 180°"],
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

    image: photo_cabinet_double,
    datasheet: ds_cabinet_double,
    specTable: {
      "Cabinet Type": "Standard",
      "Cabinet Dimensions (WxHxD) cm": "160 × 80 × 30 (or custom)",
      "Cabinet Material": "Steel (DIN EN 10130 / ES 1110)",
      "Opening Door": "Up to 180° (right standard / left option)",
      "Cabinet Steel Thickness": "1.5 mm (or custom)",
      "Door Hinges": "Corrosion-resistant snap-in hinges",
      "Cabinet Paint Finish": "Electrostatic Painted, RAL3000"
    },
    features: ["BSEN671-1 aligned design", "Two inlet holes (upper & lower)", "Door swing up to 180°"],
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

    image: photo_cabinet_stainless_single,
    datasheet: ds_cabinet_stainless_single,
    specTable: {
      "Cabinet Type": "Standard",
      "Cabinet Dimensions (WxHxD) cm": "80 × 80 × 30 (or custom)",
      "Cabinet Material": "Stainless Steel 304 (DIN EN 10130)",
      "Opening Door": "Up to 180° (right standard / left option)",
      "Cabinet Steel Thickness": "1.2 mm (or custom)",
      "Door Hinges": "Corrosion-resistant snap-in hinges"
    },
    features: ["Stainless steel fabrication", "Door swing up to 180°", "Architectural-grade finish"],
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

    image: system_co2,
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

    image: system_kitchen,
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

    image: system_fm200,
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

    image: system_aerosol,
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

    image: system_water_spray,
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

    image: system_sprinkler,
    applications: ["Commercial Buildings", "Warehouses", "Offices"],
    features: ["Heat activation", "24/7 protection", "Standard compliance"],
    featuresAr: ["تنشيط حراري تلقائي", "حماية مستمرة 24/7", "مطابقة NFPA واشتراطات الدفاع المدني"]
  }
];


// Defensive de-duplication (in case data is merged twice in a future import step)
export const products: Product[] = Array.from(new Map(productsRaw.map((p) => [p.id, p])).values());
