import {Request, Response, NextFunction} from 'express';
import {CreateMovie, Movie, UpdateMovie} from '../../dto/movie.dto';
import * as MovieService from '../../services/movie/movie.service';
import {MovieApiResponse} from './responses/movie-api-response';
import * as MovieScheduleService from '../../services/movieSchedule/movieSchedule.service';

export async function createMovie(
  req: Request<unknown, unknown, CreateMovie>,
  res: Response,
  next: NextFunction,
) {
  try {
    const movie = await MovieService.onCreateDoc({
      movie: req.body,
    });
    return res.status(200).json(
      new MovieApiResponse({
        movie,
      }),
    );
  } catch (error) {
    return next(error);
  }
}

export async function updateMovie(
  req: Request<{movieId: string}, unknown, UpdateMovie>,
  res: Response,
  next: NextFunction,
) {
  try {
    await MovieService.onUpdateDoc({
      updateMovie: req.body,
      movieId: req.params.movieId,
    });
    return res.status(200).json({
      message: 'Movie updated',
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteMovie(
  req: Request<{movieId: string}>,
  res: Response,
  next: NextFunction,
) {
  try {
    const movie: Movie = await MovieService.onGetDocByIdOrThrow({
      movieId: req.params.movieId,
    });
    await Promise.all([
      MovieService.onUpdateDoc({
        movieId: req.params.movieId,
        updateMovie: {
          status: 'deleted',
        },
      }),
      ...movie.movieSchedules.map(movieSchedule =>
        MovieScheduleService.onUpdateDocByIdOrThrow({
          movieScheduleId: movieSchedule,
          updateMovieSchedule: {
            status: 'deleted',
          },
        }),
      ),
    ]);
    return res.status(200).json({
      message: 'Movie deleted',
    });
  } catch (error) {
    return next(error);
  }
}
