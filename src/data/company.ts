import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export const COMPANY_INFO = {
  name: "Meteory",
  nameAr: "ميتيوري",
  tagline: "Intelligent Fire Safety",
  taglineAr: "السلامة الذكية من الحرائق",
  email: "info@meteory-eg.com",
  phones: {
    land: "+20 2 2622 0068",
    fax: "+20 2 2622 0069",
    mobile: "+20 120 117 0010",
    whatsapp: "+20 120 117 0010"
  },
  address: "81 Joseph Tito Street, El Nozha, Cairo, Egypt",
  addressAr: "81 شارع جوزيف تيتو، النزهة، القاهرة، مصر",
  openingHours: "Sunday - Thursday: 10AM - 5PM",
  openingHoursAr: "الأحد - الخميس: 10 صباحاً - 5 مساءً",
  socials: {
    facebook: "https://www.facebook.com/Meteory",
    linkedin: "https://www.linkedin.com/company/meteory/"
  }
};

export interface Branch {
  city: string;
  cityAr: string;
  address: string;
  addressAr: string;
  phone: string;
  email: string;
  mapLink: string;
  type?: "Headquarters" | "Factory" | "Branch";
}

export const BRANCHES: Branch[] = [
  {
    city: "Cairo (HQ)",
    cityAr: "القاهرة (المقر الرئيسي)",
    address: "81 Joseph Tito St, El Nozha, Sheraton Airport",
    addressAr: "81 شارع جوزيف تيتو، النزهة، مساكن شيراتون",
    phone: "+20 2 2622 0068",
    email: "info@meteory-eg.com",
    mapLink: "https://maps.app.goo.gl/wRGKacrZH1rEgBBU9",
    type: "Headquarters"
  },
  {
    city: "10th of Ramadan (Factory)",
    cityAr: "العاشر من رمضان (المصنع)",
    address: "Ind. Zone C1, Plot 5, El Madina El Monawara St.",
    addressAr: "المنطقة الصناعية C1، قطعة 5، شارع المدينة المنورة",
    phone: "+20 15 367 855",
    email: "factory@meteory-eg.com",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Meteory+Fire+Extinguishers+10th+of+Ramadan",
    type: "Factory"
  },
  {
    city: "Sharm El Sheikh",
    cityAr: "شرم الشيخ",
    address: "Sun Shine Mall, Shop 27, El Salam Rd, Neama Bay",
    addressAr: "مول صن شاين، محل 27، طريق السلام، خليج نعمة",
    phone: "+20 120 117 0010",
    email: "sharm@meteory-eg.com",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Meteory+Sharm+El+Sheikh",
    type: "Branch"
  },
  {
    city: "6th of October",
    cityAr: "السادس من أكتوبر",
    address: "Golden Mall, Central Axis, 18 Vodafone Square",
    addressAr: "جولدن مول، المحور المركزي، 18 ميدان فودافون",
    phone: "+20 127 878 4244",
    email: "october@meteory-eg.com",
    mapLink: "https://goo.gl/maps/BmaACYTqgcZdMLdJ6",
    type: "Branch"
  },
  {
    city: "Mansoura",
    cityAr: "المنصورة",
    address: "Mansoura City Center",
    addressAr: "وسط مدينة المنصورة",
    phone: "+20 120 403 3386",
    email: "mansora@meteory-eg.com",
    mapLink: "https://www.google.com/maps/search/Meteory+Mansoura",
    type: "Branch"
  },
  {
    city: "Alexandria",
    cityAr: "الإسكندرية",
    address: "Alexandria Downtown",
    addressAr: "وسط مدينة الإسكندرية",
    phone: "03 425 3095",
    email: "alex@meteory-eg.com",
    mapLink: "https://www.google.com/maps/search/Meteory+Alexandria",
    type: "Branch"
  }
];
