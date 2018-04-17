import { Monoid } from "../Monoid";
import { Data, HKT } from "../types";
import { append } from "../semigroup";

export const LeftElement = "Array";

export type LeftElement = typeof LeftElement;

declare global {
  interface Array<T> {
    _LeftElement: LeftElement;
    _RightElement: T;
  }
}

const reduce = <A, B>(fa: Array<A>, b: B, f: (b: B, a: A) => B): B => {
  const l = fa.length;
  let r = b;
  for (let i = 0; i < l; i++) {
    r = f(r, fa[i]);
  }
  return r;
};

export interface Foldable<F> {
  readonly LeftElement: F;
  reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B;
}

export const foldlMaker = <F, M>(
  F: Foldable<F>,
  M: Monoid<M>
): (<A>(fa: HKT<F, A>, f: (a: A) => M) => M) => {
  return (fa, f) => {
    return F.reduce(fa, M.empty, (acc, x) => {
      return M.append(acc, f(x));
    });
  };
};

const monoid: Monoid<any> = {
  append,
  //neutral element
  empty: () => [] //what do we do here?
};

const Arr = {
  LeftElement,
  reduce
};

export const foldl = foldlMaker(Arr, monoid);

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
