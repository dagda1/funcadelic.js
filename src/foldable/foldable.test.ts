import { foldl, foldr } from ".";
import { append } from "../semigroup/index";

describe("Foldable", function() {
  it("folds arrays", function() {
    expect(foldr((sum, i) => sum + i, 0, [1, 2, 3, 4])).toBe(10);
    expect(foldl((sum, i) => sum + i, 0, [1, 2, 3, 4])).toBe(10);
  });

  it("folds objects", function() {
    expect(
      foldl(
        (reverse, entry: any) => append(reverse, { [entry.value]: entry.key }),
        {},
        {
          one: "won",
          two: "two"
        }
      )
    ).toEqual({ won: "one", two: "two" });
    expect(
      foldr(
        (reverse, { key, value }: any) => append(reverse, { [value]: key }),
        {},
        {
          one: "won",
          two: "two"
        }
      )
    ).toEqual({ won: "one", two: "two" });
  });
});
