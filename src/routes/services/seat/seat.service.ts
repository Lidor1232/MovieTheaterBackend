import logger from '../../../config/logger';
import {SeatModel} from '../../../models/seat.model';
import {CreateSeat, Seat, UpdateSeat} from '../../dto/seat.dto';
import BadRequestError from '../../../errors/bad-request-error';
import * as MovieScheduleService from '../../services/movieSchedule/movieSchedule.service';

export async function onGetDocsByMovieScheduleId({
  movieScheduleId,
}: {
  movieScheduleId: string;
}) {
  logger.debug(
    {
      movieScheduleId,
    },
    'Getting seats by movie schedule id',
  );
  const seats = await SeatModel.find({movieSchedule: movieScheduleId});
  logger.info(
    {
      seats,
    },
    'Got seats by movie schedule id',
  );
  return seats;
}

export async function onUpdateDocByIdOrThrow({
  updateDoc,
  seatId,
}: {
  updateDoc: UpdateSeat;
  seatId: string;
}): Promise<void> {
  logger.debug(
    {
      updateDoc,
      seatId,
    },
    'Updating seat by id or throw',
  );
  const updatedResult = await SeatModel.updateOne(
    {
      _id: seatId,
    },
    {
      $set: updateDoc,
    },
  );
  if (updatedResult.nModified === 0) {
    throw new Error(`Seat ${seatId} not updated`);
  }
  logger.info(
    {
      updatedResult,
      updateDoc,
      seatId,
    },
    'Updated seat by id or throw',
  );
}

export async function onOrderSeatByIdOrThrow({
  seatId,
}: {
  seatId: string;
}): Promise<void> {
  logger.debug(
    {
      seatId,
    },
    'Ordering seat by id or throw',
  );
  const updatedResult = await SeatModel.updateOne(
    {
      _id: seatId,
      isOrdered: false,
    },
    {
      $set: {
        isOrdered: true,
      },
    },
  );
  if (updatedResult.nModified === 0) {
    throw new BadRequestError(`Seat ${seatId} is already ordered`);
  }
  logger.info(
    {
      seatId,
    },
    'Ordered seat by id or throw',
  );
}

export async function onCreateDoc({seat}: {seat: CreateSeat}): Promise<Seat> {
  logger.debug(
    {
      seat,
    },
    'Creating seat',
  );
  const createdSeat = await SeatModel.create(seat);

  await Promise.all([
    MovieScheduleService.onAddSeatBySeatIdOrThrow({
      seatId: createdSeat._id,
      movieScheduleId: seat.movieSchedule,
    }),
  ]);

  logger.info(
    {
      seat,
      createdSeat,
    },
    'Created seat',
  );
  return createdSeat;
}
