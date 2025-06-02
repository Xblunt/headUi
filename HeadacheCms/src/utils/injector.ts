class Injector {
  private static instances: Map<symbol, unknown> = new Map();

  // Регистрация экземпляра с его символьным идентификатором
  static register<T>(token: symbol, instance: T): void {
    Injector.instances.set(token, instance);
  }

  // Извлечение экземпляра по его символьному идентификатору
  static get<T>(token: symbol): T {
    const instance = Injector.instances.get(token);
    if (instance === undefined) {
      throw new Error(`No instance found for token: ${String(token)}`);
    }
    return instance as T; // Приведение типа для возвращаемого значения
  }
}

export default Injector;