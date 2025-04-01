import { RolesEnum } from '../dto/role.dto';

export interface IAuth {
  id: string;
  role: RolesEnum;
}
