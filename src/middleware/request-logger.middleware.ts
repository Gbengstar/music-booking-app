import { NextFunction, Request, Response } from 'express';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(new Date(), req.method, req.originalUrl);
  next();
};
