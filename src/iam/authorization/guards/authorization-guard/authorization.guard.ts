import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AUTH_ROLE } from '../../decorators/auth-role.decorator';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { IActiveUser } from 'src/iam/interfaces/active-user.interface';
import { Role } from '../../enums/auth-roles.enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: Role[] | undefined = this.reflector.getAllAndOverride(
      AUTH_ROLE,
      [context.getHandler(), context.getClass()],
    );
    if (!roles) {
      return true;
    }

    const activeUser: IActiveUser | undefined = context
      .switchToHttp()
      .getRequest<Request>()[REQUEST_USER_KEY];

    if (!activeUser) return false;

    return roles.some((role) => role === activeUser.role);
  }
}
