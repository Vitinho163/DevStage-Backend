import type { adminUsers } from './src/drizzle/schema/admin-users'

declare module 'fastify' {
  interface FastifyRequest {
    user?: adminUsers
  }
}
