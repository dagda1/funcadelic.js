export class Type<T> {
  maker: <K extends keyof T>(...args) => T[K];
  klass: T;
  implementations: { type: { new (...args: any[]): T }; implementation }[] = [];

  constructor(klass: T, maker: <K extends keyof T>(...args) => T[K]) {
    this.klass = klass;
    this.maker = maker;
  }

  instance<J extends T>(type: { new (...args: any[]): T }, implementation: J) {
    this.implementations.push({
      type,
      implementation: this.maker(implementation)
    });
  }
}
