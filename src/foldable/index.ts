/* import { Typeclass } from "../typeclass/index"; */
/* import { getArrayFold } from "./array";
import { getObjectFold } from "./object"; */
import { HKT, URIS, Type } from "../types";

export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
}

export interface Foldable1<F extends URIS> {
  readonly URI: F
  readonly reduce: <A, B>(fa: Type<F, A>, b: B, f: (b: B, a: A) => B) => B
}

/* 
const selectors = {
  foldl: (_: any, __: any, foldable: any) => foldable,
  foldr: (_: any, __: any, foldable: any) => foldable
};

const Foldable = new Typeclass<Foldable<{}, any>>(selectors);

Foldable.instance(Array, getArrayFold());
Foldable.instance(Object, getObjectFold());

export const { foldl, foldr } = Foldable.getImplementations(["foldl", "foldr"]); */
