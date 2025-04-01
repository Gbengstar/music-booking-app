import Joi from 'joi';
import { IBooking } from '../interface/booking.interface';
import {
  dateValidator,
  idValidator,
  numberValidator,
  stringValidator,
} from './common.validator';
import { BookingPaymentEnum, BookingStatusEnum } from '../enum/booking.enum';

export const createBookingValidator = Joi.object<IBooking>({
  event: idValidator.required(),
  tickets: numberValidator.positive().greater(0).integer().required(),
  bookingDate: dateValidator.default(new Date()),
  status: stringValidator.default(BookingStatusEnum.PENDING),
  paymentStatus: stringValidator.default(BookingPaymentEnum.PENDING),
});

export const filterBookingValidator = Joi.object<IBooking>({
  event: idValidator,
  tickets: numberValidator.positive().greater(0).integer(),
  bookingDate: dateValidator,
  status: stringValidator.valid(...Object.values(BookingStatusEnum)),
  paymentStatus: stringValidator.valid(...Object.values(BookingPaymentEnum)),
});
