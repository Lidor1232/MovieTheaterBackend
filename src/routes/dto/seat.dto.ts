import mongoose from 'mongoose';

export interface Seat extends mongoose.Document {
  _id: string;
  movieSchedule: string;
  isOrdered: boolean;
  numOfSeat: number;
  movie: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSeat {
  movieSchedule: string;
  isOrdered: boolean;
  numOfSeat: number;
  movie: string;
}

export interface UpdateSeat {
  isOrdered?: boolean;
}

export interface OrderSeat {
  seatId: string;
}
