import { ErrorHandler } from "../util/error.handler.js";
import {check, validationResult} from 'express-validator';
import clientService from '../services/cliente.service.js'
/* createCliente - Permite cadastrar um cliente 
Parametros objeto  JSON  com  o  nome,  e-mail, senha, telefone  e  endereço  do cliente*/ 
async function createCliente(req, res, next) {
    try {
        await check('nome', 'Nome deve ser informado').notEmpty().run(req);
        await check('email',
            'email deve ser informado').notEmpty().run(req);
        await check('email',
            'email deve ter um endereço válido').isEmail().run(req);
    
        await check('senha', 'senha deve ser informada').notEmpty().run(req);
        await check('telefone', 'telefone deve ser informado').notEmpty().run(req);
        await check('endereco', 'endereço deve ser informado').notEmpty().run(req);
    
        const result = validationResult(req);
    
        if (!result.isEmpty()) {
          res.status(400).json({erros: result.array()});
          return;
        }

        const c =  await clientService.createCliente(req.body);        
        return res.status(201).json(c);

        // throw new ErrorHandler(501, 'Endpoint not implemented');                
    } catch (error) {      
       next(error)
    }
   
}

async function updateCliente(req, res, next) {
    try {
        await check('clienteId', 'o clienteid deve ser informado').notEmpty().run(req);
        await check('nome', 'Nome deve ser informado').notEmpty().run(req);
        await check('email',
            'email deve ser informado').notEmpty().run(req);
        await check('email',
            'email deve ter um endereço válido').isEmail().run(req);
    
    //  await check('senha', 'senha deve ser informada').notEmpty().run(req);
        await check('telefone', 'telefone deve ser informado').notEmpty().run(req);
        await check('endereco', 'endereço deve ser informado').notEmpty().run(req);
    
        const result = validationResult(req);
    
        if (!result.isEmpty()) {
          res.status(400).json({erros: result.array()});
          return;
        }

        const c =  await clientService.updateCliente(req.body);        
        return res.status(200).json(c);

        // throw new ErrorHandler(501, 'Endpoint not implemented');                
    } catch (error) {      
       next(error)
    }
   
}

export default {createCliente, updateCliente}