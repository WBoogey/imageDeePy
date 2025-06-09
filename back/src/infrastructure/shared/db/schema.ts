import { sql } from 'drizzle-orm';
import { int, mysqlTable , timestamp, varchar } from 'drizzle-orm/mysql-core';


export const users = mysqlTable('users_table', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password', { length: 255 }).notNull(),
  carbonFootprint: varchar('carbon_footprint', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const histories = mysqlTable('histories_table', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull().references(() => users.id),
  prompt: varchar('prompt', { length: 255 }).notNull(),
  imagePath: varchar('image_path', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)
});
