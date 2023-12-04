import {MovieApiResponse} from '../../movie/responses/movie-api-response';
import {Movie} from '../../../dto/movie.dto';

export class GetMoviesScheduleApiResponse {
  moviesSchedule: {
    movie: MovieApiResponse;
    date: string;
    isCancelled: boolean;
  }[];

  constructor({
    moviesSchedule,
  }: {
    moviesSchedule: {
      movie: Movie;
      date: string;
      isCancelled: boolean;
    }[];
  }) {
    this.moviesSchedule = moviesSchedule.map(movieSchedule => ({
      ...movieSchedule,
      movie: new MovieApiResponse({
        movie: movieSchedule.movie,
      }),
    }));
  }
}
