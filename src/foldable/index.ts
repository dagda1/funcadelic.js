import { Typeclass } from "../typeclass/index";

type Fold<F> = <A, B>(fn: (b: B, a: A) => A, initial: A, foldable: F) => B;

export interface Foldable<F> {
  foldl: Fold<F>;
  foldr: Fold<F>;
}

export const getArrayFold = (): Foldable<Array<any>> => {
  return {
    foldl(fn, initial, array) {
      return array.reduce(fn, initial);
    },
    foldr(fn, initial, array) {
      return array.reduceRight(fn, initial);
    }
  };
};

export const getObjectFold = (): Foldable<Object> => {
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

const Foldable = new Typeclass<Foldable<{}>>(selectors);

Foldable.instance(Array, getArrayFold());
Foldable.instance(Object, getObjectFold());

export const { foldl, foldr } = Foldable.getImplementations(["foldl", "foldr"]);
