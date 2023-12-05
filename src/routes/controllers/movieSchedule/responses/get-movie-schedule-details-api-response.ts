import {Movie} from '../../../dto/movie.dto';
import {MovieApiResponse} from '../../movie/responses/movie-api-response';

export class GetMovieScheduleDetailsApiResponse {
  movie: MovieApiResponse;
  date: string;
  isCancelled: boolean;

  constructor({
    movieSchedule,
  }: {
    movieSchedule: {
      movie: Movie;
      isCancelled: boolean;
      date: string;
    };
  }) {
    this.movie = new MovieApiResponse({
      movie: movieSchedule.movie,
    });
    this.date = movieSchedule.date;
    this.isCancelled = movieSchedule.isCancelled;
  }
}
