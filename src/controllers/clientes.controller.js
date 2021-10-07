import { ErrorHandler } from '../util/error.handler.js'
import { check, validationResult } from 'express-validator'
import clientService from '../services/cliente.service.js'

async function createCliente (req, res, next) {
  try {
    await check('nome', 'Nome deve ser informado').notEmpty().run(req)
    await check('email',
      'email deve ser informado').notEmpty().run(req)
    await check('email',
      'email deve ter um endereço válido').isEmail().run(req)

    await check('senha', 'senha deve ser informada').notEmpty().run(req)
    await check('telefone', 'telefone deve ser informado').notEmpty().run(req)
    await check('endereco', 'endereço deve ser informado').notEmpty().run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }

    const c = await clientService.createCliente(req.body)
    return res.status(201).json(c)

    // throw new ErrorHandler(501, 'Endpoint not implemented');
  } catch (error) {
    next(error)
  }
}

async function updateCliente (req, res, next) {
  try {
    await check('clienteId', 'o clienteid deve ser informado').notEmpty().run(req)
    await check('nome', 'Nome deve ser informado').notEmpty().run(req)
    await check('email',
      'email deve ser informado').notEmpty().run(req)
    await check('email',
      'email deve ter um endereço válido').isEmail().run(req)

    //  await check('senha', 'senha deve ser informada').notEmpty().run(req);
    await check('telefone', 'telefone deve ser informado').notEmpty().run(req)
    await check('endereco', 'endereço deve ser informado').notEmpty().run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }

    const c = await clientService.updateCliente(req.body)
    return res.status(200).json(c)

    // throw new ErrorHandler(501, 'Endpoint not implemented');
  } catch (error) {
    next(error)
  }
}

async function deleteCliente (req, res, next) {
  try {
    const id = parseInt(req.params.id)

    if (!id) {
      throw new ErrorHandler(400, 'Missing required id')
    }

    const c = await clientService.deleteCliente(id)
    return res.status(200).send(c)
    // throw new ErrorHandler(501, 'Endpoint not implemented')
  } catch (error) {
    next(error)
  }
}

async function getClientes (req, res, next) {
  try {
    const c = await clientService.getClientes()
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

async function getClientByClientId (req, res, next) {
  try {
    const clientId = parseInt(req.params.id)
    const c = await clientService.getClienteByClienteId(clientId)
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

async function deleteClienteByEmail (req, res, next) {
  try {
    const email = req.params.email

    if (!email) {
      throw new ErrorHandler(400, 'Missing required email')
    }

    const c = await clientService.deleteClienteByEmail(email)
    return res.status(200).send(c)
    // throw new ErrorHandler(501, 'Endpoint not implemented')
  } catch (error) {
    next(error)
  }
}

export default {
  createCliente,
  updateCliente,
  deleteCliente,
  getClientes,
  getClientByClientId,
  deleteClienteByEmail
}
