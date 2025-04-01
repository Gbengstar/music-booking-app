import { Request, Response } from 'express';
import * as Joi from 'joi';
import { CustomError } from '../helper/error.helper';

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response
) => {
  if (error instanceof Joi.ValidationError) {
    return res.status(400).json({
      status: 'FAILED',
      message: error.message,
    });
  }

  if (error instanceof CustomError) {
    return res.status(error.status).json({
      status: 'FAILED',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'FAILED',
    message: error.message || 'Unknown error',
  });
};
