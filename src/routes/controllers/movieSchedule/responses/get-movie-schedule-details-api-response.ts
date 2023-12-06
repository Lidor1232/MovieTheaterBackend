import {Movie} from '../../../dto/movie.dto';
import {MovieApiResponse} from '../../movie/responses/movie-api-response';

export class GetMovieScheduleDetailsApiResponse {
  movie: MovieApiResponse;
  startDate: string;

  constructor({
    movieSchedule,
  }: {
    movieSchedule: {
      movie: Movie;
      startDate: string;
    };
  }) {
    this.movie = new MovieApiResponse({
      movie: movieSchedule.movie,
    });
    this.startDate = movieSchedule.startDate;
  }
}
