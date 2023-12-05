import {JSONSchemaType} from 'ajv';
import {CreateMovieScheduleRoute} from '../dto/movieSchedule.dto';

export const createMovieScheduleDtoSchemaValidator: JSONSchemaType<CreateMovieScheduleRoute> =
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
