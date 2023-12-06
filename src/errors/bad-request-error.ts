import BaseError from './base-error';

class BadRequestError extends BaseError {
  name = 'BadRequestError';

  constructor(message: string) {
    super(message, 400, false);
  }
}

export default BadRequestError;
