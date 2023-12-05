import {JSONSchemaType} from 'ajv';
import {CreateMovieSchedule} from '../dto/movieSchedule.dto';

export const createMovieScheduleDtoSchemaValidator: JSONSchemaType<CreateMovieSchedule> =
  {
    type: 'object',
    properties: {
      movie: {
        type: 'string',
      },
      date: {
        type: 'string',
      },
    },
    required: ['movie', 'date'],
  };
