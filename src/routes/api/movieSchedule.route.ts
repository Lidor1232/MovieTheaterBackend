import {Application} from 'express';
import {getMoviesSchedule} from '../controllers/movieSchedule/movieSchedule.controller';

export default function (app: Application) {
  app.post('/schedule/movies', getMoviesSchedule);
}
