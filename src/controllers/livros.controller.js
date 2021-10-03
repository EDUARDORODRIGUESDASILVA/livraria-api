
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

    const c = await livroService.getLivroByLivroId(livroId)
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

async function createLivroInfo (req, res, next) {
  try {
    await check('livroId', 'Nome deve ser informado').notEmpty().run(req)
    await check('livroId', 'livroId deve ser um número inteiro positivo.').isInt().notEmpty().run(req)

    await check('descricao', 'Valor deve ser informado').notEmpty().run(req)
    await check('paginas', 'O número de páginas de um número inteiro positivo.').notEmpty().run(req)
    await check('paginas', 'Valor deve ser numérico').isInt().run(req)
    await check('editora', 'editora deve ser informado').notEmpty().run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }
    /// TODO Validar se existe livro com o livroId informado

    const c = await livroService.createLivroInfo(req.body)
    return res.status(201).json(c)
  } catch (error) {
    next(error)
  }
}

async function updateLivroInfo (req, res, next) {
  try {
    await check('livroId', 'LivroId deve ser informado').notEmpty()
    await check('livroId', 'LivroId deve ser um número inteiro').isInt()

    await check('descricao', 'A descrição deve ser uma string').optional().isString()
    await check('paginas', 'LivroId deve ser um número inteiro').optional().isInt()
    await check('editora', 'O nome da editora deve ser uma string').optional().isString()

    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }
    const c = await livroService.updateLivroInfo(req.body)
    return res.status(200).json(c)
  } catch (error) {
    next(error)
  }
}

async function deleteLivroInfo (req, res, next) {
  try {
    await check('livroId', 'LivroId deve ser informado').notEmpty()
    await check('livroId', 'LivroId deve ser um número inteiro').isInt()

    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }

    const id = parseInt(req.params.id)
    const c = await livroService.deleteLivroInfo(id)
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

async function createLivroAvaliacao (req, res, next) {
  try {
    const id = parseInt(req.params.id)

    await check('nome', 'Nome deve ser informado').notEmpty().run(req)
    await check('nota', 'nota deve ser informada').notEmpty().run(req)
    await check('nota', 'nota deve ser um número inteiro').isInt().notEmpty().run(req)
    await check('avaliacao', 'avaliação deve ser informada').notEmpty().run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
      res.status(400).json({ erros: result.array() })
      return
    }

    const c = await livroService.createLivroAvaliacao(id, req.body)
    return res.status(201).send(c)
  } catch (error) {
    next(error)
  }
}

async function deleteLivroAvaliacao (req, res, next) {
  try {
    const livroId = parseInt(req.params.id)
    const index = parseInt(req.params.index)

    const c = await livroService.deleteLivroAvaliacao(livroId, index)
    return res.status(200).send(c)
  } catch (error) {
    next(error)
  }
}

export default {
  createLivro,
  updateLivro,
  deleteLivro,
  getLivros,
  deleteLivroInfo,
  getLivroByLivroId,
  createLivroInfo,
  updateLivroInfo,
  createLivroAvaliacao,
  deleteLivroAvaliacao
}
