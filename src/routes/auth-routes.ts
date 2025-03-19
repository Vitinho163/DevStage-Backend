import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { authSchemas } from '../auth/schemas/auth-schemas'
import { authenticateAdmin, logoutAdmin } from '../auth/services/auth-service'
import { signToken, verifyToken } from '../auth/services/jwt-service'
import { env } from '../env'
import { redis } from '../redis/client'

const errorResponseSchema = z.object({
  error: z.string(),
})

export const authRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/admin/login',
    {
      schema: {
        summary: 'Login admin',
        tags: ['auth'],
        body: authSchemas.loginBody,
        response: {
          200: authSchemas.loginResponse,
          401: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      try {
        const { accessToken, refreshToken } = await authenticateAdmin(
          email,
          password
        )

        reply
          .setCookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/admin/refresh',
            secure: env.NODE_ENV === 'production',
          })
          .send({ accessToken })
      } catch (err) {
        console.log(err)
        reply.code(401).send({ error: 'Credenciais inválidas' })
      }
    }
  )

  app.post(
    '/admin/refresh',
    {
      schema: {
        summary: 'Refresh admin token',
        description: '*Require cookie refreshToken*',
        tags: ['auth'],
        security: [ { RefreshToken: [] } ],
        response: {
          200: authSchemas.loginResponse,
          401: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const refreshToken = request.cookies.refreshToken
      if (!refreshToken)
        return reply.code(401).send({ error: 'Token não fornecido' })

      try {
        const payload = verifyToken(refreshToken, 'refresh')
        const storedToken = await redis.get(`admin:refresh:${payload.sub}`)

        if (refreshToken !== storedToken) {
          return reply.code(401).send({ error: 'Token inválido' })
        }

        const newAccessToken = signToken({ sub: payload.sub }, 'access')
        const newRefreshToken = signToken({ sub: payload.sub }, 'refresh')

        await redis.set(
          `admin:refresh:${payload.sub}`,
          newRefreshToken,
          'EX',
          7 * 86400
        )

        reply
          .setCookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            path: '/admin/refresh',
            secure: env.NODE_ENV === 'production',
          })
          .send({ accessToken: newAccessToken })
      } catch (err) {
        reply.code(401).send({ error: 'Token expirado ou inválido' })
      }
    }
  )

  app.post(
    '/admin/logout',
    {
      schema: {
        summary: 'Logout admin',
        tags: ['auth'],
        headers: authSchemas.authHeader,
      },
    },
    async (request, reply) => {
      const token = request.headers.authorization?.split(' ')[1]
      if (!token) return reply.code(401).send({ error: 'Token não fornecido' })

      try {
        const payload = verifyToken(token, 'access')
        await logoutAdmin(payload.sub)
        reply.clearCookie('refreshToken').send({ message: 'Logout realizado' })
      } catch (err) {
        reply.code(401).send({ error: 'Token inválido' })
      }
    }
  )
}
