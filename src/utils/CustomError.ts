export default class CustomError extends Error {
  constructor(message: string, public statusCode: number, public errorList: (object[]  | null) = null) {
    super(message);
    this.statusCode = statusCode,
    this.errorList = errorList

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
