import "jest";
import {
  Semigroup,
  getArraySemigroup,
  getObjectSemigroup,
  appendMaker
} from "../semigroup";
import { Type, getType } from ".";

// Symbol.toStringTag

describe("Type", () => {
  let Semigroup;
  let append;

  const selectors = { append: <A>(x: Semigroup<A>, _: Semigroup<A>) => x };

  beforeEach(() => {
    Semigroup = new Type<Semigroup<{}>>(selectors);

    Semigroup.instance(Array, getArraySemigroup());
    Semigroup.instance(Object, getObjectSemigroup());

    append = Semigroup.getImplementation("append");
  });

  it("should be able to find instance by type", () => {
    expect(append([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
