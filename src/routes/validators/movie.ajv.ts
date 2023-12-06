import {JSONSchemaType} from 'ajv';
import {CreateMovie, UpdateMovie} from '../dto/movie.dto';

export const createMovieDtoSchemaValidator: JSONSchemaType<CreateMovie> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    durationInMinutes: {
      type: 'number',
    },
  },
  additionalProperties: false,
  required: ['title', 'description', 'durationInMinutes'],
};

export const updateMovieDtoSchemaValidator: JSONSchemaType<UpdateMovie> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      nullable: true,
    },
    description: {
      type: 'string',
      nullable: true,
    },
    durationInMinutes: {
      type: 'number',
      nullable: true,
    },
    status: {
      type: 'string',
      nullable: true,
    },
  },
  required: [],
  additionalProperties: false,
};
