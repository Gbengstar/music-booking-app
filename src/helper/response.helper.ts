import { Response } from 'express';
import { HttpStatusCode } from '../enum/http-status.enum';

export class ResponseHandler {
  static send<T = object>(
    res: Response,
    statusCode: number = 200,
    data?: T,
    status: string = 'SUCCESS'
  ) {
    return res.status(statusCode).json({ status, data: data });
  }

  static ok<T = object>(res: Response, data?: T, status: string = 'OK') {
    return ResponseHandler.send<T>(res, HttpStatusCode.OK, data, status);
  }

  static created<T = object>(
    res: Response,
    data?: T,
    status: string = 'CREATED'
  ) {
    return ResponseHandler.send<T>(res, HttpStatusCode.CREATED, data, status);
  }

  static accepted<T = object>(
    res: Response,
    data?: T,
    message: string = 'ACCEPTED'
  ) {
    return ResponseHandler.send<T>(res, HttpStatusCode.ACCEPTED, data, status);
  }

  static redirect(res: Response, url: string) {
    return res.status(HttpStatusCode.REDIRECT_TEMP).redirect(url);
  }
}
