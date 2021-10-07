
import Venda from '../models/vendas.model.js'
import Livro from '../models/livros.model.js'
import Cliente from '../models/clientes.model.js'
import Autor from '../models/autores.model.js'

async function createVenda (livro) {
  return await Venda.create(livro)
}

async function getVendaByVendaId (vendaId) {
  return await Venda.findByPk(vendaId)
}

async function getVendas () {
  return await Venda.findAll()
}

async function getVendasByClienteId (clienteId) {
  return await Venda.findAll({
    where: {
      clienteId
    },
    include: {
      model: Cliente,
      attributes: { exclude: ['clienteId', 'senha'] }
    }
  })
}

async function getVendasByLivroId (livroId) {
  return await Venda.findAll({
    where: {
      livroId
    },
    include: [
      {
        model: Livro,
        include: [{
          model: Autor,
          attributes: { exclude: ['clienteId', 'senha'] }
        }
        ],
        attributes: { exclude: ['livroId', 'estoque'] }
      },
      {
        model: Cliente,
        attributes: { exclude: ['clienteId', 'senha'] }
      }
    ]
  })
}

async function getVendasByAutorId (autorId) {
  return await Venda.findAll({
    include: [
      {
        model: Livro,
        where: {
          autorId
        },
        attributes: { include: ['autorId'] }
      }
    ]
  })
}

async function deleteVendaByVendaId (vendaId) {
  await Venda.destroy({
    where: {
      vendaId
    }
  })
}

async function deleteVendaByClienteId (clienteId) {
  await Venda.destroy({
    where: {
      clienteId
    }
  })
}

export default {
  createVenda,
  getVendaByVendaId,
  getVendas,
  getVendasByClienteId,
  getVendasByLivroId,
  getVendasByAutorId,
  deleteVendaByVendaId,
  deleteVendaByClienteId
}
