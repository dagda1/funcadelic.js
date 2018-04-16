export type Data = Array<any> | Object;

export interface HKT<L, R> {
  readonly _LeftElement: L;
  readonly _RightElement: R;
}
