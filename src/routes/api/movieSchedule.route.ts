import {Application} from 'express';
import {
  createMovieSchedule,
  getMovieScheduleDetails,
  getMoviesSchedule,
} from '../controllers/movieSchedule/movieSchedule.controller';
import jsonSchemaValidator from '../middlewares/validation.middleware';
import {createMovieScheduleDtoSchemaValidator} from '../validators/movieSchedule.ajv';

export default function (app: Application) {
  app.post('/movies/schedule', getMoviesSchedule);

  app.get(`/movie/schedule/:movieScheduleId/details`, getMovieScheduleDetails);

  app.post(
    'movie/schedule/create',
    jsonSchemaValidator(createMovieScheduleDtoSchemaValidator),
    createMovieSchedule,
  );
}
