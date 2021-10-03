import { Router } from 'express'
import livrosController from '../controllers/livros.controller.js'

const router = Router()

router.post('/', livrosController.createLivro)
router.put('/', livrosController.updateLivro)
router.delete('/:id', livrosController.deleteLivro)
router.get('/', livrosController.getLivros)
router.get('/:id', livrosController.getLivroByLivroId)

router.post('/info', livrosController.createLivroInfo)
router.put('/info', livrosController.updateLivroInfo)
router.delete('/info/:id/', livrosController.deleteLivroInfo)

router.post('/:id/avaliacao', livrosController.createLivroAvaliacao)
router.delete('/:id/avaliacao/:index', livrosController.deleteLivroAvaliacao)

export default router
