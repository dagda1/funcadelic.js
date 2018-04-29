import { Functor } from ".";
import { foldr } from "../foldable";
import { append } from "../semigroup";
import stable from "../stable";

export const getObjectFunctor = <A, B>(): Functor<Object, A, Object, B> => {
  const { getPrototypeOf } = Object;

  return {
    map: (fn, object) => {
      let properties = foldr(
        function(properties, entry) {
          return append(properties, {
            [entry.key]: {
              enumerable: true,
              // (fn as any) as this breaks the interface for functor
              // should this be a bifunctor?
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
