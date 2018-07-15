export type unknown = {} | null | undefined;
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

export interface URI2HKT<A> {}

// all URIs
export type URIS = (URI2HKT<any> & { never: HKT<never, never> })[keyof URI2HKT<any> | 'never']['_URI']

// given a URI and a type, extracts the corresponding type
export type Type<URI extends URIS, A> = URI2HKT<A>[URI]

(null! as URI2HKT<any>) as { [k in keyof URI2HKT<any>]: HKT<k, any> }
