import { Foldable, Foldfn } from ".";

export const getObjectFold = <F extends Object, A>(): Foldable<F, A> => {
  return {
    foldr<B>(fn: Foldfn<A, B>, initial: B, object: F) {
      return Object.keys(object).reduceRight(
        (memo, key) =>
          fn(memo, ({
            key,
            get value() {
              return object[key];
            }
          } as any) as A),
        initial
      );
    },
    foldl<B>(fn: Foldfn<A, B>, initial: B, object: F) {
      return Object.keys(object).reduce(
        (memo, key) =>
          fn(memo, ({
            key,
            get value() {
              return object[key];
            }
          } as any) as A),
        initial
      );
    }
  };
};
