import {Request, Response, NextFunction} from 'express';
import * as MovieScheduleService from '../../services/movieSchedule/movieSchedule.service';
import {
  CreateMovieSchedule,
  GetMoviesSchedule,
} from '../../dto/movieSchedule.dto';
import {PaginationRequestQuery} from '../../../utills/api/pagination/pagination';
import {SortByQueryParameter} from '../../../utills/api/sort/sort';
import {modelNames} from '../../../models/constans/constans';
import {GetMoviesScheduleApiResponse} from './responses/get-movies-schedule-api-response';
import {GetMovieScheduleDetailsApiResponse} from './responses/get-movie-schedule-details-api-response';

export async function getMoviesSchedule(
  req: Request<
    unknown,
    unknown,
    GetMoviesSchedule,
    PaginationRequestQuery & SortByQueryParameter
  >,
  res: Response,
  next: NextFunction,
) {
  try {
    const moviesSchedule = await MovieScheduleService.onGetDocs({
      paginationParams: {
        skip: req.query.skip,
        limit: req.query.limit,
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
  req: Request<unknown, unknown, CreateMovieSchedule>,
  res: Response,
  next: NextFunction,
) {
  try {
    await MovieScheduleService.onCreateDoc({
      movieSchedule: req.body,
    });
    return res.status(200).json({message: 'Created movie schedule'});
  } catch (error) {
    return next(error);
  }
}
