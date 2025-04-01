import { Router } from 'express';
import { accountRouter } from './account.route';
import { notFoundPathHandler } from '../middleware/not-found-path.middleware';
import { globalErrorHandler } from '../middleware/global-error.middleware';
import { artistRouter } from './artist.route';

const router = Router();
router.use((req, res, next) => {
  console.log(new Date(), req.method, req.originalUrl);
  next();
});

router.use('/account', accountRouter);
router.use('/artist', artistRouter);

router.use('*', notFoundPathHandler);
router.use(globalErrorHandler);

export const mainRouter = router;
