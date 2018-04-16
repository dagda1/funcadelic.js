import propertiesOf from "object.getownpropertydescriptors";
import { Data } from "../types";

const { assign, getPrototypeOf, getOwnPropertySymbols, keys } = Object;

export interface Semigroup<A> {
  append: (x: A, y: A) => A;
}

export const appendMaker = <A>(S: Semigroup<A>): ((x: A, y: A) => A) =>
  S.append;

export const getArraySemigroup = <A>(): Semigroup<Array<A>> => {
  return {
    append: (x, y) => x.concat(y)
  };
};

export const getObjectSemigroup = <O extends Object>(): Semigroup<O> => {
  return { append: (x, y) => Object.assign({}, x, y) };
};

export const semigroupData: Semigroup<Data> = {
  append: (x: Data, y: Data) => {
    if (Array.isArray(x) && Array.isArray(y)) {
      return getArraySemigroup().append(x, y);
    }

    return getObjectSemigroup().append(x, y);
  }
};

export const append = appendMaker(semigroupData);
