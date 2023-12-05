import {model, Schema} from 'mongoose';
import {
  MovieSchedule,
  movieScheduleStatuses,
} from '../routes/dto/movieSchedule.dto';
import {modelNames} from './constans/constans';

const MovieScheduleSchema = new Schema<MovieSchedule>(
  {
    status: {
      type: String,
      enum: [
        movieScheduleStatuses.active,
        movieScheduleStatuses.deleted,
        movieScheduleStatuses.cancelled,
      ],
      default: movieScheduleStatuses.active,
      required: true,
    },
    seats: {
      type: Array,
      item: {
        type: Schema.Types.ObjectId,
        ref: modelNames.Seat,
      },
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    endDate: {
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
