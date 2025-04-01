import Joi from 'joi';
import { LoginDto, SignUpDto } from '../dto/account.dto';
import { stringValidator } from './common.validator';
import { RolesEnum } from '../dto/role.dto';

export const signUpUserValidator = Joi.object<SignUpDto>({
  email: stringValidator.email().required(),
  password: stringValidator.min(8).required(),
  role: stringValidator.valid(...Object.values(RolesEnum)).required(),
});

export const loginValidator = Joi.object<LoginDto>({
  email: stringValidator.email().required(),
  password: stringValidator.min(8).required(),
});
