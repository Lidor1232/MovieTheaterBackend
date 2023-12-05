export interface MovieSchedule {
  _id: string;
  status: MovieScheduleStatus;
  seats: string[];
  startDate: string;
  endDate: string;
  movie: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieSchedule {
  startDate: string;
  endDate: string;
  movie: string;
}

export interface CreateMovieScheduleRoute {
  date: string;
  movie: string;
}

export interface UpdateMovieSchedule {
  status?: MovieScheduleStatus;
}

export interface MovieScheduleQueries {
  startDate?: string;
  endDate?: string;
}

export interface GetMoviesSchedule {
  terms: MovieScheduleQueries;
}

export interface MovieScheduleStatuses {
  active: 'active';
  deleted: 'deleted';
  cancelled: 'cancelled';
}

export const movieScheduleStatuses: MovieScheduleStatuses = {
  active: 'active',
  deleted: 'deleted',
  cancelled: 'cancelled',
};

export type MovieScheduleStatus =
  | typeof movieScheduleStatuses.active
  | typeof movieScheduleStatuses.deleted
  | typeof movieScheduleStatuses.cancelled;
