import "jest";
import {
  Semigroup,
  appendMaker,
  getArraySemigroup,
  getObjectSemigroup
} from "../semigroup";
import { Type } from ".";

// Symbol.toStringTag

describe("Type", () => {
  let Semigroup;

  beforeEach(() => {
    Semigroup = new Type<Semigroup<any>>(getObjectSemigroup(), appendMaker);

    Semigroup.instance(Array, getArraySemigroup());
    Semigroup.instance(Object, getObjectSemigroup());
  });

  it("should be able to find instance by type", () => {});
});
