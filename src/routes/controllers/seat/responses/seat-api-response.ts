import {Seat} from '../../../dto/seat.dto';

export class SeatApiResponse {
  _id: string;

  isOrdered: boolean;

  numOfSeat: number;

  constructor({seat}: {seat: Seat}) {
    this._id = seat._id;
    this.isOrdered = seat.isOrdered;
    this.numOfSeat = seat.numOfSeat;
  }
}
