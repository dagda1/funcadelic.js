import { Selectors, Typeclass } from "../typeclass/index";

type unknown = {} | null | undefined;

interface TypeProps<T = unknown, Params extends ArrayLike<unknown> = never> {
  array: {
    infer: T extends Array<infer A> ? [A] : never;
    construct: Params[0][];
  };
  null: {
    infer: null extends T ? null : never;
    construct: null;
  };
  undefined: {
    infer: undefined extends T ? undefined : never;
    construct: undefined;
  };
  unfound: {
    infer: never;
    construct: Params[0];
  };
}

type Match<T> = T extends infer U
  ? TypeProps<U>[keyof TypeProps]["infer"] extends never
    ? "unfound"
    : {
        [Key in keyof TypeProps]: TypeProps<T>[Key]["infer"] extends never
          ? never
          : Key
      }[keyof TypeProps]
  : never;

type Generic<T, Params extends ArrayLike<unknown>> = TypeProps<T, Params>[Match<
  T
>]["construct"];

export interface Functor<G> {
  map<F extends Generic<G, [T]>, T, U>(
    transform: (a: T) => U,
    mappable: F & Generic<G, [T]>
  ): Generic<F, [U]>;
}

const getArrayFunctor = (): Functor<unknown[]> => {
  return {
    map: <A, B>(fn: (a: A) => B, fa: A[]): B[] => {
      return fa.map(fn);
    }
  };
};

const getObjectFunctor = (): Functor<{}> => {
  return {
    map: <A, B>(fn: (a: A) => B, fa: A): B => {
      return fn(fa);
    }
  };
};

const doubler = (x: number) => x * 2;

const xs = getArrayFunctor().map(doubler, [4, 2]); // xs: number[]

const selectors: Selectors<Functor<unknown>> = {
  map: (_: any, fa: any) => fa
};

const Functor = new Typeclass<Functor<unknown>>(selectors);

Functor.instance(Array, getArrayFunctor());
Functor.instance(Object, getObjectFunctor());

export const map = Functor.getImplementation("map");

/* const arrayFunctor = getArrayFunctor();
const objectFunctor = getObjectFunctor();


const doubler = (x: number) => x * 2;

const xs = arrayFunctor.map(doubler, [4, 2]); // xs: number[]
const x = objectFunctor.map(doubler, 42); // x: number
const xNull = nullableFunctor.map(doubler, null); // xNull: null
const xSome = nullableFunctor.map(doubler, 4 as number | undefined); // xSome: number | undefined

const getGenericFunctor = (): Functor<unknown | unknown[]> => {
  const arrayFunctor = getArrayFunctor();
  const objectFunctor = getObjectFunctor();
  const nullableFunctor = getNullableFunctor();

  return {
    map<F extends Generic<unknown | unknown[], [T]>, T, U>(
      fn: (a: T) => U,
      fa: F & Generic<unknown | unknown[], [T]>
    ): Generic<F, [U]> {
      return Array.isArray(fa)
        ? arrayFunctor.map(fn, fa)
        : fa != undefined
          ? objectFunctor.map(fn, fa as F & T)
          : nullableFunctor.map(fn, fa);
    }
  };
};

const functor = getGenericFunctor();

const ys = functor.map(doubler, [4, 2]); // ys: number[]
const y = functor.map(doubler, 42); // y: number
const yNull = functor.map(doubler, null); // yNull: null
const ySome = functor.map(doubler, 42 as number | undefined); // ySome: number | undefined
 */
