import { Router } from 'express'
import autorController from '../controllers/autor.controller.js'
import { authorize } from '../util/auth.middleware.js'

const router = Router()
router.post('/', authorize('admin'), autorController.createAutor)
router.put('/', authorize('admin'), autorController.updateAutor)
router.delete('/:id', authorize('admin'), autorController.deleteAutor)
router.get('/', authorize('admin'), autorController.getAutores)
router.get('/:id', authorize('admin'), autorController.getAutorByAutorId)
export default router
