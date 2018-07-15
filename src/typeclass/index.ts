export const getType = (value: any): string =>
  Object.prototype.toString
    .call(value)
    .replace(/^\[object |\]$/g, "")
    .toLowerCase();

export type Selectors<T> = { [P in keyof T]: T[P] };

export interface Implentation<T> {
  type: Function;
  implementation: T;
}

export class Typeclass<T> {
  selectors: Selectors<T>;
  implementations: Implentation<T>[] = [];

  constructor(selectors: Selectors<T>) {
    this.selectors = selectors;
  }

  instance<J extends T>(type: Function, implementation: J) {
    this.implementations.push({ type, implementation });
  }

  getImplementations(keys: ReadonlyArray<keyof T>): T {
    const out = {} as T;
    for (const key of keys) {
      out[key] = this.getImplementation(key);
    }
    return out;
  }

  getImplementation<K extends keyof T>(name: string): T[K] {
    return (((...args: any[]) => {
      const type = this.selectors[name](...args);
      const lookup = getType(type);

      // if(lookup === "null") doSomething
      // we could handle nulls here or even use an Option type to stop unexpected errors

      const impl: T = this.implementations.find(
        imp => imp.type.name.toLowerCase() === lookup
      ).implementation;

      return impl[name](...args);
    }) as any) as T[K];
  }
}
