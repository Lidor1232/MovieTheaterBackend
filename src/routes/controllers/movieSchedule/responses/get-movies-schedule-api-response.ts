import {MovieApiResponse} from '../../movie/responses/movie-api-response';
import {Movie} from '../../../dto/movie.dto';

export class GetMoviesScheduleApiResponse {
  moviesSchedule: {
    movie: MovieApiResponse;
    startDate: string;
    status: string;
  }[];

  constructor({
    moviesSchedule,
  }: {
    moviesSchedule: {
      movie: Movie;
      startDate: string;
      status: string;
    }[];
  }) {
    this.moviesSchedule = moviesSchedule.map(movieSchedule => ({
      startDate: movieSchedule.startDate,
      status: movieSchedule.status,
      movie: new MovieApiResponse({
        movie: movieSchedule.movie,
      }),
    }));
  }
}
