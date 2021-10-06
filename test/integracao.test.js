require('jest')
const dotenv = require('dotenv')
const supertest = require('supertest')
const request = supertest('http://localhost:3000')

dotenv.config()
let autor = null
let livro = null
let customer = null
const senha = 'senhadetestes'
let venda = null

describe('Admin Testes de integração', () => {
  test('1 - Criar um autor com dados de teste', async () => {
    const payloadRequest1 = {
      nome: 'Autor Teste 1',
      email: 'teste@gmail.com',
      telefone: '99-99999-9999'
    }
    const res = await request.post('/autor')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.nome).toBe(payloadRequest1.nome)
    expect(res.body.email).toBe(payloadRequest1.email)
    expect(res.body.telefone).toBe(payloadRequest1.telefone)
    expect(res.body.autorId).toBeDefined()
    autor = res.body
  })
  test('2 -Verificar se ele foi criado corretamente no banco de dados', async () => {
    const autorId = autor.autorId
    const res = await request.get(`/autor/${autorId}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res.status).toBe(200)
    expect(res.body.nome).toBe(autor.nome)
    expect(res.body.email).toBe(autor.email)
    expect(res.body.telefone).toBe(autor.telefone)
    expect(res.body.autorId).toBe(autor.autorId)
  })

  test('3 -Criar um livro com dados de teste para o autor criado anteriormente', async () => {
    const payloadRequest1 = {
      nome: 'Livro Teste 1',
      valor: 100.49,
      autorId: autor.autorId,
      estoque: 10
    }
    const res = await request.post('/livro')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.nome).toBe(payloadRequest1.nome)
    expect(parseFloat(res.body.valor)).toBe(payloadRequest1.valor)
    expect(res.body.autorId).toBe(autor.autorId)
    livro = res.body
  })

  test('4 - Verificar se o livro foi criado corretamente', async () => {
    const livroId = livro.livroId
    const res = await request.get(`/livro/${livroId}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res.status).toBe(200)
    expect(res.body.livroId).toBe(livroId)
    expect(res.body.nome).toBe(livro.nome)
    expect(res.body.estoque).toBe(livro.estoque)
    expect(res.body.autorId).toBe(autor.autorId)
  })

  test('5 - Criar um cliente com dados de teste', async () => {
    const payloadRequest1 = {
      nome: 'Cliente Teste 1',
      email: 'teste@gmail.com',
      senha,
      telefone: '99-99999-9999',
      endereco: 'Rua dos Bobos, nº 0'
    }
    const res = await request.post('/cliente')
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.nome).toBe(payloadRequest1.nome)
    expect(res.body.email).toBe(payloadRequest1.email)
    expect(res.body.senha).toBe(undefined)
    expect(res.body.telefone).toBe(payloadRequest1.telefone)
    expect(res.body.endereco).toBe(payloadRequest1.endereco)
    customer = res.body
  })

  test('6 - Verificar se o cliente foi criado corretamente', async () => {
    const clienteId = customer.clienteId
    const res = await request.get(`/cliente/${clienteId}`)
      .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
    expect(res.status).toBe(200)
    expect(res.body.nome).toBe(customer.nome)
    expect(res.body.email).toBe(customer.email)
    expect(res.body.senha).toBe(undefined)
    expect(res.body.telefone).toBe(customer.telefone)
    expect(res.body.endereco).toBe(customer.endereco)
  })
})

describe('Com Login criado', () => {
  test('1 - Buscar o livro criado utilizando os dados de login do usuário e verificar se o retorno  é adequado.', async () => {
    const livroId = livro.livroId
    const res = await request.get(`/livro/${livroId}`)
      .auth(customer.email, senha)
    expect(res.status).toBe(200)
    expect(res.body.livroId).toBe(livroId)
    expect(res.body.nome).toBe(livro.nome)
    expect(res.body.estoque).toBe(livro.estoque)
    expect(res.body.autorId).toBe(autor.autorId)
  })

  test('2 - Criar uma venda para o usuário e livro criados para teste', async () => {
    const payloadRequest2 = {
      livroId: livro.livroId,
      clienteId: customer.clienteId
    }

    const res2 = await request.post('/venda')
      .auth(customer.email, senha)
      .send(payloadRequest2)
    expect(res2.status).toBe(201)
    console.log(res2)
    expect(res2.clientId).toBe(payloadRequest2.clientId)
    expect(res2.livroId).toBe(payloadRequest2.livroId)
    expect(res2.body.vendaId).toBeDefined()
    venda = res2.body
  })

  test('3 - Verificar se ela foi salva corretamente', async () => {
    const vendaId = venda.vendaId
    const res = await request.get(`/venda/${vendaId}`)
      .auth(customer.email, senha)
    expect(res.status).toBe(200)
    expect(res.body.vendaId).toBe(vendaId)
    expect(res.body.livroId).toBe(livro.livroId)
    expect(res.body.clientId).toBe(customer.clienteId)
    expect(res.body.valor).toBeDefined()
  })
})

afterAll(async () => {
  const vendaId = livro.livroId
  await request.delete(`/venda/${vendaId}`)
    .auth(process.env.ROOT_USER, process.env.ROOT_PASS)

  const livroId = livro.livroId
  await request.get(`/livro/${livroId}`)
    .auth(process.env.ROOT_USER, process.env.ROOT_PASS)

  const clienteId = customer.clienteId
  await request.delete(`/cliente/${clienteId}`)
    .auth(process.env.ROOT_USER, process.env.ROOT_PASS)
})
