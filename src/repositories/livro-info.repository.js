import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGO_DB_CONNECTION_STRING
const client = new MongoClient(uri)

async function createLivroInfo (livroInfo) {
  const livroInfoInsert = {
    livroId: livroInfo.livroId,
    descricao: livroInfo.descricao,
    paginas: livroInfo.paginas,
    editora: livroInfo.editora,
    avaliacoes: []
  }
  try {
    await client.connect()
    const database = client.db('livraria')
    const inserted = await database.collection('livroInfo').insertOne(livroInfoInsert)
    const info = await database.collection('livroInfo').findOne(inserted.insertedId)
    return info
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function getLivroInfoByLivroId (livroId) {
  try {
    await client.connect()
    const database = client.db('livraria')
    const id = { livroId }
    const livroInfo = await database.collection('livroInfo').findOne(id)
    return livroInfo
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function createAvaliacao (livroId, avaliacao) {
  try {
    await client.connect()

    const database = client.db('livraria')
    const id = { livroId }
    const livroInfo = await database.collection('livroInfo').findOne(id)

    if (!livroInfo.avaliacoes) {
      livroInfo.avaliacoes = []
    }

    livroInfo.avaliacoes.push(avaliacao)
    await database.collection('livroInfo').updateOne(id, {
      $set: { avaliacoes: livroInfo.avaliacoes }
    })
    return livroInfo
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function updateLivroInfo (info) {
  try {
    await client.connect()

    const database = client.db('livraria')
    const id = { livroId: info.livroId }
    const updates = {}
    if (info.descricao) {
      updates.descricao = info.descricao
    }

    if (info.paginas) {
      updates.paginas = info.paginas
    }

    if (info.editora) {
      updates.editora = info.editora
    }

    await database.collection('livroInfo').updateOne(id, {
      $set: updates
    })

    const livroInfo = await database.collection('livroInfo').findOne(id)
    return livroInfo
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function deleteLivroInfo (livroId) {
  try {
    await client.connect()

    const database = client.db('livraria')
    const id = { livroId }
    return await database.collection('livroInfo').deleteOne(id)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function createLivroAvaliacao (livroId, avaliacao) {
  try {
    await client.connect()

    const database = client.db('livraria')
    const id = { livroId: livroId }

    let livroInfo = await database.collection('livroInfo').findOne(id)
    const avaliacoes = await livroInfo.avaliacoes
    avaliacoes.push(avaliacao)

    await database.collection('livroInfo').updateOne(id, {
      $set: { avaliacoes: avaliacoes }
    })

    livroInfo = await database.collection('livroInfo').findOne(id)
    return livroInfo
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function deleteLivroAvaliacao (livroId, index) {
  try {
    await client.connect()

    const database = client.db('livraria')
    const id = { livroId: livroId }

    let livroInfo = await database.collection('livroInfo').findOne(id)
    const avaliacoes = await livroInfo.avaliacoes
    avaliacoes.splice(index, 1)

    await database.collection('livroInfo').updateOne(id, {
      $set: { avaliacoes: avaliacoes }
    })

    livroInfo = await database.collection('livroInfo').findOne(id)
    return livroInfo
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

export default {
  createLivroInfo,
  getLivroInfoByLivroId,
  deleteLivroInfo,
  createAvaliacao,
  updateLivroInfo,
  createLivroAvaliacao,
  deleteLivroAvaliacao
}
