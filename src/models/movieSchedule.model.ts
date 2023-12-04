import {model, Schema} from 'mongoose';
import {MovieSchedule} from '../routes/dto/movieSchedule.dto';
import {modelNames} from './constans/constans';

const MovieScheduleSchema = new Schema<MovieSchedule>(
  {
    seats: {
      type: Array,
      item: {
        type: Schema.Types.ObjectId,
        ref: modelNames.Seat,
      },
      required: true,
    },
    isCancelled: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: modelNames.Movie,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MovieScheduleModel = model(
  modelNames.MovieSchedule,
  MovieScheduleSchema,
);
