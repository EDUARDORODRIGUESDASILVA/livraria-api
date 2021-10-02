import { Router } from 'express'
import clientesController from '../controllers/clientes.controller.js'

const router = Router()

router.post('/', clientesController.createCliente)
router.put('/', clientesController.updateCliente)
router.delete('/:id', clientesController.deleteCliente)
router.get('/', clientesController.getClientes)
router.get('/:id', clientesController.getClientByClientId)
export default router
