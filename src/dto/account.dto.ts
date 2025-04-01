import { IAccount } from '../interface/account.interface';

export type SignUpDto = IAccount;

export type LoginDto = Pick<IAccount, 'email' | 'password'>;
