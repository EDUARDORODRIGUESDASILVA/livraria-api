import Cliente from '../models/clientes.model.js'

async function createCliente (client) {
  return await Cliente.create(client)
}

async function updateCliente (client) {
  const clienteId = client.clienteId
  return await Cliente.update(client, {
    where: {
      clienteId
    },
    returning: true
  })
}

async function deleteCliente (clienteId) {
  await Cliente.destroy({
    where: {
      clienteId
    }
  })
}

// retornar todos os clientes sem o campo de senha
async function getClientes () {
  return await Cliente.findAll({
    attributes: {
      exclude: ['senha']
    }
  })
}

async function getClienteByClienteId (clienteId) {
  return await Cliente.findByPk(clienteId,
    {
      attributes: {
        exclude: ['senha']
      }
    })
}

async function getClienteByEmailAndPassword (email, password) {
  return await Cliente.findOne({
    where: {
      email,
      senha: password
    }
  })
}
export default {
  createCliente,
  updateCliente,
  deleteCliente,
  getClientes,
  getClienteByClienteId,
  getClienteByEmailAndPassword
}
