export interface MovieSchedule {
  _id: string;
  seats: string[];
  isCancelled: boolean;
  date: string;
  movie: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieSchedule {
  seats: string[];
  date: string;
  movie: string;
}

export interface UpdateMovieSchedule {
  isCancelled?: boolean;
}
