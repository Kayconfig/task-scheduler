import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthTypes } from '../enums/auth-types.enum';
import { AccessTokenGuard } from './access-token.guard';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '../decorators/auth.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly defaultAuthType = AuthTypes.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthTypes,
    CanActivate | CanActivate[]
  > = {
    [AuthTypes.Bearer]: this.accessTokenGuard,
    [AuthTypes.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authMetadata = this.reflector.getAllAndOverride<AuthTypes[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [this.defaultAuthType];

    const guards = authMetadata
      .map((authType) => this.authTypeGuardMap[authType])
      .flat();

    let error = new UnauthorizedException();

    for (const guard of guards) {
      const canActivate = await Promise.resolve(
        guard.canActivate(context),
      ).catch((err) => {
        error = err;
      });

      if (canActivate) return true;
    }
    throw error;
  }
}
