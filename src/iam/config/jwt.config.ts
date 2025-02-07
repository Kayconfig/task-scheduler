import { registerAs } from '@nestjs/config';
import { envKeys } from 'src/config/env-keys';

export default registerAs('jwt', () => ({
  secret: process.env[envKeys.JWT_SECRET],
  accessTokenTtl: parseInt(process.env[envKeys.JWT_ACCESS_TOKEN_TTL], 10),
  refreshTokenTtl: parseInt(process.env[envKeys.JWT_REFRESH_TOKEN_TTL], 10),
}));
