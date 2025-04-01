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
  .get(eventController.allEvents);

export const eventRouter = router;
