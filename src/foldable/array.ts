import { Foldable } from ".";

export const getArrayFold = <A>(): Foldable<A[], A> => {
  return {
    foldl(fn, initial, array) {
      return array.reduce(fn, initial);
    },
    foldr(fn, initial, array) {
      return array.reduce(fn, initial);
    }
  };
};
