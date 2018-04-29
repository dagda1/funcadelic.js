import { Typeclass, Selectors } from "../typeclass/index";
import { foldr } from "../foldable/index";
import { append } from "../semigroup/index";
import stable from "../stable";
import { getArrayFunctor } from "./array";
import { getObjectFunctor } from "./object";

export interface Functor<
  FA extends Object | Array<A>,
  A,
  FB extends Object | Array<B>,
  B
> {
  map: (f: (a: A) => B, fa: FA) => FB;
}

const selectors: Selectors<Functor<{}, any, {}, any>> = {
  map: (_: any, fa: any) => fa
};

const Functor = new Typeclass<Functor<{}, any, {}, any>>(selectors);

Functor.instance(Array, getArrayFunctor());
Functor.instance(Object, getObjectFunctor());

export const map = Functor.getImplementation("map");
