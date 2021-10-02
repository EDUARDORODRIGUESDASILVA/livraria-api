/* eslint-disable new-cap */
import {Router} from 'express';
import clientesController from '../controllers/clientes.controller.js';

const router = Router();

router.post('/',  clientesController.createCliente);
router.put('/', clientesController.updateCliente);
// router.get('/', produtosController.listProducts);
// router.get('/:codigo', produtosController.listProductByCodigo);

// router.delete('/', produtosController.deleteProductByCodigo);

export default router;
