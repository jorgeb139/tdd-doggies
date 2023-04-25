class CustomError extends Error {
  constructor(message, codeError) {
    super(message);
    this.codeError = codeError;
    this.name = 'CustomError';
  }
}

export default CustomError;
