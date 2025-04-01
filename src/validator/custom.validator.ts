import Joi from 'joi';
import { Types } from 'mongoose';

export const stringValidator = Joi.string();

export const dateValidator = Joi.date().iso();

export const booleanValidator = Joi.boolean();

export const numberValidator = Joi.number();

export const idValidator = Joi.string()
  .trim()
  .custom((value, helpers) => {
    if (Types.ObjectId.isValid(value)) {
      return value;
    }
    return helpers.message({
      '*': `${value} is not a valid objectId`,
    });
  });

export const objectIdValidator = Joi.object<{ id: string }>({
  id: idValidator.required(),
});
