import { z } from 'zod'

export const authSchemas = {
  loginBody: z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  }),

  loginResponse: z.object({
    accessToken: z.string(),
  }),

  refreshCookie: z.object({
    refreshToken: z.string().optional(),
  }),

  authHeader: z.object({
    authorization: z.string().regex(/^Bearer .+/, 'Formato do token inválido'),
  }),
  createAdminBody: z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  }),
}
