class CustomError extends Error {
  constructo(message, code) {
    Super(message);
    this.code = code;
  }
}
module.exports = CustomError;
