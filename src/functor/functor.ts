import { Typeclass } from "../typeclass/index";

export interface Functor<FA extends Object, A, FB extends Object, B> {
  map: (fn: (a: A) => B, fa: FA) => FB;
}

export const getArrayFunctor = <A, B>(): Functor<A[], A, B[], B> => {
  return {
    map: (fn, fa) => {
      return fa.map(fn);
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
