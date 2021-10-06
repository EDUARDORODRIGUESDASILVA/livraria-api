import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import { promises as fs } from 'fs'

const { readFile } = fs

dotenv.config()

const uri = process.env.MONGO_DB_CONNECTION_STRING
const client = new MongoClient(uri)

async function resetMongo () {
  const records = JSON.parse(await readFile('sql/mongo.docs.json', 'utf-8'))
  try {
    await client.connect()
    const database = client.db('livraria')
    await database.collection('livroInfo').deleteMany({})

    for (let index = 0; index < records.length; index++) {
      const r = records[index]
      await database.collection('livroInfo').insertOne(r)
    }
    console.log('mongo reseted')
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

export default resetMongo
