/* import { Typeclass, Selectors } from "../typeclass/index"; */
/* import { getArrayFunctor } from "./array"; */
/* import { getObjectFunctor } from "./object"; */
import { HKT, URIS, Type } from "../types";

export interface Functor<F> {
  readonly URI: F;
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Type<F, A>, f: (a: A) => B) => Type<F, B>
}

export function lift<F extends URIS>(F: Functor1<F>): <A, B>(f: (a: A) => B) => (fa: Type<F, A>) => Type<F, B>
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => F.map(fa, f)
}

/* const selectors: Selectors<Functor<{}>>  = {
  map: (_: any, fa: any) => fa
}; */

/* 
export const getArrayFunctor = <T>(): Functor<T> => {
  return {
    map: (fa, fn) => {
      return fa.map(fn);
    }
  };
};

const Functor = new Typeclass<Functor<any>>(selectors); */

 /*
Functor.instance(Array, getArrayFunctor());
/* Functor.instance(Object, getObjectFunctor()); */

/* export const map = Functor.getImplementation("map"); */
