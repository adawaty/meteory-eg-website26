export type SprinklerHazard = "light" | "ordinary" | "extra";

export interface SprinklerInputs {
  length_m: number;
  width_m: number;
  hazard: SprinklerHazard;
}

export interface SprinklerResult {
  area_m2: number;
  maxAreaPerHead_m2: number;
  estimatedHeads: number;
}

// Planning maxima derived from MeyerFire summary of NFPA 13 tables (standard spray, unobstructed).
// Light Hazard: 20.9 m² (225 ft²)
// Ordinary Hazard: 12.1 m² (130 ft²)
// Extra Hazard: 9.3 m² (100 ft²)
export function maxAreaPerHead(h: SprinklerHazard): number {
  if (h === "ordinary") return 12.1;
  if (h === "extra") return 9.3;
  return 20.9;
}

export function calcSprinklers(i: SprinklerInputs): SprinklerResult {
  const area_m2 = Math.max(0, i.length_m) * Math.max(0, i.width_m);
  const maxAreaPerHead_m2 = maxAreaPerHead(i.hazard);
  const estimatedHeads = area_m2 > 0 ? Math.max(1, Math.ceil(area_m2 / maxAreaPerHead_m2)) : 0;
  return { area_m2, maxAreaPerHead_m2, estimatedHeads };
}
