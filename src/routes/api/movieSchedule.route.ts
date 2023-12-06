import {Application} from 'express';
import {
  cancelMovieSchedule,
  createMovieSchedule,
  getMovieScheduleDetails,
  getMoviesSchedule,
} from '../controllers/movieSchedule/movieSchedule.controller';
import jsonSchemaValidator from '../middlewares/validation.middleware';
import {
  createMovieScheduleDtoSchemaValidator,
  getMoviesScheduleDtoSchemaValidator,
} from '../validators/movieSchedule.ajv';

export default function (app: Application) {
  app.post(
    '/movies/schedule',
    jsonSchemaValidator(getMoviesScheduleDtoSchemaValidator),
    getMoviesSchedule,
  );

  app.get(`/movie/schedule/:movieScheduleId/details`, getMovieScheduleDetails);

  app.post(
    '/movie/schedule/create',
    jsonSchemaValidator(createMovieScheduleDtoSchemaValidator),
    createMovieSchedule,
  );

  app.patch('/movie/schedule/:movieScheduleId/cancel', cancelMovieSchedule);
}
