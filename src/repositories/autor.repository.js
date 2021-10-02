import Autor from '../models/autores.model.js'

async function createAutor (autor) {
  return await Autor.create(autor)
}

async function updateAutor (autor) {
  const autorId = autor.autorId
  return await Autor.update(autor, {
    where: {
      autorId
    },
    returning: true
  })
}

async function deleteAutor (autorId) {
  await Autor.destroy({
    where: {
      autorId
    }
  })
}

async function getAutores () {
  return await Autor.findAll()
}

async function getAutorByAutorId (autorId) {
  return await Autor.findByPk(autorId)
}
export default { createAutor, updateAutor, deleteAutor, getAutores, getAutorByAutorId }
