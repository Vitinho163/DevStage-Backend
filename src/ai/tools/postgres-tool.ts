import { tool } from 'ai'
import z from 'zod'
import { replicaPg } from '../../drizzle/client'
import { getCachedDDL } from '../generate-ddl'

export const postgresTool = tool({
  description: `
    Realiza uma query no Postgres para buscar informações sobre as tabelas do banco de dados.

    Só pode realizar operações de busca (SELECT), não é permitido a geração de qualquer operação de escrita.

    Tables:
    """
    ${getCachedDDL()}
    """

    Todas operações devem retornar um máximo de 50 itens.
  `.trim(),
  parameters: z.object({
    query: z.string().describe('A query do PostgreSQL para ser executada.'),
    params: z
      .array(z.string())
      .describe('Parâmetros da query a ser executada.'),
  }),
  execute: async ({ query, params }) => {
    console.log({ query, params })

    const result = await replicaPg.unsafe(query, params)

    return JSON.stringify(result)
  },
})
