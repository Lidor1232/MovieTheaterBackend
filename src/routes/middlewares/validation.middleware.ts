import Ajv, {JSONSchemaType} from 'ajv';
import addFormats from 'ajv-formats';
import {Request, Response, NextFunction} from 'express';
// @ts-ignore
import createError from 'http-errors';

const ajv = new Ajv({allErrors: true, strict: false});
addFormats(ajv);

const jsonSchemaValidator = <T>(schema: JSONSchemaType<T>) => {
  const validator = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validator(req.body)) {
      return next(
        createError(400, {
          message: validator.errors?.[0],
        }),
      );
    }

    return next();
  };
};

export default jsonSchemaValidator;
