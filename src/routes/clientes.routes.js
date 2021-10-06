import { Router } from 'express'
import clientesController from '../controllers/clientes.controller.js'
import { authorize } from '../util/auth.middleware.js'
const router = Router()

router.post('/', authorize('admin'), clientesController.createCliente)
router.put('/', authorize('admin'), clientesController.updateCliente)
router.delete('/:id', authorize('admin'), clientesController.deleteCliente)
router.get('/', authorize('admin'), clientesController.getClientes)
router.get('/:id', authorize('admin'), clientesController.getClientByClientId)
export default router
