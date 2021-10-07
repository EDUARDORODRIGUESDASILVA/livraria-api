import livroInfoRepository from '../repositories/livro-info.repository.js'
import livroRepository from '../repositories/livro.repository.js'
import autorRepository from '../repositories/autor.repository.js'
import vendaRepository from '../repositories/venda.repository.js'
import { ErrorHandler } from '../util/error.handler.js'

async function createLivro (livro) {
  const autor = await autorRepository.getAutorByAutorId(livro.autorId)
  if (!autor) {
    throw new ErrorHandler(403, `Autor ${livro.autorId} não cadastrado`)
  }

  if (livro.estoque < 0) {
    throw new ErrorHandler(403, 'O estoque não pode ser negativo')
  }
  return await livroRepository.createLivro(livro)
}

async function baixaEstoque (livroId, quantidade) {
  const livro = await livroRepository.getLivroByLivroId(livroId)
  if (!livro) {
    throw new Error('Livro não encontrado')
  }
  if (livro.estoque < quantidade) {
    throw new Error(`Estoque ${livro.estoque} inferior a quantidade necessária. ${quantidade} `)
  }
  livro.estoque = livro.estoque - quantidade
  updateLivro(livro)
}
async function updateLivro (livro) {
  return await livroRepository.updateLivro(livro)
}
async function deleteLivro (livroId) {
  const vendas = await vendaRepository.getVendasByLivroId(livroId)
  if (vendas.length > 0) {
    throw new ErrorHandler(403, ` Ja existem vendas para o livro ${livroId}`)
  }
  return await livroRepository.deleteLivro(livroId)
}

async function getLivros () {
  return await livroRepository.getLivros()
}

async function getLivroByLivroId (livroId) {
  const c = await livroRepository.getLivroByLivroId(livroId)
  const cParsed = JSON.parse(JSON.stringify(c))
  if (cParsed) {
    const livroInfo = await livroInfoRepository.getLivroInfoByLivroId(livroId)
    cParsed.info = livroInfo
  }
  return cParsed
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

async function deleteLivroInfo (livroId) {
  return await livroInfoRepository.deleteLivroInfo(livroId)
}

async function createLivroAvaliacao (livroId, avaliacao) {
  return await livroInfoRepository.createLivroAvaliacao(livroId, avaliacao)
}

async function deleteLivroAvaliacao (livroId, index) {
  return await livroInfoRepository.deleteLivroAvaliacao(livroId, index)
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
  deleteLivroInfo,
  createLivroAvaliacao,
  deleteLivroAvaliacao,
  baixaEstoque
}
