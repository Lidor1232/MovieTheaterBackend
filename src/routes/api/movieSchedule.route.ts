import {Application} from 'express';
import {
  getMovieScheduleDetails,
  getMoviesSchedule,
} from '../controllers/movieSchedule/movieSchedule.controller';

export default function (app: Application) {
  app.post('/movies/schedule', getMoviesSchedule);

  app.get(`/movie/schedule/:movieScheduleId/details`, getMovieScheduleDetails);
}
