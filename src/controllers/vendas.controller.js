
import { check, validationResult } from 'express-validator'
import vendaService from '../services/venda.service.js'
import { ErrorHandler } from '../util/error.handler.js'

async function createVenda (req, res, next) {
  try {
    await check('livroId', 'livroId deve ser informado').notEmpty().run(req)
    await check('clienteId', 'clienteId deve ser informado').notEmpty().run(req)
    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }

    if (req.user.role !== 'admin' && req.body.clienteId !== req.user.clienteId) {
      throw new ErrorHandler(403, `Usuário ${req.user.clienteId}  não autorizado a criar vendas para o cliente  ${req.body.clienteId}`)
    }

    const c = await vendaService.createVenda(req.body)
    return res.status(201).json(c)
  } catch (error) {
    next(error)
  }
}

async function getVendaByVendaId (req, res, next) {
  try {
    const vendaId = parseInt(req.params.id)

    const c = await vendaService.getVendaByVendaId(vendaId)
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

async function getVendas (req, res, next) {
  try {
    const autorId = req.query.autorId
    const clienteId = req.query.clienteId
    const livroId = req.query.livroId
    let c = null

    if (req.user.role !== 'admin' && clienteId !== req.user.clienteId) {
      throw new ErrorHandler(403, 'Usuário não autorizado a consulta de outros clientes')
    }

    if (autorId) {
      c = await vendaService.getVendasByAutorId(autorId)
    }
    if (clienteId) {
      c = await vendaService.getVendasByClienteId(clienteId)
    }

    if (livroId) {
      c = await vendaService.getVendasByLivroId(livroId)
    }
    if (!autorId && !clienteId && !livroId) {
      c = await vendaService.getVendas()
    }
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

async function deleteVendaByVendaId (req, res, next) {
  try {
    const id = parseInt(req.params.id)

    if (!id) {
      throw new ErrorHandler(400, 'Missing required id')
    }

    const c = await vendaService.deleteVendaByVendaId(id)
    return res.status(200).send(c)
    // throw new ErrorHandler(501, 'Endpoint not implemented')
  } catch (error) {
    next(error)
  }
}

export default { createVenda, getVendaByVendaId, getVendas, deleteVendaByVendaId }
