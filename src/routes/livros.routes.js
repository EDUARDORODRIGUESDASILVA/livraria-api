import { Router } from 'express'
import livrosController from '../controllers/livros.controller.js'
import { authorize } from '../util/auth.middleware.js'
const router = Router()

router.post('/', authorize('admin'), livrosController.createLivro)
router.put('/', authorize('admin'), livrosController.updateLivro)
router.delete('/:id', authorize('admin'), livrosController.deleteLivro)
router.get('/', authorize('admin', 'customer1'), livrosController.getLivros)
router.get('/:id', authorize('admin', 'customer1'), livrosController.getLivroByLivroId)

router.post('/info', authorize('admin'), livrosController.createLivroInfo)
router.put('/info', authorize('admin'), livrosController.updateLivroInfo)
router.delete('/info/:id/', authorize('admin'), livrosController.deleteLivroInfo)

router.post('/:id/avaliacao', authorize('admin', 'customer1'), livrosController.createLivroAvaliacao)
router.delete('/:id/avaliacao/:index', authorize('admin'), livrosController.deleteLivroAvaliacao)

export default router
