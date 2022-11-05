export type Either<T, U> = Err<T> | Res<U>;

export class Err<T> {
  readonly error: T;

  private constructor(error: T) {
    this.error = error;
  }

  isError(): this is Err<T> {
    return true;
  }

  isResult(): this is Res<never> {
    return false;
  }

  static create<U>(error: U): Err<U> {
    return new Err(error);
  }
}

export class Res<T> {
  readonly value: T;

  private constructor(value: T) {
    this.value = value;
  }

  isError(): this is Err<never> {
    return false;
  }

  isResult(): this is Res<T> {
    return true;
  }

  static create<U>(value: U): Res<U> {
    return new Res(value);
  }
}
