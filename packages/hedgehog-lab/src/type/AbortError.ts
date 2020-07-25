export default class AbortError extends Error {
  constructor(str: string) {
    super(str);
    Object.setPrototypeOf(this, AbortError.prototype);
  }
}
