import { Functor } from "./index";

export const getArrayFunctor = <T>(): Functor<T[]> => {
  return {
    map: (fa, fn) => {
      return fa.map(fn);
    }
  };
};
