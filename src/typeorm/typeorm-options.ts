import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { envKeys } from 'src/config/env-keys';

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  imports: [ConfigModule.forRoot()],
  useFactory: (configService: ConfigService) => {
    const isDev = configService.get(envKeys.NODE_ENV) === 'development';
    return {
      type: 'postgres',
      database: configService.get(envKeys.PG_DB_NAME),
      username: configService.get(envKeys.PG_USER),
      password: configService.get(envKeys.PG_PASSWRD),
      port: +configService.get(envKeys.PG_PORT),
      autoLoadEntities: isDev ? true : false,
      synchronize: false,
    };
  },
};
