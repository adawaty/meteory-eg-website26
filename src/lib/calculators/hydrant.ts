export type HydrantBuildingType = "dwelling" | "other";

export interface HydrantInputs {
  buildingType: HydrantBuildingType;
  // Footprint dimensions used as a proxy for building perimeter accessible by fire apparatus.
  length_m: number;
  width_m: number;
}

export interface HydrantResult {
  perimeter_m: number;
  maxSpacing_m: number;
  maxDistanceToRemotePoint_m: number;
  estimatedHydrants: number;
}

/**
 * Planning estimate based on prescriptive spacing / distance guidance.
 *
 * Sources used in UI copy and standards checks:
 * - NFPA 1 blog example (mentions max 400 ft distance criterion and max 500 ft spacing between hydrants).
 * - Local AHJ documents often mirror these values.
 */
export function calcHydrants(i: HydrantInputs): HydrantResult {
  const L = Math.max(0, i.length_m);
  const W = Math.max(0, i.width_m);
  const perimeter_m = Math.max(0, 2 * (L + W));

  // Based on Fire Hydrant Minimum Standards (PBCFR) which mirrors common AHJ practice:
  // - Dwellings: within 500 ft (152 m) to remote point, spacing <= 800 ft (244 m)
  // - Other buildings: within 400 ft (122 m) to remote point, spacing <= 500 ft (152 m)
  const maxSpacing_m = i.buildingType === "dwelling" ? 244 : 152;
  const maxDistanceToRemotePoint_m = i.buildingType === "dwelling" ? 152 : 122;

  if (perimeter_m <= 0) {
    return { perimeter_m, maxSpacing_m, maxDistanceToRemotePoint_m, estimatedHydrants: 0 };
  }

  // Simplified placement assumption: hydrants distributed along accessible perimeter road.
  // Spacing criterion drives the minimum count.
  const estimatedHydrants = Math.max(1, Math.ceil(perimeter_m / maxSpacing_m));

  return { perimeter_m, maxSpacing_m, maxDistanceToRemotePoint_m, estimatedHydrants };
}
