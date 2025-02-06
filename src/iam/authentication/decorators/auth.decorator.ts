import { SetMetadata } from '@nestjs/common';
import { AuthTypes } from '../enums/auth-types.enum';

export const AUTH_TYPE_KEY = 'auth';

export const Auth = (...authTypes: AuthTypes[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
