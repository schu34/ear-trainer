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

export function getRandomArrayElement<T extends readonly unknown[]>(
  arr: T
): T[number] {
  return arr[getRandomIntegerInRange(0, arr.length)];
}

export function getTruthyKeys<T extends string>(
  selection: Record<T, boolean>
): T[] {
  return Object.keys(selection).filter((key) => selection[key as T]) as T[];
}

// export function keys<T extends string>(obj: Record<T, unknown>) {
//   return Object.keys(obj) as unknown as T;
// }

// export function assertNever(x: never) {
//   if (x) {
//     throw new Error("Unexpected object: " + x);
//   }
// }
