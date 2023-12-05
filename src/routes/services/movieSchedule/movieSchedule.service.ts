import {MovieScheduleQueries} from '../../dto/movieSchedule.dto';
import {PaginationRequestQuery} from '../../../utills/api/pagination/pagination';
import {MovieScheduleModel} from '../../../models/movieSchedule.model';
import {FilterQuery, PopulateOptions} from 'mongoose';
import logger from '../../../config/logger';
import NotFoundError from '../../../errors/not-found-error';

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
