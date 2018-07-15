
declare global {
  interface Array<T> {
    _URI: URI
    _A: T
  }
}

declare module '../types' {
  interface URI2HKT<A> {
    Array: A[]
  }
}

export const URI = 'Array'

export type URI = typeof URI

const map = <A, B>(fa: A[], f: (a: A) => B): B[] => {
  const l = fa.length
  const r = new Array(l)
  for (let i = 0; i < l; i++) {
    r[i] = f(fa[i])
  }
  return r
}

export const array = {
  URI,
  map
}
