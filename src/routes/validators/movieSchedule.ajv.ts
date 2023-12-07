import {JSONSchemaType} from 'ajv';
import {
  CreateMovieScheduleRoute,
  GetMoviesSchedule,
} from '../dto/movieSchedule.dto';

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
    additionalProperties: false,
    required: ['movie', 'date'],
  };

export const getMoviesScheduleDtoSchemaValidator: JSONSchemaType<GetMoviesSchedule> =
  {
    type: 'object',
    properties: {
      terms: {
        type: 'object',
        properties: {
          startDate: {
            type: 'string',
            nullable: true,
          },
          endDate: {
            type: 'string',
            nullable: true,
          },
        },
        required: [],
        additionalProperties: false,
      },
    },
    additionalProperties: false,
    required: ['terms'],
  };
