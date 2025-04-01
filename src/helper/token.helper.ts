import * as jwt from 'jsonwebtoken';
import { EnvConfigEnum } from '../enum/env-configuration.enum';
import { Request } from 'express';
import { IAuth } from '../interface/token.interface';
import { CustomError } from './error.helper';
import { HttpStatusCode } from '../enum/http-status.enum';

export const signToken = (tokenObj: IAuth): Promise<string> => {
  const tokenSecret = process.env[EnvConfigEnum.TOKEN_SECRET];
  const expiresIn = process.env[EnvConfigEnum.TOKEN_EXPIRE_IN];

  return new Promise((resolve, reject) => {
    jwt.sign(
      tokenObj,
      tokenSecret,
      { expiresIn },
      (err: any, encoded: string) => {
        if (err) reject(new CustomError(403, err.message));
        resolve(encoded);
      }
    );
  });
};

export const refreshToken = ({
  id,
  expiresIn = '1 days',
}: {
  id: string;
  expiresIn?: any;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const tokenSecret = process.env[EnvConfigEnum.REFRESH_TOKEN_SECRET];

    jwt.sign({ id }, tokenSecret, { expiresIn }, (err, decoded) => {
      if (err) {
        reject(new CustomError(HttpStatusCode.FORBIDDEN, err.message));
      }

      resolve(decoded);
    });
  });
};

export const verifyRefreshToken = async (token: string): Promise<any> => {
  const tokenSecret = process.env[EnvConfigEnum.REFRESH_TOKEN_SECRET];
  try {
    const decoded = await jwt.decode(token, tokenSecret);
    return decoded;
  } catch (err) {
    throw new CustomError(403, err.message);
  }
};

export const verifyToken = (token: string): Promise<IAuth> => {
  return new Promise((resolve, reject) => {
    const tokenSecret = process.env[EnvConfigEnum.TOKEN_SECRET];

    jwt.verify(token, tokenSecret, (err: Error, data: any) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          reject(new CustomError(HttpStatusCode.FORBIDDEN, 'Token expired'));
        }
        reject(new CustomError(HttpStatusCode.FORBIDDEN, err.message));
      }
      resolve(data);
    });
  });
};

export const getToken = (req: Request) => {
  let token: string;

  switch (true) {
    case !!req.headers.cookie:
      req.headers.cookie.split('; ').forEach((item) => {
        const data = item.split('=');
        if (data[0] === 'token') token = data[1];
      });
      break;
    case req.headers.authorization?.startsWith('Bearer'):
      token = req.headers.authorization.split(' ')[1];
      break;
    case !!req.signedCookies?.token:
      token = req.signedCookies?.token;
      break;
  }

  return token;
};
