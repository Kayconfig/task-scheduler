import { registerAs } from '@nestjs/config';
import { envKeys } from 'src/config/env-keys';

export default registerAs('google', () => ({
  clientId: process.env[envKeys.GOOGLE_CLIENT_ID],
  clientSecret: process.env[envKeys.GOOGLE_CLIENT_SECRET],
}));
