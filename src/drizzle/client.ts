import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'
import { subscriptions } from './schema/subscriptions'
import { withReplicas } from 'drizzle-orm/pg-core'

// Instância do banco principal
const primaryPg = postgres(env.POSTGRES_URL)
const primaryDb = drizzle(primaryPg, {
  schema: {
    subscriptions,
  },
})

// Instância da replica do banco.
export const replicaPg = postgres(env.POSTGRES_REPLICA_URL)
const replicaDb = drizzle(replicaPg, {
  schema: {
    subscriptions,
  },
})

export const db = withReplicas(primaryDb, [replicaDb])