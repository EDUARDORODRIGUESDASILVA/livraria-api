import { Router } from 'express'
import vendasController from '../controllers/vendas.controller.js'
import { authorize } from '../util/auth.middleware.js'
const router = Router()

router.post('/', authorize('admin', 'customer1'), vendasController.createVenda)
router.delete('/:id', authorize('admin'), vendasController.deleteVendaByVendaId)
router.get('/:id', authorize('admin', 'customer1'), vendasController.getVendaByVendaId)
router.get('/', authorize('admin'), vendasController.getVendas)

export default router
