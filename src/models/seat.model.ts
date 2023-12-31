import {model, Schema} from 'mongoose';
import {Seat} from '../routes/dto/seat.dto';
import {modelNames} from './constans/constans';

const SeatSchema = new Schema<Seat>(
  {
    isOrdered: {
      type: Boolean,
      required: true,
      default: false,
    },
    movieSchedule: {
      type: Schema.Types.ObjectId,
      ref: modelNames.MovieSchedule,
      required: true,
    },
    numOfSeat: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const SeatModel = model<Seat>(modelNames.Seat, SeatSchema);
