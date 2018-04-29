import { Typeclass } from "../typeclass/index";
import { getArrayFold } from "./array";
import { getObjectFold } from "./object";

export type Foldfn<A, B> = (prev: B, curr: A) => B;

export type Fold<F, A> = <B>(fn: Foldfn<A, B>, initial: B, foldable: F) => B;

export interface Foldable<F, A> {
  foldl: Fold<F, A>;
  foldr: Fold<F, A>;
}

const selectors = {
  foldl: (_: any, __: any, foldable: any) => foldable,
  foldr: (_: any, __: any, foldable: any) => foldable
};

const Foldable = new Typeclass<Foldable<{}, any>>(selectors);

Foldable.instance(Array, getArrayFold());
Foldable.instance(Object, getObjectFold());

export const { foldl, foldr } = Foldable.getImplementations(["foldl", "foldr"]);
