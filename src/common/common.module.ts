import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionHandlerFilter } from './exception-filter/http-exception-handler/http-exception-handler.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandlerFilter,
    },
  ],
})
export class CommonModule {}
