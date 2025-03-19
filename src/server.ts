import fastifyCookie from '@fastify/cookie'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { eq } from 'drizzle-orm'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { verifyToken } from './auth/services/jwt-service'
import { db } from './drizzle/client'
import { adminUsers } from './drizzle/schema/admin-users'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { adminRoutes } from './routes/admin-routes'
import { authRoutes } from './routes/auth-routes'
import { getRankingRoute } from './routes/get-ranking-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { sendMessageRoute } from './routes/send-message-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)
app.register(fastifyCookie)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'DevStage',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.addHook('onRequest', async (request, reply) => {
  if (request.url === '/admin/login' || request.url === '/admin/refresh') return

  if (request.url.startsWith('/admin') || request.url === '/messages') {
    const token = request.headers.authorization?.split(' ')[1]
    if (!token) return reply.code(401).send({ error: 'Token não fornecido' })

    try {
      const payload = verifyToken(token, 'access')
      const [user] = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.id, payload.sub))

      if (!user)
        return reply.code(401).send({ error: 'Usuário não encontrado' })

      request.user = user
    } catch (err) {
      return reply.code(401).send({ error: 'Token inválido' })
    }
  }
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)
app.register(sendMessageRoute)
app.register(authRoutes)
app.register(adminRoutes)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running')
})
