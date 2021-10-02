import { check, validationResult } from 'express-validator'
import autorService from '../services/autor.service.js'

async function createAutor (req, res, next) {
  try {
    await check('nome', 'Nome deve ser informado').notEmpty().run(req)
    await check('email',
      'email deve ser informado').notEmpty().run(req)
    await check('email',
      'email deve ter um endereço válido').isEmail().run(req)

    await check('telefone', 'telefone deve ser informado').notEmpty().run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }

    const c = await autorService.createAutor(req.body)
    return res.status(201).json(c)
  } catch (error) {
    next(error)
  }
}

async function updateAutor (req, res, next) {
  try {
    await check('autorId', 'o autorId deve ser informado').notEmpty().run(req)
    await check('nome', 'Nome deve ser informado').notEmpty().run(req)
    await check('email',
      'email deve ser informado').notEmpty().run(req)
    await check('email',
      'email deve ter um endereço válido').isEmail().run(req)

    await check('telefone', 'telefone deve ser informado').notEmpty().run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }

    const c = await autorService.updateAutor(req.body)
    return res.status(200).json(c)

    // throw new ErrorHandler(501, 'Endpoint not implemented');
  } catch (error) {
    next(error)
  }
}

async function deleteAutor (req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const c = await autorService.deleteAutor(id)
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

async function getAutores (req, res, next) {
  try {
    const c = await autorService.getAutores()
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

async function getAutorByAutorId (req, res, next) {
  try {
    const autorId = parseInt(req.params.id)
    const c = await autorService.getAutorByAutorId(autorId)
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

export default {
  createAutor, updateAutor, deleteAutor, getAutores, getAutorByAutorId
}
