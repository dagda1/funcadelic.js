import { Monoid } from ".";

describe("Monoid", function() {
  it("reduces arrays", function() {
    expect(reduce(Array, [[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("reduces objects", function() {
    expect(reduce(Object, [{ first: "Charles" }, { last: "Lowell" }])).toEqual({
      first: "Charles",
      last: "Lowell"
    });
  });

  it("Allows you to define one-off monoids for convenience", function() {
    let Sum = Monoid.create(
      class Sum {
        empty() {
          return 0;
        }
        append(a, b) {
          return a + b;
        }
      }
    );
    expect(Sum.reduce([1, 2, 3, 4])).toBe(10);
  });
});
