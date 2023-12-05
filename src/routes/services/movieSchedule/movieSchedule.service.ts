import {
  CreateMovieSchedule,
  MovieSchedule,
  MovieScheduleQueries,
  UpdateMovieSchedule,
} from '../../dto/movieSchedule.dto';
import {PaginationRequestQuery} from '../../../utills/api/pagination/pagination';
import {MovieScheduleModel} from '../../../models/movieSchedule.model';
import {FilterQuery, PopulateOptions} from 'mongoose';
import logger from '../../../config/logger';
import NotFoundError from '../../../errors/not-found-error';
import * as MovieService from '../../services/movie/movie.service';
import * as SeatService from '../../services/seat/seat.service';

export function onGetMongooseQueriesByDocQueries({
  queries,
}: {
  queries: MovieScheduleQueries;
}): FilterQuery<MovieScheduleQueries> {
  logger.debug(
    {
      queries,
    },
    'Getting mongoose queries by movie schedule queries',
  );
  const mongooseQueries = {
    ...(queries.startDate || queries.endDate
      ? {
          date: {
            ...(queries.startDate
              ? {
                  $gte: queries.startDate,
                }
              : null),
            ...(queries.endDate
              ? {
                  $lte: queries.endDate,
                }
              : null),
          },
        }
      : null),
  };
  logger.info(
    {
      queries,
      mongooseQueries,
    },
    'Got mongoose queries by movie schedule queries',
  );
  return;
}

export async function onGetDocs({
  queries,
  paginationParams,
  sortBy,
  populate,
}: {
  queries: MovieScheduleQueries;
  paginationParams: PaginationRequestQuery;
  sortBy?: string;
  populate?: PopulateOptions | Array<PopulateOptions>;
}) {
  logger.debug(
    {
      queries,
      paginationParams,
      sortBy,
      populate,
    },
    'Getting movies schedule',
  );
  const mongooseQueries = onGetMongooseQueriesByDocQueries({
    queries,
  });
  const moviesSchedule = await MovieScheduleModel.find(mongooseQueries)
    .skip(paginationParams.skip)
    .limit(paginationParams.limit)
    .sort(sortBy)
    .populate(populate);
  logger.info(
    {
      queries,
      paginationParams,
      sortBy,
      populate,
      moviesSchedule,
    },
    'Got movies schedule',
  );
  return moviesSchedule;
}

export async function onGetDocById({
  movieScheduleId,
  populate,
}: {
  movieScheduleId: string;
  populate?: PopulateOptions | Array<PopulateOptions>;
}) {
  logger.debug(
    {
      movieScheduleId,
      populate,
    },
    'Getting movie schedule by id',
  );
  const movieSchedule = await MovieScheduleModel.findById(
    movieScheduleId,
  ).populate(populate);
  logger.info(
    {
      movieSchedule,
      movieScheduleId,
      populate,
    },
    'Got movie schedule by id',
  );
  return movieSchedule;
}

export async function onGetDocByIdOrThrow({
  movieScheduleId,
  populate,
}: {
  movieScheduleId: string;
  populate?: PopulateOptions | Array<PopulateOptions>;
}) {
  logger.debug(
    {
      movieScheduleId,
      populate,
    },
    'Getting movie schedule by id or throw',
  );
  const movieSchedule = await onGetDocById({
    movieScheduleId,
    populate,
  });
  if (!movieSchedule) {
    throw new NotFoundError('Movie schedule not found');
  }
  logger.info(
    {
      movieSchedule,
      movieScheduleId,
      populate,
    },
    'Got movie schedule by id or throw',
  );
  return movieSchedule;
}

export async function onUpdateDocByIdOrThrow({
  updateMovieSchedule,
  movieScheduleId,
}: {
  movieScheduleId: string;
  updateMovieSchedule: UpdateMovieSchedule;
}): Promise<void> {
  logger.debug(
    {
      updateMovieSchedule,
      movieScheduleId,
    },
    'Updating movie schedule by id or throw',
  );
  const updatedResult = await MovieScheduleModel.updateOne(
    {
      _id: movieScheduleId,
    },
    {
      $set: updateMovieSchedule,
    },
  );
  if (updatedResult.nModified === 0) {
    throw new Error(`Movie schedule ${movieScheduleId} not updated`);
  }
  logger.info(
    {
      movieScheduleId,
      updateMovieSchedule,
    },
    'Updated movie schedule by id or throw',
  );
}

export async function onAddSeatBySeatIdOrThrow({
  seatId,
  movieScheduleId,
}: {
  movieScheduleId: string;
  seatId: string;
}): Promise<void> {
  logger.debug(
    {
      seatId,
      movieScheduleId,
    },
    'Adding seat by seat id or throw',
  );
  const updatedResult = await MovieScheduleModel.updateOne(
    {
      _id: movieScheduleId,
    },
    {
      $push: {
        seats: seatId,
      },
    },
  );
  if (updatedResult.nModified === 0) {
    throw new Error(
      `Seat ${seatId} not added to movie schedule ${movieScheduleId} seats`,
    );
  }
  logger.info(
    {
      movieScheduleId,
      seatId,
    },
    'Added seat by seat id or throw',
  );
}

export async function onCreateDoc({
  movieSchedule,
}: {
  movieSchedule: CreateMovieSchedule;
}): Promise<MovieSchedule> {
  logger.debug(
    {
      movieSchedule,
    },
    'Creating movie schedule',
  );
  const createdMovieSchedule = await MovieScheduleModel.create(movieSchedule);
  await Promise.all([
    MovieService.onAddMovieScheduleByIdOrThrow({
      movieId: movieSchedule.movie,
      movieScheduleId: createdMovieSchedule._id,
    }),
    onCreateDocSeatsByIdOrThrow({
      movieScheduleId: createdMovieSchedule._id,
    }),
  ]);
  logger.info(
    {
      movieSchedule,
    },
    'Created movie schedule',
  );
  return createdMovieSchedule;
}

export async function onCreateDocSeatsByIdOrThrow({
  movieScheduleId,
}: {
  movieScheduleId: string;
}): Promise<void> {
  logger.debug(
    {
      movieScheduleId,
    },
    'Creating movie schedule seats by id or throw',
  );
  const seatsNumArr = Array.from({length: 100}, (_, index) => index + 1);
  await Promise.all(
    seatsNumArr.map(seatNum =>
      SeatService.onCreateDoc({
        seat: {
          movieSchedule: movieScheduleId,
          numOfSeat: seatNum,
        },
      }),
    ),
  );
  logger.info(
    {
      movieScheduleId,
    },
    'Created doc seats',
  );
}
