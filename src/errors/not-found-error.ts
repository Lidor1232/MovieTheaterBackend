import BaseError from './base-error';

class NotFoundError extends BaseError {
  name = 'NotFoundError';

  constructor(message: string) {
    super(message, 404, false);
  }
}

export default NotFoundError;
