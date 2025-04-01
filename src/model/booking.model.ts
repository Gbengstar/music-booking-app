import { model, Schema } from 'mongoose';
import { IBooking } from '../interface/booking.interface';

const bookingSchema = new Schema<IBooking>({
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  tickets: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String },
  paymentStatus: { type: String },
  paymentMethod: { type: String },
  transactionId: { type: String },
});

export const BookingModel = model('Booking', bookingSchema);
