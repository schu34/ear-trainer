import { getRandomInterval, allIntervals } from "./intervals";

describe("Interval functions", () => {
  test("getRandomInterval", () => {
    //generate a bunch of intervals, make sure they're all valid
    for (let i = 0; i < 100; i++) {
      const interval = getRandomInterval();
      expect(allIntervals).toContain(interval.shortName);
    }
  });
});
