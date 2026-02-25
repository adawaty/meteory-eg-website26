// Numeric parsing helpers (user inputs can include commas/spaces)

export function parseNumber(input: string): number {
  if (input === undefined || input === null) return 0;
  const cleaned = String(input)
    .trim()
    .replace(/\s+/g, "")
    .replace(/,/g, "");
  if (!cleaned) return 0;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
