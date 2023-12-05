import {Movie} from '../../../dto/movie.dto';
import {MovieApiResponse} from '../../movie/responses/movie-api-response';

export class GetMovieScheduleDetailsApiResponse {
  movie: MovieApiResponse;
  date: string;

  constructor({
    movieSchedule,
  }: {
    movieSchedule: {
      movie: Movie;
      date: string;
    };
  }) {
    this.movie = new MovieApiResponse({
      movie: movieSchedule.movie,
    });
    this.date = movieSchedule.date;
  }
}
