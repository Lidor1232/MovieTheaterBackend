import {Application} from 'express';
import {
  getMovieScheduleSeats,
  orderSeat,
} from '../controllers/seat/seat.controller';
import jsonSchemaValidator from '../middlewares/validation.middleware';
import {orderSeatDtoSchemaValidator} from '../validators/seat.ajv';

export default function (app: Application) {
  app.get('/movie/schedule/seats/:movieScheduleId', getMovieScheduleSeats);

  app.post(
    '/movie/schedule/seat/order',
    jsonSchemaValidator(orderSeatDtoSchemaValidator),
    orderSeat,
  );
}
