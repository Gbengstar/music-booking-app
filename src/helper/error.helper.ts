import { HttpStatusCode } from '../enum/http-status.enum';

export class CustomError extends Error {
  constructor(readonly status: HttpStatusCode, readonly message: string) {
    super(message);
  }
}
