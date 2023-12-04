export interface Movie {
  _id: string;
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
  durationInMinutes: string;
}

export interface UpdateMovie {
  title?: string;
  description?: string;
  durationInMinutes?: string;
}
