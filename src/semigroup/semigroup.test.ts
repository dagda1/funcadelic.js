import "jest";
import { append } from ".";

describe("Semigroup", () => {
  it("appends objects", () => {
    expect(append({ one: 1, two: 2 }, { two: "two", three: 3 })).toEqual({
      one: 1,
      two: "two",
      three: 3
    });
  });

  it("appends arrays", () => {
    expect(append([1, 2, 3], [4, 4, 4])).toEqual([1, 2, 3, 4, 4, 4]);
  });

  interface T {
    one?: number;
    two?: string | number;
    three?: number;
  }

  it.skip("maintains prototype", () => {
    class OneAndTwo implements T {
      one: number;
      two: number;

      constructor() {
        this.one = 1;
        this.two = 2;
      }
    }

    expect(
      append(new OneAndTwo(), {
        two: "two",
        three: 3
      })
    ).toBeInstanceOf(OneAndTwo);
  });
});
