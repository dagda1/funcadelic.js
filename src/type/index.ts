export const getType = (value: any): string =>
  Object.prototype.toString
    .call(value)
    .replace(/^\[object |\]$/g, "")
    .toLowerCase();

export class Type<T> {
  selectors: object;
  implementations: { type: Function; implementation: T }[] = [];

  constructor(selectors) {
    this.selectors = selectors;
  }

  instance<J extends T>(type: { new (...args: any[]): T }, implementation: J) {
    this.implementations.push({
      type,
      implementation
    });
  }

  getImplementation<K extends keyof T>(name: string): T[K] {
    return (((...args: any[]) => {
      const type = this.selectors[name](...args);
      const lookup = getType(type);

      const impl = this.implementations.find(
        imp => imp.type.name.toLowerCase() === lookup
      ).implementation;

      return (impl[name] as any)(...args);
    }) as any) as T[K];
  }
}
