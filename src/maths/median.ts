import type { NonEmptyArray } from '../types/arrays.js';

export function median(values: NonEmptyArray<number>): number;
export function median(values: readonly number[]): number | undefined;
export function median(values: readonly number[]): number | undefined {
  if (values.length === 0) {
    return undefined;
  }

  const sorted = values.toSorted((left, right) => left - right);

  return sorted[Math.floor((sorted.length - 1) / 2)];
}

export default median;
