import { Typeclass } from "../typeclass/index";
import { HKT } from "../types";

export interface Functor<F> {
  map: <A, B>(fn: (a: A) => B, fa: HKT<F, A>) => HKT<F, B>;
}

export const getArrayFunctor = (): Functor<Array<any>> => {
  return {
    map: (fn, fa) => {
      return (fa as Array<any>).map(fn) as HKT<Array<B>>;
    }
  };
};

/* import { type } from './typeclasses';

export const Functor = type(class Functor {
  map(fn, f) {
    let { map } = this(f);
    return map(fn, f);
  }
});

export const { map } = Functor.prototype;
 */
