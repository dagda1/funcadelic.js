import { Typeclass, Selectors } from "../typeclass/index";
import { foldr } from "../foldable/index";
import { append } from "../semigroup/index";
import stable from "../stable";

export interface Functor<
  FA extends Object | Array<A>,
  A,
  FB extends Object | Array<B>,
  B
> {
  map: (f: (a: A) => B, fa: FA) => FB;
}

export const getArrayFunctor = <A, B>(): Functor<A[], A, B[], B> => {
  return {
    map: (fn, fa) => {
      return fa.map(fn);
    }
  };
};

export const getObjectFunctor = <A, B>(): Functor<Object, A, Object, B> => {
  const { getPrototypeOf } = Object;

  return {
    map: (fn, object) => {
      let properties = foldr(
        function(properties, entry) {
          return append(properties, {
            [entry.key]: {
              enumerable: true,
              get: stable(() => (fn as any)(entry.value, entry.key))
            }
          });
        },
        {},
        object
      );
      let prototype = getPrototypeOf(object);
      return Object.create(prototype, properties);
    }
  };
};

const selectors: Selectors<Functor<{}, any, {}, any>> = {
  map: (_: any, fa: any) => fa
};

const Functor = new Typeclass<Functor<{}, any, {}, any>>(selectors);

Functor.instance(Array, getArrayFunctor());
Functor.instance(Object, getObjectFunctor());

export const map = Functor.getImplementation("map");
