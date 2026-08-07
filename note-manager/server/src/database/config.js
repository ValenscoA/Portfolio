import path from 'node:path'

const configuredPath = process.env.DATABASE_PATH || './data/notes.db'

export const databasePath = path.resolve(process.cwd(), configuredPath)
