import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { authSchemas } from '../auth/schemas/auth-schemas'
import { createAdminUser } from '../auth/services/auth-service'
import { db } from '../drizzle/client'
import { adminUsers } from '../drizzle/schema/admin-users'

export const adminRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/admin/users',
    {
      schema: {
        summary: 'Create admin user *require superadmin*',
        tags: ['auth'],
        body: authSchemas.createAdminBody,
        response: {
          201: z.object({
            id: z.string(),
            email: z.string(),
          }),
          403: z.object({ error: z.string() }),
          409: z.object({ error: z.string() }),
        },
        security: [{ bearerAuth: [] }],
      },
    },
    async (request, reply) => {
      if (!request.user?.isSuperAdmin) {
        return reply.code(403).send({ error: 'Acesso negado' })
      }

      const { email, password } = request.body

      const [existingUser] = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.email, email))

      if (existingUser) {
        return reply.code(409).send({ error: 'Usuário já cadastrado.' })
      }

      const [newAdmin] = await createAdminUser(email, password)
      reply.code(201).send({ id: newAdmin.id, email: newAdmin.email })
    }
  )
}
