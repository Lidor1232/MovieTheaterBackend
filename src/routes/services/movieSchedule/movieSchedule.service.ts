import {MovieScheduleQueries} from '../../dto/movieSchedule.dto';
import {PaginationRequestQuery} from '../../../utills/api/pagination/pagination';
import {MovieScheduleModel} from '../../../models/movieSchedule.model';
import {FilterQuery, PopulateOptions} from 'mongoose';

export function onGetMongooseQueriesByDocQueries({
  queries,
}: {
  queries: MovieScheduleQueries;
}): FilterQuery<MovieScheduleQueries> {
  return {
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
  const mongooseQueries = onGetMongooseQueriesByDocQueries({
    queries,
  });
  const moviesSchedule = await MovieScheduleModel.find(mongooseQueries)
    .skip(paginationParams.skip)
    .limit(paginationParams.limit)
    .sort(sortBy)
    .populate(populate);
  return moviesSchedule;
}
