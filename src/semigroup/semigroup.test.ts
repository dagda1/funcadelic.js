import "jest";
import { getArraySemigroup, getObjectSemigroup, append } from ".";

describe("Semigroup", () => {
  interface T {
    one?: number;
    two?: string | number;
    three?: number;
  }

  it("appends objects", () => {
    expect(
      getObjectSemigroup<T>().append(
        { one: 1, two: 2 },
        { two: "two", three: 3 }
      )
    ).toEqual({
      one: 1,
      two: "two",
      three: 3
    });
  });

  it("appends arrays", () => {
    expect(append(getArraySemigroup<number>())([1, 2, 3], [4, 4, 4])).toEqual([
      1,
      2,
      3,
      4,
      4,
      4
    ]);
  });

  // TODO: do we need this?
  /*   it("maintains prototype", () => {
    class OneAndTwo implements T {
      one: number;
      two: number;

      constructor() {
        this.one = 1;
        this.two = 2;
      }
    }

    expect(
      getObjectSemigroup<T>().append(new OneAndTwo(), {
        two: "two",
        three: 3
      })
    ).toBeInstanceOf(OneAndTwo);
  }); */
});
