import dotenv from 'dotenv'
import pkg from 'pg'
import { promises as fs } from 'fs'

const { readFile } = fs
const { Pool } = pkg

dotenv.config()

const connectionString = process.env.DB_CONNECTION_STRING
const pool = new Pool({
  connectionString
})

async function execute (query) {
  const client = await pool.connect()
  try {
    return await client.query(query)
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    await client.release()
  }
}

async function reset () {
  const createSql = await readFile('sql/create.sql', 'utf-8')
  const insertsSql = await readFile('sql/inserts.sql', 'utf-8')

  await execute(createSql)
  await execute(insertsSql)
  console.log('db reseted')
  await pool.end
}

export default reset
