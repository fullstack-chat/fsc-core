import { connect } from '@planetscale/database'
import { PlanetScaleDatabase, drizzle } from 'drizzle-orm/planetscale-serverless'
import * as schema from './schema'

export function getDb(): PlanetScaleDatabase<typeof schema> {
  const config = {
    url: process.env.DATABASE_URL
  }

  const conn = connect(config)
  return drizzle(conn, { schema })
}
