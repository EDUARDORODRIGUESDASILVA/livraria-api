require('jest')
const supertest = require('supertest')
const request = supertest('http://localhost:3000')

describe('/livro', () => {
  test('POST - Criar um novo livro', async () => {
    const payloadRequest1 = {
      nome: 'Livro Teste 1',
      valor: 100.49,
      autorId: 5,
      estoque: 10
    }
    const res = await request.post('/livro')
      .send(payloadRequest1)
    expect(res.status).toBe(201)
    expect(res.body.nome).toBe(payloadRequest1.nome)
    expect(parseFloat(res.body.valor)).toBe(payloadRequest1.valor)
    expect(res.body.autorId).toBe(payloadRequest1.autorId)
  })

  test('PUT - Atualizar um Livro', async () => {
    const nome = 'Livro teste x'
    const autorId = 5
    const payloadRequest1 = {
      nome: nome,
      valor: 100.25,
      autorId: autorId,
      estoque: 10
    }
    const res = await request.post('/livro')
      .send(payloadRequest1)
    expect(res.status).toBe(201)

    payloadRequest1.livroId = res.body.livroId
    payloadRequest1.nome = 'Livro Teste PUT'
    payloadRequest1.autorId = 9
    payloadRequest1.valor = 10.32
    payloadRequest1.estoque = 0

    const res2 = await request.put('/livro')
      .send(payloadRequest1)

    expect(res2.status).toBe(200)
    // não deve se atualizar o nome do livro  e o autorId
    expect(res2.body.nome).toBe(nome)
    expect(res2.body.autorId).toBe(autorId)

    expect(parseFloat(res2.body.valor)).toBe(10.32)
    expect(res2.body.estoque).toBe(0)
  })

  test('DELETE - Apagar um livro', async () => {
    const payloadRequest1 = {
      nome: 'Livro Teste 1',
      valor: 100.49,
      autorId: 5,
      estoque: 10
    }

    const res = await request.post('/livro')
      .send(payloadRequest1)

    expect(res.status).toBe(201)

    const id = res.body.livroId
    const res2 = await request.delete(`/livro/${id}`)

    expect(res2.status).toBe(200)
  })

  test('GET - Listar Livros', async () => {
    const res = await request.get('/livro')
    expect(res.status).toBe(200)
    // const livros = res.body
    // livros.forEach(livro => {
    //   expect(client.senha).toBe(undefined)
    // })
  })

  test('GET - Listar ByAutorId', async () => {
    const autorId = 1
    const res = await request.get(`/livro?autorId=${autorId}`)
    expect(res.status).toBe(200)
    const livros = res.body
    livros.forEach(livro => {
      expect(livro.autorId).toBe(autorId)
    })
  })
})
