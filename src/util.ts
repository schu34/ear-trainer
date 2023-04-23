import { IntervalShortName } from "./intervals";

export function assert(condition: boolean, err: string) {
  if (condition) return;
  throw new Error(err);
}

export function getRandomIntegerInRange(low: number, high: number) {
  assert(
    low < high,
    "getRandomIntegerInRange: low side of range must be higher than "
  );
  const distance = high - low;

  return low + Math.floor(Math.random() * distance);
}

export function getRandomArrayElement<T>(arr: T[]) {
  return arr[getRandomIntegerInRange(0, arr.length)];
}

export function getIntervalListFromSelection(
  selection: Record<IntervalShortName, boolean>
): IntervalShortName[] {
  return Object.keys(selection).filter(
    (key) => selection[key as IntervalShortName]
  ) as IntervalShortName[];
}
