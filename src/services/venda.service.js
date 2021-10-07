import vendaRepository from '../repositories/venda.repository.js'
import livroService from './livro.service.js'
import clienteService from './cliente.service.js'
import { ErrorHandler } from '../util/error.handler.js'

async function createVenda (venda) {
  const cliente = await clienteService.getClienteByClienteId(venda.clienteId)
  if (!cliente) {
    throw new ErrorHandler(400, `Cliente ${venda.clienteId} inexistente na base de dados`)
  }

  const livro = await livroService.getLivroByLivroId(venda.livroId)

  if (!livro) {
    throw new ErrorHandler(400, `Livro ${venda.livroId} inexistente na base de dados`)
  }

  if (livro.estoque < 1) {
    throw new ErrorHandler(400, `Livro ${venda.livroId} sem estoque`)
  }

  const vendaGravar = {
    livroId: venda.livroId,
    clienteId: venda.clienteId,
    data: new Date(),
    valor: livro.valor
  }
  const v = await vendaRepository.createVenda(vendaGravar)
  await livroService.baixaEstoque(venda.livroId, 1)

  return v
}

async function getVendaByVendaId (vendaId) {
  return await vendaRepository.getVendaByVendaId(vendaId)
}
async function getVendas () {
  return await vendaRepository.getVendas()
}

async function getVendasByAutorId (autorId) {
  return await vendaRepository.getVendasByAutorId(autorId)
}

async function getVendasByClienteId (clienteId) {
  return await vendaRepository.getVendasByClienteId(clienteId)
}

async function getVendasByLivroId (livroId) {
  return await vendaRepository.getVendasByLivroId(livroId)
}

async function deleteVendaByVendaId (vendaId) {
  return await vendaRepository.deleteVendaByVendaId(vendaId)
}

async function deleteVendaByClienteId (clienteId) {
  return await vendaRepository.deleteVendaByClienteId(clienteId)
}
export default {
  createVenda,
  getVendaByVendaId,
  getVendas,
  getVendasByAutorId,
  getVendasByClienteId,
  getVendasByLivroId,
  deleteVendaByVendaId,
  deleteVendaByClienteId
}
