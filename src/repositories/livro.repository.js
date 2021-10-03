import Livro from '../models/livros.model.js'

async function createLivro (livro) {
  return await Livro.create(livro)
}

async function updateLivro (livro) {
  const l = await Livro.findByPk(livro.livroId)
  l.estoque = livro.estoque
  l.valor = livro.valor
  await l.save()
  return l
}

async function deleteLivro (livroId) {
  await Livro.destroy({
    where: {
      livroId
    }
  })
}

async function getLivros () {
  return Livro.findAll()
}

async function getLivroByLivroId (livroId) {
  return await Livro.findByPk(livroId)
}

async function getLivrosByAutorId (autorId) {
  return await Livro.findAll({
    where: {
      autorId
    }
  })
}

export default {
  createLivro,
  updateLivro,
  deleteLivro,
  getLivros,
  getLivroByLivroId,
  getLivrosByAutorId
}
