import Joi from 'joi';
import { EnvConfigEnum } from '../enum/env-configuration.enum';
import { stringValidator } from './common.validator';

export const envConfigValidator = Joi.object<Record<EnvConfigEnum, string>>({
  [EnvConfigEnum.PORT]: stringValidator.required(),
  [EnvConfigEnum.REDIS_HOST]: stringValidator.uri().required(),
  [EnvConfigEnum.REFRESH_TOKEN_SECRET]: stringValidator.required(),
  [EnvConfigEnum.TOKEN_EXPIRE_IN]: stringValidator.required(),
  [EnvConfigEnum.TOKEN_SECRET]: stringValidator.required(),
  [EnvConfigEnum.MONGODB_URL]: stringValidator.uri().required(),
});
