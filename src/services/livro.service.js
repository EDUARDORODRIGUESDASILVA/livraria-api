import livroInfoRepository from '../repositories/livro-info.repository.js'
import livroRepository from '../repositories/livro.repository.js'

async function createLivro (livro) {
  return await livroRepository.createLivro(livro)
}

async function updateLivro (livro) {
  return await livroRepository.updateLivro(livro)
}
async function deleteLivro (livroId) {
  return await livroRepository.deleteLivro(livroId)
}

async function getLivros () {
  return await livroRepository.getLivros()
}

async function getLivroByLivroId (livroId) {
  return await livroRepository.getLivroByLivroId(livroId)
}

async function getLivrosByAutorId (autorId) {
  return await livroRepository.getLivrosByAutorId(autorId)
}

async function createLivroInfo (livroInfo) {
  return await livroInfoRepository.createLivroInfo(livroInfo)
}

async function updateLivroInfo (livroInfo) {
  return await livroInfoRepository.updateLivroInfo(livroInfo)
}

async function deleteLivroInfo (livroId, index) {
  return await livroInfoRepository.deleteLivroInfo(livroId, index)
}
export default {
  createLivro,
  updateLivro,
  deleteLivro,
  getLivros,
  getLivroByLivroId,
  getLivrosByAutorId,
  createLivroInfo,
  updateLivroInfo,
  deleteLivroInfo
}
