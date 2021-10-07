import clienteRepository from '../repositories/cliente.repository.js'
import vendaRepository from '../repositories/venda.repository.js'
import { ErrorHandler } from '../util/error.handler.js'

async function createCliente (cliente) {
  const v = await clienteRepository.getClienteByEmail(cliente.email)

  if (v) {
    throw new ErrorHandler(403, ` Já existe uma conta para o email ${cliente.email}`)
  }

  const c = await clienteRepository.createCliente(cliente)
  // converte para o raw object e remove a senha por segurança
  const raw = JSON.parse(JSON.stringify(c))
  delete raw.senha
  return await raw
}

async function updateCliente (cliente) {
  const l = await clienteRepository.updateCliente(cliente)
  const c = l[1][0]
  // converte para o raw object e remove a senha por segurança
  const raw = JSON.parse(JSON.stringify(c))
  delete raw.senha

  return await raw
}

async function deleteCliente (id) {
  const vendas = await vendaRepository.getVendasByClienteId(id)
  if (vendas.length > 0) {
    throw new ErrorHandler(403, `Cliente ${id} possui vendas`)
  }
  return await clienteRepository.deleteCliente(id)
}

async function getClientes () {
  return clienteRepository.getClientes()
}

async function getClienteByClienteId (clientId) {
  return clienteRepository.getClienteByClienteId(clientId)
}

async function authenticateCliente (email, password) {
  return clienteRepository.getClienteByEmailAndPassword(email, password)
}

// async function deleteClienteByEmail (email) {
//   const c = JSON.stringify(await clienteRepository.getClienteByEmail(email))
//   const cliente = JSON.parse(c)
//   if (cliente) {
//     await vendaRepository.deleteVendaByClienteId(cliente.clienteId)
//     const d = await clienteRepository.deleteClienteByClienteId(cliente.clienteId)
//     return d
//   }
// }
export default {
  authenticateCliente,
  createCliente,
  updateCliente,
  deleteCliente,
  getClientes,
  getClienteByClienteId
}
