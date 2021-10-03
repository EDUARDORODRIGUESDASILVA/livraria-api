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
export default { createLivro, updateLivro, deleteLivro, getLivros, getLivroByLivroId, getLivrosByAutorId }
