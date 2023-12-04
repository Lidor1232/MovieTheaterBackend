import {model, Schema} from 'mongoose';
import {Movie} from '../routes/dto/movie.dto';
import {modelNames} from './constans/constans';

const MovieSchema = new Schema<Movie>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    durationInMinutes: {
      type: Number,
      min: 1,
      required: true,
    },
    movieSchedules: {
      type: Array,
      item: {
        type: Schema.Types.ObjectId,
        ref: modelNames.MovieSchedule,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MovieModel = model(modelNames.Movie, MovieSchema);
