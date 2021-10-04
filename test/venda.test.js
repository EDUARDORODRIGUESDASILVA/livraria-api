require('jest')
const supertest = require('supertest')
const request = supertest('http://localhost:3000')

describe('/venda', () => {
  test('POST - Cadastrar uma nova venda', async () => {
    const payloadRequest1 = {
      nome: 'Livro Teste 1',
      valor: 100.49,
      autorId: 5,
      estoque: 1
    }
    const res = await request.post('/livro')
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const payloadRequest2 = {
      livroId: res.body.livroId,
      clienteId: 5
    }

    const res2 = await request.post('/venda')
      .send(payloadRequest2)
    expect(res2.status).toBe(201)
    expect(res2.clientId).toBe(payloadRequest1.clientId)
    expect(res2.livroId).toBe(payloadRequest1.livroId)
    expect(res2.body.vendaId).toBeDefined()
  }
  )

  test('POST - Cadastrar uma nova venda para livro sem estoque ', async () => {
    const payloadRequest1 = {
      nome: 'Livro Teste 1',
      valor: 100.49,
      autorId: 5,
      estoque: 0
    }

    const res = await request.post('/livro')
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    const payloadRequest2 = {
      livroId: res.body.livroId,
      clienteId: 5
    }
    const res2 = await request.post('/venda')
      .send(payloadRequest2)
    expect(res2.status).toBe(400)
  }
  )
})
