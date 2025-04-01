import { Request, Response } from 'express';

export const notFoundPathHandler = (req: Request, res: Response) => {
  return res.status(404).json({
    error: 'Internal server error',
    message: `Method [${req.method}] not found for route [${req.originalUrl}]`,
  });
};
