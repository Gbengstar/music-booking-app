import { authorizeRoles } from './../middleware/auth.middleware';
import { Router } from 'express';
import Container from 'typedi';
import { RolesEnum } from '../dto/role.dto';
import { VenueController } from '../controller/venue.controller';

const router = Router();

const venueController = Container.get(VenueController);

router
  .route('/')
  .post(authorizeRoles(RolesEnum.ADMIN), venueController.createVenue)
  .patch(authorizeRoles(RolesEnum.ADMIN), venueController.updateVenue)
  .get(venueController.allVenues);

router
  .route('/:id')
  .delete(authorizeRoles(RolesEnum.ADMIN), venueController.deleteVenue);

export const venueRouter = router;
