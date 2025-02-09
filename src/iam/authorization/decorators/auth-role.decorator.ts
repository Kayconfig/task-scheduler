import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/auth-roles.enum';

export const AUTH_ROLE = 'roles';

export const AuthRole = (...roles: Role[]) => SetMetadata(AUTH_ROLE, roles);
