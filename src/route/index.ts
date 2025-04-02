import { Router } from 'express';
import { accountRouter } from './account.route';
import { artistRouter } from './artist.route';
import { eventRouter } from './event.route';
import { authenticate } from '../middleware/auth.middleware';
import { venueRouter } from './venue.route';
import { bookingRouter } from './booking.route';

const router = Router();

router.use('/accounts', accountRouter);
router.use(authenticate);
router.use('/artists', artistRouter);
router.use('/events', eventRouter);
router.use('/venues', venueRouter);
router.use('/bookings', bookingRouter);

export const mainRouter = router;
