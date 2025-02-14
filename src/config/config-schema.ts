import * as Joi from 'joi';
import { envKeys } from './env-keys';
import { env } from 'process';

export const configSchema = Joi.object({
  [envKeys.PG_DB_NAME]: Joi.string().required(),
  [envKeys.PG_PASSWRD]: Joi.string().required(),
  [envKeys.PG_USER]: Joi.string().required(),
  [envKeys.PG_PORT]: Joi.number().required(),
  [envKeys.JWT_SECRET]: Joi.string().required(),
  [envKeys.JWT_ACCESS_TOKEN_TTL]: Joi.string().required(),
  [envKeys.JWT_REFRESH_TOKEN_TTL]: Joi.string().required(),
  [envKeys.REDIS_HOST]: Joi.string().required(),
  [envKeys.REDIS_PORT]: Joi.number().required(),
  [envKeys.GOOGLE_CLIENT_ID]: Joi.string().required(),
  [envKeys.GOOGLE_CLIENT_SECRET]: Joi.string().required(),
});
