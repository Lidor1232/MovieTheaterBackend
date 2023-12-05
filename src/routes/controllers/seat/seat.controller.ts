import {Request, Response, NextFunction} from 'express';
import * as SeatService from '../../services/seat/seat.service';
import {GetMovieScheduleSeatsApiResponse} from './responses/get-movie-schedule-seats-api-response';
import {OrderSeat} from '../../dto/seat.dto';

export async function getMovieScheduleSeats(
  req: Request<{movieScheduleId: string}>,
  res: Response,
  next: NextFunction,
) {
  try {
    const seats = await SeatService.onGetDocsByMovieScheduleId({
      movieScheduleId: req.params.movieScheduleId,
    });
    return res.status(200).json(
      new GetMovieScheduleSeatsApiResponse({
        seats,
        movieScheduleId: req.params.movieScheduleId,
      }),
    );
  } catch (error) {
    return next(error);
  }
}

export async function orderSeat(
  req: Request<unknown, unknown, OrderSeat>,
  res: Response,
  next: NextFunction,
) {
  try {
    await SeatService.onOrderSeatByIdOrThrow({
      seatId: req.body.seatId,
    });
    return res.status(200).json({
      message: 'Seat ordered successfully',
    });
  } catch (error) {
    return next(error);
  }
}
