import { Typeclass } from "../typeclass/index";

export interface Semigroup<A> {
  append: (x: A, y: A) => A;
}

export const getArraySemigroup = <A>(): Semigroup<Array<A>> => {
  return {
    append: (x, y) => x.concat(y)
  };
};

export const getObjectSemigroup = <O extends Object>(): Semigroup<O> => {
  return { append: (x, y) => Object.assign({}, x, y) };
};

const selectors = { append: <A>(x: Semigroup<A>, _: Semigroup<A>) => x };

const Semigroup = new Typeclass<Semigroup<{}>>(selectors);

Semigroup.instance(Array, getArraySemigroup());
Semigroup.instance(Object, getObjectSemigroup());
Semigroup.instance(String, { append: (x: string, y: string) => x.concat(y) });

export const append = Semigroup.getImplementation("append");
