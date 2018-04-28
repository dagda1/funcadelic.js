import "jest";
import stable from ".";

describe("stable function", () => {
  describe("thunk", () => {
    it("returns stabilized function when attempting to stabilize a thunk", () => {
      let stabilized = stable(() => {});
      expect(stable(stabilized)).toBe(stabilized);
    });
  });
  describe("stableOne", () => {
    it("caches result when passed an object", () => {
      let one = {};
      let two = {};
      let dateMaker = () => new Date();
      let stableDateMaker = stable(dateMaker);
      expect(stableDateMaker(one)).toBe(stableDateMaker(one));
      expect(stableDateMaker(two)).toBe(stableDateMaker(two));
      expect(stableDateMaker(one)).not.toBe(stableDateMaker(two));
    });
    it("returns stabilized function when attempting to stabilize a function with one argument", () => {
      let stabilized = stable(arg => arg);
      expect(stable(stabilized)).toBe(stabilized);
    });
  });
});
