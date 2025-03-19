import { boolean } from 'drizzle-orm/pg-core'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  isSuperAdmin: boolean('is_super_admin').notNull().default(false),
})
