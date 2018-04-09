export interface Semigroup<A> {
  append: (x: A, y: A) => A;
}

export const append = <A>(S: Semigroup<A>): ((x: A, y: A) => A) => S.append;

export const getArraySemigroup = <A = never>(): Semigroup<Array<A>> => {
  return {
    append: (x, y) => x.concat(y)
  };
};

export const getObjectSemigroup = <O extends Object>(): Semigroup<O> => {
  return { append: (x, y) => Object.assign({}, x, y) };
};
