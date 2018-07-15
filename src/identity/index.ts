import { Functor1 } from "../functor/index";

declare module '../types' {
  interface URI2HKT<A> {
    Identity: Identity<A>
  }
}

export const URI = 'Identity'

export type URI = typeof URI

export class Identity<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly value: A) {}

  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.value))
  }
}

const map = <A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> => {
  return fa.map(f)
}

export const identity: Functor1<URI> = {
  URI, // --> these fields make `identity` an instance of `Functor`, note that both `URI` and `map` here are values
  map // ----^
}

