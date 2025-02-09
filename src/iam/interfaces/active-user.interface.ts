import { Role } from '../authorization/enums/auth-roles.enum';

export interface IActiveUser {
  sub: string;
  email: string;
  role: Role;
}
