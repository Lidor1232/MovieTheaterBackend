import {Application} from 'express';
import {
  createMovie,
  deleteMovie,
  updateMovie,
} from '../controllers/movie/movie.controller';
import jsonSchemaValidator from '../middlewares/validation.middleware';
import {
  createMovieDtoSchemaValidator,
  updateMovieDtoSchemaValidator,
} from '../validators/movie.ajv';

export default function (app: Application) {
  app.delete('/movie/:movieId', deleteMovie);

  app.post(
    '/movie',
    jsonSchemaValidator(createMovieDtoSchemaValidator),
    createMovie,
  );

  app.put(
    '/movie',
    jsonSchemaValidator(updateMovieDtoSchemaValidator),
    updateMovie,
  );
}
