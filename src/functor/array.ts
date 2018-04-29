import { Functor } from "./index";

export const getArrayFunctor = <A, B>(): Functor<A[], A, B[], B> => {
  return {
    map: (fn, fa) => {
      return fa.map(fn);
    }
  };
};
