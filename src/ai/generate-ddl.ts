import { getTableConfig } from 'drizzle-orm/pg-core'
import { subscriptions } from '../drizzle/schema/subscriptions'

function generateDDL(): string {
  let ddl = ''

  try {
    const config = getTableConfig(subscriptions)

    ddl += `CREATE TABLE ${config.name} (\n`

    const columnDefinitions: string[] = []

    for (const column of config.columns) {
      let pgType = ''
      const isPrimaryKey = column.primary

      switch (column.name) {
        case 'id':
          pgType = 'UUID'
          break
        case 'created_at':
          pgType = 'TIMESTAMP'
          break
        default:
          pgType = 'TEXT'
      }

      const parts: string[] = [`${column.name} ${pgType}`]

      if (isPrimaryKey) {
        parts.push('PRIMARY KEY')
      }

      if (isPrimaryKey && column.name === 'id') {
        parts.push('DEFAULT gen_random_uuid()')
      }

      if (column.notNull && !isPrimaryKey) {
        parts.push('NOT NULL')
      }

      if (!isPrimaryKey && column.name === 'created_at') {
        parts.push('DEFAULT NOW()')
      }

      if (column.isUnique) {
        parts.push('UNIQUE')
      }

      columnDefinitions.push(parts.join(' '))
    }

    ddl += columnDefinitions.map(line => `  ${line}`).join(',\n')
    ddl += '\n);'
  } catch (error) {
    console.error('Error generating DDL:', error)
    throw new Error('Failed to generate DDL from schema')
  }

  return ddl
}

let ddlCache: string | null = null

export function getCachedDDL(): string {
  if (!ddlCache) {
    ddlCache = generateDDL()
  }
  return ddlCache
}