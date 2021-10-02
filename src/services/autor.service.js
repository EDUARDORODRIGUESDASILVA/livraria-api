import autorRepository from '../repositories/autor.repository.js'

async function createAutor (autor) {
  return await autorRepository.createAutor(autor)
}

async function updateAutor (autor) {
  const l = await autorRepository.updateAutor(autor)
  const c = l[1][0]
  // converte para o raw object
  const raw = JSON.parse(JSON.stringify(c))
  return await raw
}

async function deleteAutor (id) {
  return await autorRepository.deleteAutor(id)
}

async function getAutores () {
  return await autorRepository.getAutores()
}

async function getAutorByAutorId (autorId) {
  return await autorRepository.getAutorByAutorId(autorId)
}

export default { createAutor, updateAutor, deleteAutor, getAutores, getAutorByAutorId }
