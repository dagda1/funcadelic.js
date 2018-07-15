import { Functor } from ".";
import { unknown } from "../types";

export const getArrayFunctor = <T>(): Functor<T[]> => {
  return {
    map: (fa, fn) => {
      return fa.map(fn);
    }
  };
};
