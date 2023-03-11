class CustomError extends Error {
  constructor(message, code) {
    Super(message);
    this.code = code;
  }
}
module.exports = CustomError;
