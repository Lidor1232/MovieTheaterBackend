export interface MovieSchedule {
  _id: string;
  status: MovieScheduleStatus;
  seats: string[];
  date: string;
  movie: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieSchedule {
  date: string;
  movie: string;
}

export interface UpdateMovieSchedule {
  status: MovieScheduleStatus;
}

export interface MovieScheduleQueries {
  startDate?: string;
  endDate?: string;
}

export interface GetMoviesSchedule {
  terms: MovieScheduleQueries;
}

export const movieScheduleStatuses = {
  active: 'active',
  deleted: 'deleted',
  cancelled: 'cancelled',
};

export type MovieScheduleStatus =
  | typeof movieScheduleStatuses.active
  | typeof movieScheduleStatuses.deleted
  | typeof movieScheduleStatuses.cancelled;
