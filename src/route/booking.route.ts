import { authorizeRoles } from './../middleware/auth.middleware';
import { Router } from 'express';
import Container from 'typedi';
import { BookingController } from '../controller/booking.controller';
import { RolesEnum } from '../dto/role.dto';

const router = Router();

const bookingController = Container.get(BookingController);

router
  .route('/')
  .post(bookingController.createBooking)
  .get(authorizeRoles(RolesEnum.ADMIN), bookingController.allBookings);

router.route('/me').get(bookingController.myBookings);

router.route('/:id/cancel').post(bookingController.cancelBooking);

export const bookingRouter = router;
