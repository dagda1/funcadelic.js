import { Monoid } from "../Monoid";
export interface Foldable<T> {
  reduce<U>(fn: (u: U, t: T) => U, u: U): U;
}

export const fold = <F, M>(F: Foldable<F>, M: Monoid<M>) => (f: F): M => {
  return f => F.reduce(f, M.empty);
};

/* import { type } from './typeclasses';

export const Foldable = type(class Foldable {
  foldr(fn, initial, foldable) {
    let { foldr } = this(foldable);
    return foldr(fn, initial, foldable);
  }

  foldl(fn, initial, foldable) {
    let { foldl } = this(foldable);
    return foldl(fn, initial, foldable);
  }

  size(foldable) {
    let { foldr } = this(foldable);
    return foldr((len) => len + 1, 0, foldable);
  }
});

export const { foldr, foldl, size } = Foldable.prototype;
 */
