import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle/migration',
  schema: './src/infrastructure/shared/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});