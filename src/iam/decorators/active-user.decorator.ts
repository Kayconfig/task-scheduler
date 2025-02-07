import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IActiveUser } from './interface/active-user.interface';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const activeUser: IActiveUser | undefined = request[REQUEST_USER_KEY];

    return field ? activeUser?.[field] : activeUser;
  },
);
