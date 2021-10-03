
import { check, validationResult } from 'express-validator'
import livroService from '../services/livro.service.js'

async function createLivro (req, res, next) {
  try {
    await check('nome', 'Nome deve ser informado').notEmpty().run(req)
    await check('valor', 'Valor deve ser informado').notEmpty().run(req)
    await check('valor', 'Valor deve ser numérico').isFloat().run(req)
    await check('autorId', 'autorId').notEmpty().run(req)
    await check('estoque', 'autorId').notEmpty().run(req)
    await check('estoque', 'autorId').isInt().notEmpty().run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }

    const c = await livroService.createLivro(req.body)
    return res.status(201).json(c)
  } catch (error) {
    next(error)
  }
}

async function updateLivro (req, res, next) {
  try {
    await check('valor', 'Valor deve ser informado').notEmpty().run(req)
    await check('valor', 'Valor deve ser numérico').isFloat().run(req)
    await check('estoque', 'Estoque deve ser informado').notEmpty().run(req)
    await check('estoque', 'Estoque deve ser númerico - inteiro').isInt().notEmpty().run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }

    const c = await livroService.updateLivro(req.body)
    return res.status(200).json(c)

    // throw new ErrorHandler(501, 'Endpoint not implemented');
  } catch (error) {
    next(error)
  }
}

async function deleteLivro (req, res, next) {
  try {
    const id = parseInt(req.params.id)

    // TODO BLOQUEAR A EXCLUSÃO DO LIVRO SE TIVER VENDAS

    const c = await livroService.deleteLivro(id)
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

async function getLivros (req, res, next) {
  try {
    const autorId = req.query.autorId

    let c = null

    if (autorId) {
      // lista por AutorId
      c = await livroService.getLivrosByAutorId(parseInt(autorId))
    } else {
      // lista completa
      c = await livroService.getLivros()
    }

    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

async function getLivroByLivroId (req, res, next) {
  try {
    const livroId = parseInt(req.params.id)

    // TODO RETORNAR AS INFORMAÇÕES DO MONGO DB AQUI
    const c = await livroService.getLivroByLivroId(livroId)
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

export default { createLivro, updateLivro, deleteLivro, getLivros, getLivroByLivroId }
