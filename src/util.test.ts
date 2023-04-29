import { assert, getRandomArrayElement, getRandomIntegerInRange } from "./util";

describe("assert", () => {
  it("should do nothing if condidion is true", () => {
    expect(()=>assert(true, "error message")).not.toThrow();
  });
  it("should throw if condition is false", () => {
    expect(()=>assert(false, "error message")).toThrow();
  });
});

describe("getRandomIntegerInRange", () => {
  it("throws when args are invalid", () => {
    expect(() => getRandomIntegerInRange(2, 1)).toThrow();
  });

  it("should pick a random number in the range", () => {
    for (let i = 0; i < 1000; i++) {
      const int = getRandomIntegerInRange(1, 10);
      expect(int).toBeLessThan(10);
      expect(int).toBeGreaterThanOrEqual(1);
    }
  });

  // this allows passing getRandomIntegerInRange(0, thing.length) to pick a random array index
  it("should be inclusive on the bottom only", () => {
    let oneSeen = false;
    let tenSeen = false;
    for (let i = 0; i < 1000; i++) {
      const int = getRandomIntegerInRange(1, 10);
      oneSeen = oneSeen || int === 1;
      tenSeen = tenSeen || int === 10;
    }
    expect(oneSeen).toBeTruthy();
    expect(tenSeen).toBeFalsy();
  });
});


describe("getRandomArrayElement", () => {
  it("should pick a random element from the array", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = 0; i < 1000; i++) {
      const int = getRandomArrayElement(arr);
      expect(int).toBeDefined();
      expect(arr).toContain(int);
    }
  });
});