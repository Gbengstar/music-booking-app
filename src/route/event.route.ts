import { authorizeRoles } from './../middleware/auth.middleware';
import { Router } from 'express';
import Container from 'typedi';
import { EventController } from '../controller/event.controller';
import { RolesEnum } from '../dto/role.dto';

const router = Router();

const eventController = Container.get(EventController);

router
  .route('/')
  .post(
    authorizeRoles(RolesEnum.ADMIN, RolesEnum.ARTIST),
    eventController.createEvent
  )
  .patch(
    authorizeRoles(RolesEnum.ADMIN, RolesEnum.ARTIST),
    eventController.updateEventData
  )
  .get(eventController.allEvents);

router
  .route('/:id/status')
  .patch(authorizeRoles(RolesEnum.ADMIN), eventController.updateEventStatus);

router
  .route('/:id')
  .delete(authorizeRoles(RolesEnum.ADMIN), eventController.deleteEvent);

export const eventRouter = router;
