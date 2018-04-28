const Stable = Symbol("Stable");

export default function stable<A, B>(fn: (a?: A) => B) {
  switch (fn.length) {
    case 0:
      return thunk(fn);
    case 1:
      return stableOne(fn);
    default:
      throw new Error(`Cannot (yet) make functions with ${fn.length} stable`);
  }
}

type Stable<A> = () => A;
type StableOne<A, B> = (a: A) => B;

export function thunk<A>(fn: Stable<A>) {
  if (fn[Stable]) {
    return fn;
  }
  let evaluated = false;
  let result: A = undefined;
  function evaluate(): A {
    if (evaluated) {
      return result;
    } else {
      result = fn.call(this);
      evaluated = true;
      return result;
    }
  }
  evaluate[Stable] = true;
  return evaluate;
}

export function stableOne<A extends Object, B>(fn: StableOne<A, B>) {
  if (fn[Stable]) {
    return fn;
  }
  let cache = new WeakMap<A, B>();
  function stabilizedOne(argument: A): B {
    if (!cache.has(argument)) {
      cache.set(argument, fn(argument));
    }
    return cache.get(argument);
  }

  stabilizedOne[Stable] = true;

  return stabilizedOne;
}
