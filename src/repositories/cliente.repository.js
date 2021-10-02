import Cliente from '../models/clientes.model.js'


async function createCliente(client) {
  try {
    return  await Cliente.create(client)       
  } catch (err) {
    throw err;
  }

}

async function updateCliente(client) {
  try {
    const clienteId = client.clienteId;
    return await Cliente.update(client, {
      where: {
        clienteId,
      },
      returning: true     
    });
  } catch (err) {
    throw err;
  }

}
export default { createCliente, updateCliente }