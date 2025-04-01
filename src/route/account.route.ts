import { Router } from 'express';
import Container from 'typedi';
import { AccountController } from '../controller/account.controller';

const router = Router();

const accountController = Container.get(AccountController);

router.post('/sign-up', accountController.signUpUser);
router.post('/login', accountController.login);

export const accountRouter = router;
