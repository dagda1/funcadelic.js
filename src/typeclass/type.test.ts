import "jest";
import { Semigroup, getArraySemigroup, getObjectSemigroup } from "../semigroup";
import { Typeclass } from ".";

describe("Type", () => {
  it("should be able to find instance by type", () => {
    const selectors = { append: <A>(x: Semigroup<A>, _: Semigroup<A>) => x };

    const Semigroup = new Typeclass<Semigroup<{}>>(selectors);

    Semigroup.instance(Array, getArraySemigroup());
    Semigroup.instance(Object, getObjectSemigroup());
    Semigroup.instance(String, {
      append: (x: string, y: string) => x.concat(y)
    });

    const append = Semigroup.getImplementation("append");

    expect(append([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);

    expect(append({ one: 1, two: 2 }, { two: "two", three: 3 })).toEqual({
      one: 1,
      two: "two",
      three: 3
    });

    expect(append("abc", "def")).toBe("abcdef");
  });
});
