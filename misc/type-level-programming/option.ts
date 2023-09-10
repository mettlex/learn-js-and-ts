export type Some<T> = NonNullable<T>;

export type None = null | undefined;

export class Option<T> {
  value: Some<T> | None;

  constructor(value: Option<T>["value"]) {
    this.value = value;
  }

  static of<T>(value: Option<T>["value"]): Option<T> {
    return new Option(value);
  }

  chain<U>(f: (value: Option<T>["value"]) => Option<U>): Option<U> {
    return f(this.value);
  }

  chainSome<U>(f: (value: Some<T>) => Option<U>): Option<U | None> {
    if (!this.isSome()) {
      return none;
    }

    return f(this.value);
  }

  match<A, B>({
    some,
    none,
  }: {
    some: (value: Some<T>) => A;
    none: () => B;
  }): A | B {
    if (!this.isSome()) return none();

    return some(this.value);
  }

  isSome(): this is SomeKindedOption<T> {
    return !!this.value;
  }

  /**
   * @throws {Error}
   */
  unwrap(): Some<T> {
    if (!this.isSome()) {
      throw new Error("None.unwrap() is used.");
    }

    return this.value;
  }

  unwrapOr(defaultValue: Some<T>): Some<T> {
    if (this.isSome()) {
      return this.value;
    }

    return defaultValue;
  }

  /**
   * @throws {Error}
   */
  expect(errorMessage: string): Some<T> {
    if (!this.isSome()) {
      throw new Error(errorMessage);
    }

    return this.value;
  }
}

export class SomeKindedOption<T> extends Option<T> {
  declare value: Some<T>;

  static override of<T>(value: Option<T>["value"]) {
    return new SomeKindedOption(value);
  }
}

export class NoneKindedOption<T> extends Option<T> {
  declare value: None;

  override isSome(): boolean {
    return false;
  }
}

export function some<T>(value: Some<T>): SomeKindedOption<T> {
  return SomeKindedOption.of(value);
}

export const none: NoneKindedOption<None> = Option.of(null as None);

export function option<T>(value: Option<T>["value"]): Option<T> {
  return Option.of(value);
}
