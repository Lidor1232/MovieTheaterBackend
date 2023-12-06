import {CreateMovie, Movie, UpdateMovie} from '../../dto/movie.dto';
import logger from '../../../config/logger';
import {MovieModel} from '../../../models/movie.model';
import NotFoundError from '../../../errors/not-found-error';

export async function onCreateDoc({
  movie,
}: {
  movie: CreateMovie;
}): Promise<Movie> {
  logger.debug(
    {
      movie,
    },
    'Creating movie',
  );
  const createdMovie = await MovieModel.create(movie);
  logger.info(
    {
      movie,
      createdMovie,
    },
    'Created movie',
  );
  return createdMovie;
}

export async function onUpdateDoc({
  updateMovie,
  movieId,
}: {
  updateMovie: UpdateMovie;
  movieId: string;
}): Promise<void> {
  logger.debug(
    {
      updateMovie,
    },
    'Updating movie',
  );
  const updatedResult = await MovieModel.updateOne(
    {
      _id: movieId,
    },
    {
      $set: updateMovie,
    },
  );
  if (updatedResult.nModified === 0) {
    throw new Error(`Movie ${movieId} not updated`);
  }
  logger.info(
    {
      updateMovie,
    },
    'Updated movie',
  );
}

export async function onGetDocById({movieId}: {movieId: string}) {
  logger.debug(
    {
      movieId,
    },
    'Getting movie by id',
  );
  const movie = await MovieModel.findById(movieId);
  logger.info(
    {
      movie,
      movieId,
    },
    'Got movie by id',
  );
  return movie;
}

export async function onGetDocByIdOrThrow({movieId}: {movieId: string}) {
  logger.debug(
    {
      movieId,
    },
    'Getting movie by id or throw',
  );
  const movie = onGetDocById({
    movieId,
  });
  if (!movie) {
    throw new NotFoundError('Movie not found');
  }
  logger.info(
    {
      movie,
      movieId,
    },
    'Got movie by id or throw',
  );
  return movie;
}

export async function onAddMovieScheduleByIdOrThrow({
  movieScheduleId,
  movieId,
}: {
  movieId: string;
  movieScheduleId: string;
}): Promise<void> {
  logger.debug(
    {
      movieId,
      movieScheduleId,
    },
    'Adding movie schedule to movie movie schedules',
  );
  const updatedResult = await MovieModel.updateOne(
    {
      _id: movieId,
    },
    {
      $push: {
        movieSchedules: movieScheduleId,
      },
    },
  );
  if (updatedResult.nModified === 0) {
    throw new Error(
      `Movie schedule ${movieScheduleId} not added to movie ${movieId} movie schedules`,
    );
  }
  logger.info(
    {
      movieId,
      movieScheduleId,
    },
    'Added movie schedule to movie movie shcedules',
  );
}
