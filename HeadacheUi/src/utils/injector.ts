class Injector {
  private static instances: Map<symbol, unknown> = new Map();

  static register<T>(token: symbol, instance: T): void {
    Injector.instances.set(token, instance);
  }

  static get<T>(token: symbol): T {
    const instance = Injector.instances.get(token);
    if (instance === undefined) {
      throw new Error(`No instance found for token: ${String(token)}`);
    }
    return instance as T;
  }
}

export default Injector;