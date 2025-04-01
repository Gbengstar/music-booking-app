import { Router } from 'express';
import Container from 'typedi';
import { BookingController } from '../controller/booking.controller';

const router = Router();

const bookingController = Container.get(BookingController);

router
  .route('/')
  .post(bookingController.createBooking)
  .get(bookingController.allBookings);

router.route('/me').get(bookingController.myBookings);
export const bookingRouter = router;
