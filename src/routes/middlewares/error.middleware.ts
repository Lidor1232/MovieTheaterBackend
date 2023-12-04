import {NextFunction, Request, Response} from 'express';
import {EntityNotFoundError} from 'typeorm';
import logger from '../../config/logger';

interface ErrorMessage {
  message: string;
  statusCode: number;
  retryable: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const errorMessage: ErrorMessage = {
    statusCode: 500,
    message: error.message,
    retryable: false,
  };

  if (isEntityNotFoundError(error)) {
    errorMessage.statusCode = 404;
  }

  if (isErrorWithStatus(error)) {
    errorMessage.statusCode = error.status;
  }

  if (isErrorWithStatusCode(error)) {
    errorMessage.statusCode = error.statusCode;
  }

  if (isErrorWithRetryable(error)) {
    errorMessage.retryable = error.retryable;
  }

  logger.error(error);
  return res.status(errorMessage.statusCode).json(errorMessage);
};

/**
 * TypeORM throws EntitynotFoundError if couldn't be found
 */
function isEntityNotFoundError(error: Error): error is EntityNotFoundError {
  // return (error as any).status !== undefined;
  return error instanceof EntityNotFoundError;
}

function isErrorWithStatus(error: Error): error is Error & {status: number} {
  return (error as any).status !== undefined;
}

function isErrorWithStatusCode(
  error: Error,
): error is Error & {statusCode: number} {
  return (error as any).statusCode !== undefined;
}

function isErrorWithRetryable(
  error: Error,
): error is Error & {retryable: boolean} {
  return (error as any).retryable !== undefined;
}

export default errorHandlerMiddleware;
