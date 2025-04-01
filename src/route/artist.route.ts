import { Router } from 'express';
import Container from 'typedi';
import { ArtistController } from '../controller/artist.controller';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware';
import { RolesEnum } from '../dto/role.dto';

const router = Router();

const artistController = Container.get(ArtistController);

router.use(authenticate, authorizeRoles(RolesEnum.ARTIST, RolesEnum.ADMIN));

router
  .route('/')
  .get(artistController.getProfile)
  .post(artistController.createProfile)
  .patch(artistController.updateProfile);

export const artistRouter = router;
