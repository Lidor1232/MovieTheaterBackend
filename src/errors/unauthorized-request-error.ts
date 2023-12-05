import BaseError from './base-error';

class UnauthorizedRequestError extends BaseError {
  name = 'UnauthorizedRequestError';

  constructor(message: string) {
    super(message, 401, false);
  }
}

export default UnauthorizedRequestError;
