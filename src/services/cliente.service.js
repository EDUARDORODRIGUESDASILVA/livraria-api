import clienteRepository from '../repositories/cliente.repository.js'

async function createCliente (cliente) {
  // TODO BLOQUEAR INSERT CASO O CLIENTE JÁ TENHA UMA CONTA CADASTRADA COM O MESMO EMAIL

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

export default {
  authenticateCliente,
  createCliente,
  updateCliente,
  deleteCliente,
  getClientes,
  getClienteByClienteId
}
