import {JSONSchemaType} from 'ajv';
import {OrderSeat} from '../dto/seat.dto';

export const orderSeatDtoSchemaValidator: JSONSchemaType<OrderSeat> = {
  type: 'object',
  properties: {
    seatId: {
      type: 'string',
    },
  },
  required: ['seatId'],
};
