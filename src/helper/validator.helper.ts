import * as Joi from 'joi';

export const validate = async <T = any>(
  validator: Joi.Schema<T>,
  value: any
): Promise<T> => {
  return validator.validateAsync(value, {
    allowUnknown: false,
    stripUnknown: true,
  });
};
