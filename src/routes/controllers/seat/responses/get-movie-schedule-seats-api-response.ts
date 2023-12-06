import {SeatApiResponse} from './seat-api-response';
import {Seat} from '../../../dto/seat.dto';

export class GetMovieScheduleSeatsApiResponse {
  movieScheduleId: string;

  seats: SeatApiResponse[];

  constructor({
    movieScheduleId,
    seats,
  }: {
    movieScheduleId: string;
    seats: Seat[];
  }) {
    this.movieScheduleId = movieScheduleId;
    this.seats = seats.map(seat => new SeatApiResponse({seat}));
  }
}
