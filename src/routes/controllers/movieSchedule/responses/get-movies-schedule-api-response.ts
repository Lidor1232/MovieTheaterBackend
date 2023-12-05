import {MovieApiResponse} from '../../movie/responses/movie-api-response';
import {Movie} from '../../../dto/movie.dto';

export class GetMoviesScheduleApiResponse {
  moviesSchedule: {
    movie: MovieApiResponse;
    date: string;
    status: string;
  }[];

  constructor({
    moviesSchedule,
  }: {
    moviesSchedule: {
      movie: Movie;
      date: string;
      status: string;
    }[];
  }) {
    this.moviesSchedule = moviesSchedule.map(movieSchedule => ({
      date: movieSchedule.date,
      status: movieSchedule.status,
      movie: new MovieApiResponse({
        movie: movieSchedule.movie,
      }),
    }));
  }
}
