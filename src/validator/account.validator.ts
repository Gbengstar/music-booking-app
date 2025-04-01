import Joi from 'joi';
import { LoginDto, SignUpDto } from '../dto/account.dto';
import { stringValidator } from './custom.validator';
import { RolesEnum } from '../dto/role.dto';

export const signUpUserValidator = Joi.object<SignUpDto>({
  email: stringValidator.email().required(),
  password: stringValidator.min(8).required(),
  role: stringValidator.default(RolesEnum.USER).valid(RolesEnum.USER),
});

export const loginValidator = Joi.object<LoginDto>({
  email: stringValidator.email().required(),
  password: stringValidator.min(8).required(),
});
