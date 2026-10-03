/**
 * True on phones, tablets and modest machines: a touch-first pointer, four
 * or fewer CPU cores, or 4 GB or less of memory where the browser reports
 * it. Used to swap the costliest effects for cheaper versions that look
 * nearly the same. Client only; false during server rendering.
 */
export function isLowPower(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4
  );
}
