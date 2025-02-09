import { registerAs } from '@nestjs/config';
import { envKeys } from 'src/config/env-keys';

export default registerAs('redis', () => ({
  redisHost: process.env[envKeys.REDIS_HOST],
  redisPort: parseInt(process.env[envKeys.REDIS_PORT], 10),
}));
