import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { env } from '../../env'

export const JWT_CONFIG = {
  accessToken: {
    secret: env.JWT_ACCESS_SECRET,
    expiresIn: env.JWT_ACCESS_EXPIRATION || '15m',
  },
  refreshToken: {
    secret: env.JWT_REFRESH_SECRET,
    expiresIn: env.JWT_REFRESH_EXPIRATION || '7d',
  },
} as const

export function signToken(
  payload: { sub: string },
  type: 'access' | 'refresh'
) {
  const { secret, expiresIn } = JWT_CONFIG[`${type}Token`]
  return jwt.sign(payload, secret as Secret, { expiresIn } as SignOptions)
}

export function verifyToken(token: string, type: 'access' | 'refresh') {
  const { secret } = JWT_CONFIG[`${type}Token`]
  return jwt.verify(token, secret) as { sub: string }
}
