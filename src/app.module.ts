import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './config/config-schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './typeorm/typeorm-options';
import { CommonModule } from './common/common.module';
import { IamModule } from './iam/iam.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: configSchema }),
    TypeOrmModule.forRootAsync(typeOrmOptions),
    TaskModule,
    CommonModule,
    IamModule,
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 5 }]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
