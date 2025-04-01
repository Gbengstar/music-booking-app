import { Request, Response } from 'express';
import * as Joi from 'joi';

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response
) => {
  if (error instanceof Joi.ValidationError) {
    return res.status(400).json({
      status: 'Failed',
      type: error.name,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'Failed',
    type: error.name,
    message: error.message || 'Unknown error',
  });
};
