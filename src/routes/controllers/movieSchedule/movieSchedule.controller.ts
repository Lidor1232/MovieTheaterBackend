import {Request, Response, NextFunction} from 'express';
import * as MovieScheduleService from '../../services/movieSchedule/movieSchedule.service';
import {
  CreateMovieSchedule,
  CreateMovieScheduleRoute,
  GetMoviesSchedule,
} from '../../dto/movieSchedule.dto';
import {onGetPaginationParams} from '../../../utills/api/pagination/pagination';
import {modelNames} from '../../../models/constans/constans';
import {GetMoviesScheduleApiResponse} from './responses/get-movies-schedule-api-response';
import {GetMovieScheduleDetailsApiResponse} from './responses/get-movie-schedule-details-api-response';
import {onMovieScheduleTimeEmptyOrThrow} from '../../services/movieSchedule/movieSchedule.service';

export async function getMoviesSchedule(
  req: Request<
    unknown,
    unknown,
    GetMoviesSchedule,
    {
      page?: number;
      limit?: number;
      sortBy?: string;
    }
  >,
  res: Response,
  next: NextFunction,
) {
  try {
    const paginationParams = onGetPaginationParams({
      page: req.query.page,
      limit: req.query.limit,
    });
    const moviesSchedule = await MovieScheduleService.onGetDocs({
      paginationParams: {
        skip: paginationParams.skip,
        limit: paginationParams.limit,
      },
      queries: req.body.terms,
      sortBy: req.query.sortBy,
      populate: [
        {
          model: modelNames.Movie,
          path: 'movie',
        },
      ],
    });
    return res.status(200).json(
      new GetMoviesScheduleApiResponse({
        moviesSchedule,
      }),
    );
  } catch (error) {
    return next(error);
  }
}

export async function getMovieScheduleDetails(
  req: Request<{movieScheduleId: string}>,
  res: Response,
  next: NextFunction,
) {
  try {
    const movieSchedule = await MovieScheduleService.onGetDocByIdOrThrow({
      movieScheduleId: req.params.movieScheduleId,
      populate: [
        {
          model: modelNames.Movie,
          path: 'movie',
        },
      ],
    });
    return res.status(200).json(
      new GetMovieScheduleDetailsApiResponse({
        movieSchedule,
      }),
    );
  } catch (error) {
    return next(error);
  }
}

export async function createMovieSchedule(
  req: Request<unknown, unknown, CreateMovieScheduleRoute>,
  res: Response,
  next: NextFunction,
) {
  try {
    const movieScheduleEndDate =
      await MovieScheduleService.onGetDocEndDateByMovieIdOrThrow({
        movieId: req.body.movie,
        date: req.body.date,
      });
    await onMovieScheduleTimeEmptyOrThrow({
      endDate: movieScheduleEndDate,
      startDate: req.body.date,
    });
    const movieSchedule: CreateMovieSchedule = {
      movie: req.body.movie,
      startDate: req.body.date,
      endDate: movieScheduleEndDate,
    };
    await MovieScheduleService.onCreateDoc({
      movieSchedule: movieSchedule,
    });
    return res.status(200).json({message: 'Created movie schedule'});
  } catch (error) {
    return next(error);
  }
}

export async function cancelMovieSchedule(
  req: Request<{movieScheduleId: string}>,
  res: Response,
  next: NextFunction,
) {
  try {
    await MovieScheduleService.onUpdateDocByIdOrThrow({
      movieScheduleId: req.params.movieScheduleId,
      updateMovieSchedule: {
        status: 'cancelled',
      },
    });
    return res.status(200).json({
      message: 'Cancelled movie schedule',
    });
  } catch (error) {
    return next(error);
  }
}
