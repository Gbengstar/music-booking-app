import { Request } from 'express';
import { IAuth } from './token.interface';

export interface IRequest extends Request {
  auth: IAuth;
}
