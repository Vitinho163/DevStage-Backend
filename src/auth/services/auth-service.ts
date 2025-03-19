import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../../drizzle/client'
import { adminUsers } from '../../drizzle/schema/admin-users'
import { redis } from '../../redis/client'
import { signToken } from './jwt-service'

const saltRounds = 12

export async function createAdminUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const newAdmin = await db
    .insert(adminUsers)
    .values({ email, password: hashedPassword })
    .returning()

  return newAdmin
}

export async function authenticateAdmin(email: string, password: string) {
  const [admin] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))

  if (!admin) throw new Error('Email e/ou senha incorretos.')

  const isValidPassword = await bcrypt.compare(password, admin.password)
  if (!isValidPassword) throw new Error('Email e/ou senha incorretos.')

  const accessToken = signToken({ sub: admin.id }, 'access')
  const refreshToken = signToken({ sub: admin.id }, 'refresh')

  await redis.set(`admin:refresh:${admin.id}`, refreshToken, 'EX', 7 * 86400)

  return { accessToken, refreshToken }
}

export async function logoutAdmin(userId: string) {
  await redis.del(`admin:refresh:${userId}`)
}
