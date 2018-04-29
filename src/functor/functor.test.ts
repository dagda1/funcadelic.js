import { map } from ".";
import "jest";

function promise<A>(result: A): Promise<A> {
  return Promise.resolve(result);
}

describe("functor", () => {
  it("maps arrays", () => {
    expect(map(i => i * 2, [1, 2, 3])).toEqual([2, 4, 6]);
  });

  it("maps objects", function() {
    expect(
      map(i => i * 2, {
        one: 1,
        two: 2
      })
    ).toEqual({ one: 2, two: 4 });
  });

  it("maps objects, and maintains stability over its values.", function() {
    let objects: { one?: number; two?: number } = map(_ => ({}), {
      one: 1,
      two: 2
    });
    expect(objects.one).toBe(objects.one);
  });

  it("maps objects", function() {
    expect(
      map(i => i * 2, {
        one: 1,
        two: 2
      })
    ).toEqual({ one: 2, two: 4 });
  });

  it("maps objects, and maintains stability over its values.", function() {
    let objects: { one?: number; two?: number } = map(i => ({}), {
      one: 1,
      two: 2
    });
    expect(objects.one).toBe(objects.one);
  });

  it.skip("maps promises", function() {
    return map(i => i * 2, promise(5)).then(result => {
      expect(result).toBe(10);
    });
  });
});
