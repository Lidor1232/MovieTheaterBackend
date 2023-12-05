import {Application} from 'express';
import {deleteMovie} from '../controllers/movie/movie.controller';

export default function (app: Application) {
  app.delete('/movie/:movieId', deleteMovie);
}
