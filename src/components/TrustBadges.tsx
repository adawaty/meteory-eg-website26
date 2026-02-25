import { Award, BadgeCheck, Clock } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="fixed bottom-4 right-4 z-40 hidden md:flex flex-col gap-2">
      <div className="bg-white/95 backdrop-blur border border-slate-200 shadow-lg rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
        <BadgeCheck className="h-4 w-4 text-primary" /> ISO 9001:2015
      </div>
      <div className="bg-white/95 backdrop-blur border border-slate-200 shadow-lg rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
        <Clock className="h-4 w-4 text-primary" /> 50+ Years
      </div>
      <div className="bg-white/95 backdrop-blur border border-slate-200 shadow-lg rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
        <Award className="h-4 w-4 text-primary" /> Certified Manufacturer
      </div>
    </div>
  );
}
