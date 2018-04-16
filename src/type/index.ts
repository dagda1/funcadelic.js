export class Type<T> {
  maker: Function;
  klass: T;
  implementations: { type: { new (...args: any[]): T }; implementation }[] = [];

  constructor(klass: T, maker: Function) {
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
