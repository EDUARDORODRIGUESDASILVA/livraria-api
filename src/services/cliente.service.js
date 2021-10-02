import clienteRepository from '../repositories/cliente.repository.js'

async function createCliente(cliente) {

    // TODO BLOQUEAR INSERT CASO O CLIENTE JÁ TENHA UMA CONTA CADASTRADA COM O MESMO EMAIL
    
    const c = await  clienteRepository.createCliente(cliente);    
    // converte para o raw object e remove a senha por segurança
    const raw = JSON.parse(JSON.stringify(c))
    delete raw.senha;
    return await raw
}

async function updateCliente(cliente) {
    const l = await  clienteRepository.updateCliente(cliente);    
    const c = l[1][0];
    // converte para o raw object e remove a senha por segurança
    const raw = JSON.parse(JSON.stringify(c))
    delete raw.senha;
    
    return await raw
}

export default {createCliente, updateCliente}