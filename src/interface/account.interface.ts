import { RolesEnum } from '../dto/role.dto';

export interface IAccount {
  email: string;
  password: string;
  role: RolesEnum;
}
