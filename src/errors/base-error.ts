class BaseError extends Error {
  name = 'BaseError';

  status: number;

  retryable: boolean;

  nestedError?: Error;

  constructor(
    message: string,
    status: number,
    retryable: boolean,
    error?: Error,
  ) {
    super(message);
    this.status = status;
    this.retryable = retryable;
    this.nestedError = error;
  }
}

export default BaseError;
