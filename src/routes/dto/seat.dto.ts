import mongoose from 'mongoose';

export interface Seat extends mongoose.Document {
  _id: string;
  movieSchedule: string;
  isOrdered: boolean;
  numOfSeat: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSeat {
  movieSchedule: string;
  numOfSeat: number;
}

export interface UpdateSeat {
  isOrdered?: boolean;
}

export interface OrderSeat {
  seatId: string;
}
