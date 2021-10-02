import { Router } from 'express'
import autorController from '../controllers/autor.controller.js'
const router = Router()

router.post('/', autorController.createAutor)
router.put('/', autorController.updateAutor)
router.delete('/:id', autorController.deleteAutor)
router.get('/', autorController.getAutores)
router.get('/:id', autorController.getAutorByAutorId)
export default router
