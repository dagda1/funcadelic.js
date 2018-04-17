import { foldl } from ".";
import { append } from "../semigroup";

describe("Foldable", function() {
  it("folds arrays", function() {
    /* expect(foldr((sum, i) => sum + i, 0, [1, 2, 3, 4])).toBe(10); */
    const a = foldl([1, 2, 3, 4], (sum, i) => sum + i);
    expect(a).toBe(10);
  });
  /*   it("folds objects", function() {
    expect(
      foldl(
        (reverse, entry) => append(reverse, { [entry.value]: entry.key }),
        {},
        {
          one: "won",
          two: "two"
        }
      )
    ).toEqual({ won: "one", two: "two" });
    expect(
      foldr(
        (reverse, { key, value }) => append(reverse, { [value]: key }),
        {},
        {
          one: "won",
          two: "two"
        }
      )
    ).toEqual({ won: "one", two: "two" });
  }); */
});
