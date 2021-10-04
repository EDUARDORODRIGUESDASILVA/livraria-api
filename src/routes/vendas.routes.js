import { Router } from 'express'
import vendasController from '../controllers/vendas.controller.js'

const router = Router()

router.post('/', vendasController.createVenda)
router.get('/:id', vendasController.getVendaByVendaId)
router.get('/', vendasController.getVendas)

export default router
