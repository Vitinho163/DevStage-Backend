import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getStats } from '../functions/get-stats'

export const getStatsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/stats',
    {
      schema: {
        summary: 'Get stats',
        tags: ['referral'],
        response: {
          200: z.object({
            totalSubscribers: z.number(),
            noInvites: z.number(),
            rankings: z.array(
              z.object({
                position: z.number(),
                name: z.string(),
                invites: z.number(),
              })
            ),
          }),
        },
      },
    },
    async request => {
      const stats = await getStats()

      return stats
    }
  )
}
