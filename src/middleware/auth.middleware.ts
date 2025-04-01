import { NextFunction, Response, Request } from 'express';
import { getToken, verifyToken } from '../helper/token.helper';
import { IRequest } from '../interface/request.interface';
import { RolesEnum } from '../dto/role.dto';

export const authenticate = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({
      status: 'FAILED',
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = await verifyToken(token);
    req.auth = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

export const authorizeRoles = (...roles: RolesEnum[]) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({
        status: 'FAILED',
        message: 'Access denied. Insufficient privileges.',
      });
    }
    next();
  };
};
