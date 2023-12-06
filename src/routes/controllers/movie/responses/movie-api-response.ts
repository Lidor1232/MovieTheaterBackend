import {Movie} from '../../../dto/movie.dto';

export class MovieApiResponse {
  _id: string;

  title: string;

  description: string;

  durationInMinutes: number;

  constructor({movie}: {movie: Movie}) {
    this._id = movie._id;
    this.title = movie.title;
    this.description = movie.description;
    this.durationInMinutes = movie.durationInMinutes;
  }
}
