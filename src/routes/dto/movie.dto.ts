export interface Movie {
  _id: string;
  status: MovieStatus;
  title: string;
  description: string;
  durationInMinutes: number;
  movieSchedules: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovie {
  title: string;
  description: string;
  durationInMinutes: number;
}

export interface UpdateMovie {
  title?: string;
  description?: string;
  durationInMinutes?: number;
  status?: MovieStatus;
}

export const movieStatuses = {
  active: 'active',
  deleted: 'deleted',
};

export type MovieStatus =
  | typeof movieStatuses.active
  | typeof movieStatuses.deleted;
