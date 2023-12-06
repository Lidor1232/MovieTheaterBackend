import {MovieApiResponse} from '../../movie/responses/movie-api-response';
import {Movie} from '../../../dto/movie.dto';

export class GetMoviesScheduleApiResponse {
  moviesSchedule: {
    _id: string;
    movie: MovieApiResponse;
    startDate: string;
    status: string;
  }[];

  constructor({
    moviesSchedule,
  }: {
    moviesSchedule: {
      _id: string;
      movie: Movie;
      startDate: string;
      status: string;
    }[];
  }) {
    this.moviesSchedule = moviesSchedule.map(movieSchedule => ({
      _id: movieSchedule._id,
      startDate: movieSchedule.startDate,
      status: movieSchedule.status,
      movie: new MovieApiResponse({
        movie: movieSchedule.movie,
      }),
    }));
  }
}
