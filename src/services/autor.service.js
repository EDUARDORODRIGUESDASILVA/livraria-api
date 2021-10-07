import autorRepository from '../repositories/autor.repository.js'
import livroService from '../services/livro.service.js'
import { ErrorHandler } from '../util/error.handler.js'

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
  const livros = await livroService.getLivrosByAutorId(id)

  if (livros.length > 0) {
    throw new ErrorHandler(403, `Autor ${id} possui livros cadastrados`)
  }

  return await autorRepository.deleteAutor(id)
}

async function getAutores () {
  return await autorRepository.getAutores()
}

async function getAutorByAutorId (autorId) {
  return await autorRepository.getAutorByAutorId(autorId)
}

export default { createAutor, updateAutor, deleteAutor, getAutores, getAutorByAutorId }
