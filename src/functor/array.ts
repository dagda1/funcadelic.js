import { Functor } from ".";
import { unknown } from "../types";

export const getArrayFunctor = (): Functor<Array<unknown>> => {
  return {
    map: <A, B>(fn: (a: A) => B, fa: A[]): B[] => {
      return fa.map(fn);
    }
  };
};
