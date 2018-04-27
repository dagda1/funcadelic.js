import { Typeclass } from "../typeclass/index";

type Fold<F, A> = <B>(
  fn: (prev: B, curr: A) => B,
  initial: B,
  foldable: F
) => B;

export interface Foldable<F, A> {
  foldl: Fold<F, A>;
  foldr: Fold<F, A>;
}

const getArrayFold = <A>(): Foldable<A[], A> => {
  return {
    foldl(fn, initial, array) {
      return array.reduce(fn, initial);
    },
    foldr(fn, initial, array) {
      return array.reduce(fn, initial);
    }
  };
};

export const getObjectFold = (): Foldable<Object, Object> => {
  return {
    foldr<Object>(fn, initial: Object, object) {
      return Object.keys(object).reduceRight(
        (memo: Object, key) =>
          fn(memo, {
            key,
            get value() {
              return object[key];
            }
          }),
        initial
      );
    },
    foldl<Object>(fn, initial: Object, object) {
      return Object.keys(object).reduce(
        (memo, key) =>
          fn(memo, {
            key,
            get value() {
              return object[key];
            }
          }),
        initial
      );
    }
  };
};

const selectors = {
  foldl: (_: any, __: any, foldable: any) => foldable,
  foldr: (_: any, __: any, foldable: any) => foldable
};

const Foldable = new Typeclass<Foldable<{}, any>>(selectors);

Foldable.instance(Array, getArrayFold());
Foldable.instance(Object, getObjectFold());

export const { foldl, foldr } = Foldable.getImplementations(["foldl", "foldr"]);
