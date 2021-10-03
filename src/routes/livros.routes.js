import { Router } from 'express'
import livrosController from '../controllers/livros.controller.js'

const router = Router()

router.post('/', livrosController.createLivro)
router.put('/', livrosController.updateLivro)
router.delete('/:id', livrosController.deleteLivro)
router.get('/', livrosController.getLivros)
router.get('/:id', livrosController.getLivroByLivroId)

export default router
