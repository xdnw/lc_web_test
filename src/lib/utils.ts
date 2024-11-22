import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Unpackr } from 'msgpackr';
export const UNPACKR = new Unpackr({largeBigIntToFloat: true, mapsAsObjects: true, bundleStrings: true, int64AsType: "number"});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}