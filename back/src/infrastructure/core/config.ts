import { env } from 'node:process';

export default {
  env: env['NODE_ENV'] || 'development',
  port: env['PORT'] || 8001,
  DB_URL: env['DATABASE_URL'],
  logLevel: env['LOG_LEVEL'],
  JWT_SECRET: env['JWT_SECRET']
};
