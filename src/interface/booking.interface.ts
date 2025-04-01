import { Types } from 'mongoose';
import { BookingPaymentEnum, BookingStatusEnum } from '../enum/booking.enum';

export interface IBooking {
  event: Types.ObjectId;
  user: Types.ObjectId;
  tickets: number;
  totalAmount: number;
  bookingDate: Date;
  status: BookingStatusEnum;
  paymentStatus: BookingPaymentEnum;
  paymentMethod: string;
  transactionId: string;
}
