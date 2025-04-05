import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'
import { getRanking } from './get-ranking'
import { sql } from 'drizzle-orm'

interface StatItem {
  position: number
  name: string
  invites: number
}

export async function getStats() {
  const [{ count }] = await db
    .select({ count: sql<number>`COUNT(${subscriptions.id})` })
    .from(subscriptions)

  const totalSubscribers = Number(count) || 0

  const invitedCount = await redis.zcard('referral:ranking')

  const noInvites = totalSubscribers - invitedCount

  const { rankingWithScore } = await getRanking()
  const rankings: StatItem[] = rankingWithScore.map((entry, idx) => ({
    position: idx + 1,
    name: entry.name,
    invites: entry.score,
  }))

  return {
    totalSubscribers,
    noInvites,
    rankings,
  }
}
